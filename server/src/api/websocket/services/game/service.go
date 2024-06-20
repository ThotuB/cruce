package game

import (
	"cruce-server/src/utils/logger"
	"net/http"
	"strconv"

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
	log logger.Logger
	hub *GameHub
}

func NewGameService(log logger.Logger, hub *GameHub) *GameService {
	return &GameService{
		log: log,
		hub: hub,
	}
}

func (self *GameService) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	query := req.URL.Query()
	uid := query.Get("uid")
	tid := query.Get("tid")
	tableId, err := strconv.Atoi(tid)
	if err != nil {
		self.log.Error("strconv.Atoi error:\n", err)
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	user, err := self.hub.gameRepo.GetUserBelongingToTable(uid, tableId)
	if err != nil {
		self.log.Error("gameRepo.GetUserBelongingToTable error:\n", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		self.log.Error("could not connect:\n", err)
		http.Error(w, "could not connect", http.StatusInternalServerError)
		return
	}

	room := self.hub.GetRoom(tableId)
	client := NewGameClient(room, uid, tableId, user.Name, *user.ImageUrl, conn, make(chan []byte, 256))
	room.register <- client

	go client.WritePump()
	go client.ReadPump()
}
