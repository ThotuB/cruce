package game

import (
	"log"
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

type GameService struct {
	log *log.Logger
	hub *GameHub
}

func NewGameService(log *log.Logger, hub *GameHub) *GameService {
	return &GameService{
		log: log,
		hub: hub,
	}
}

func (self *GameService) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		self.log.Println("could not connect:\n", err)
		return
	}
	// TODO fill room Id
	client := NewGameClient(self.hub, "11", conn, make(chan []byte, 256))
	self.hub.register <- client

	go client.WritePump()
	go client.ReadPump()
}
