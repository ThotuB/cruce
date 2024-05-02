package game

import (
	"cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	cruce_2v2_6 "cruce-server/src/games/cruce-2v2-6"
	"log"

	"google.golang.org/protobuf/proto"
)

type Message struct {
	data   []byte
	roomId string
}

type GameHub struct {
	log *log.Logger

	games map[string]cruce_2v2_6.Game

	// Registered clients.
	rooms map[string]map[*GameClient]bool

	// Inbound messages from clients.
	broadcast chan Message

	// Register requests from clients.
	register chan *GameClient

	// Unregister requests from clients.
	unregister chan *GameClient
}

func NewGameHub(log *log.Logger) *GameHub {
	return &GameHub{
		log:        log,
		games:      make(map[string]cruce_2v2_6.Game),
		rooms:      make(map[string]map[*GameClient]bool),
		broadcast:  make(chan Message),
		register:   make(chan *GameClient),
		unregister: make(chan *GameClient),
	}
}

func (self *GameHub) Run() {
	for {
		select {
		case client := <-self.register:
			self.log.Println("game client registering")

			connections := self.rooms[client.roomId]
			if connections == nil {
				self.games[client.roomId] = cruce_2v2_6.NewGame(games.Rules{})
				self.rooms[client.roomId] = make(map[*GameClient]bool)
			}
			self.rooms[client.roomId][client] = true

			self.log.Println("game client registered")

		case client := <-self.unregister:
			self.log.Println("game client unregistering")

			connections := self.rooms[client.roomId]
			if connections == nil {
				continue
			}

			if _, ok := connections[client]; ok {
				delete(connections, client)
				close(client.send)
				if len(connections) == 0 {
					delete(self.rooms, client.roomId)
				}
			}

			self.log.Println("game client unregistered")

		case message := <-self.broadcast:
			self.log.Println("client broadcast")

			game := self.games[message.roomId]

			playerPov := game.ToProto()

			sendProto := &game_protocol.GameClientProtocol{
				PlayerPov: &playerPov,
			}

			bytes, err := proto.Marshal(sendProto)
			if err != nil {
				self.log.Println("proto.Marshall error:\n", err)
				continue
			}

			connections := self.rooms[message.roomId]
			for c := range connections {
				select {
				case c.send <- bytes:
				default:
					close(c.send)
					delete(connections, c)
					if len(connections) == 0 {
						delete(self.rooms, message.roomId)
					}
				}
			}
		}
	}
}
