package chat

import (
	"cruce-server/src/utils/logger"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ChatService struct {
	log  logger.Logger
	room *ChatRoom
}

func NewChatService(log logger.Logger, room *ChatRoom) *ChatService {
	return &ChatService{
		log:  log,
		room: room,
	}
}

func (self *ChatService) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		self.log.Error("could not connect:\n", err)
		return
	}
	client := NewClient(self.room, conn, make(chan []byte, 256))
	client.room.register <- client

	go client.WritePump()
	go client.ReadPump()
}
