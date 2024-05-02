package chat

import (
	"cruce-server/protobufs/protocol/chat_protocol"
	"cruce-server/src/api/websocket/models"
	"cruce-server/src/api/websocket/repos"
	"log"

	"google.golang.org/protobuf/proto"
)

type ChatRoom struct {
	log      *log.Logger
	chatRepo repos.ChatRepo

	// Registered clients.
	clients map[*ChatClient]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *ChatClient

	// Unregister requests from clients.
	unregister chan *ChatClient
}

func NewRoom(log *log.Logger, chatRepo repos.ChatRepo) *ChatRoom {
	return &ChatRoom{
		log:        log,
		chatRepo:   chatRepo,
		clients:    make(map[*ChatClient]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *ChatClient),
		unregister: make(chan *ChatClient),
	}
}

func (self *ChatRoom) Run() {
	for {
		select {
		case client := <-self.register:
			self.log.Println("chat client registered")
			self.clients[client] = true

			messageHistory, err := self.chatRepo.GetHistory()
			if err != nil {
				self.log.Println("chatRepo.GetHistory error:\n", err)
				continue
			}

			messages := make([]*chat_protocol.MessageReceive, 0, len(*messageHistory))
			for _, message := range *messageHistory {
				messageProto := message.ToProto()
				messages = append(messages, messageProto)
			}

			messageHistoryProto := chat_protocol.MessageHistory{
				Messages: messages,
			}

			sendProto := &chat_protocol.ChatClientProtocol{
				Message: &chat_protocol.ChatClientProtocol_MessageHistory{
					MessageHistory: &messageHistoryProto,
				},
			}

			bytes, err := proto.Marshal(sendProto)
			if err != nil {
				self.log.Println("proto.Marshall error:\n", err)
				continue
			}

			select {
			case client.send <- bytes:
			default:
				close(client.send)
				delete(self.clients, client)
			}

		case client := <-self.unregister:
			self.log.Println("chat client unregistered")
			if _, ok := self.clients[client]; ok {
				delete(self.clients, client)
				close(client.send)
			}

		case message := <-self.broadcast:
			receiveProto := &chat_protocol.ChatServerProtocol{}
			err := proto.Unmarshal(message, receiveProto)
			if err != nil {
				self.log.Println("proto.Unmarshall error:\n", err)
				continue
			}

			self.log.Println("WEBSOCKET RECEIVED: ", receiveProto)

			messageInsert := models.MessageInsert{
				UserId:  receiveProto.MessageSend.UserId,
				Message: receiveProto.MessageSend.Messsage,
			}

			messageGet, err := self.chatRepo.PostMessage(messageInsert)
			if err != nil {
				self.log.Println("chatRepo.PostMessage error:\n", err)
				continue
			}

			messageReceive := messageGet.ToProto()

			sendProto := &chat_protocol.ChatClientProtocol{
				Message: &chat_protocol.ChatClientProtocol_MessageReceive{
					MessageReceive: messageReceive,
				},
			}

			self.log.Println("WEBSOCKET SENT: ", sendProto)

			bytes, err := proto.Marshal(sendProto)
			if err != nil {
				self.log.Println("proto.Marshall error:\n", err)
				continue
			}

			for client := range self.clients {
				select {
				case client.send <- bytes:
				default:
					close(client.send)
					delete(self.clients, client)
				}
			}
		}
	}
}
