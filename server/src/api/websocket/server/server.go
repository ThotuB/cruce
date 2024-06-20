package server

import (
	"cruce-server/config"
	"cruce-server/src/api/websocket/repos"
	"cruce-server/src/api/websocket/services/chat"
	"cruce-server/src/api/websocket/services/game"
	"cruce-server/src/utils/logger"
	"fmt"
	"net/http"

	"github.com/jmoiron/sqlx"
)

type server struct {
	log logger.Logger
	cfg *config.Config
	db  *sqlx.DB
}

func NewServer(log logger.Logger, cfg *config.Config, db *sqlx.DB) *server {
	return &server{
		log: log,
		cfg: cfg,
		db:  db,
	}
}

func (self *server) Run() error {
	// repos
	chatRepo := repos.NewChatRepo(self.db)
	gameRepo := repos.NewGameRepo(self.db)

	// chat room
	chatRoom := chat.NewRoom(self.log, *chatRepo)

	// game hub
	gameHub := game.NewGameHub(self.log, *gameRepo)

	// services
	chatService := chat.NewChatService(self.log, chatRoom)
	gameService := game.NewGameService(self.log, gameHub)

	// mount services
	serverMux := http.NewServeMux()
	serverMux.Handle("/chat", chatService)
	serverMux.Handle("/game", gameService)

	httpServer := &http.Server{
		Handler: serverMux,
		Addr:    fmt.Sprintf("192.168.1.218:%d", self.cfg.WebSocket.Port),
	}

	go chatRoom.Run()

	self.log.Info("ws server listening at: ", httpServer.Addr)
	if err := httpServer.ListenAndServe(); err != nil {
		return err
	}

	return nil
}
