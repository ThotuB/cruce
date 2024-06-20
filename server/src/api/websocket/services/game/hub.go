package game

import (
	"cruce-server/src/api/websocket/repos"
	"cruce-server/src/games"
	cruce_2v2_6 "cruce-server/src/games/cruce-2v2-6"
	"cruce-server/src/utils/logger"
)

type GameHub struct {
	log      logger.Logger
	gameRepo repos.GameRepo

	// Rooms
	rooms map[int]*GameRoom
}

func NewGameHub(log logger.Logger, gameRepo repos.GameRepo) *GameHub {
	return &GameHub{
		log:      log,
		gameRepo: gameRepo,
		rooms:    make(map[int]*GameRoom),
	}
}

func (self *GameHub) GetRoom(roomId int) *GameRoom {
	room := self.rooms[roomId]
	if room == nil {
		game := cruce_2v2_6.NewGame(self.log, games.Rules{})
		room = NewGameRoom(self.log, game)
		self.rooms[roomId] = room
		go room.Run()
	}

	return room
}
