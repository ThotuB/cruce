package main

import (
	"log"

	"cruce-server/config"
	grpc_server "cruce-server/src/api/grpc/server"
	websocket_server "cruce-server/src/api/websocket/server"
	"cruce-server/src/database"
	"cruce-server/src/utils/logger"
)

func main() {
	// config
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal(err)
	}

	// api logger
	logger := logger.New()
	logger.Init()

	logger.Info("config loaded")

	// database
	logger.Info("starting database connection...")
	db, err := database.Connect(&cfg.PostgreSQL)
	if err != nil {
		logger.Fatal("pgx connection error:\n", err)
	}

	logger.Info("database connected:", db.DB.Stats().OpenConnections)

	// grpc server
	logger.Info("starting grpc server and http proxy...")
	grpc_server := grpc_server.NewServer(logger, cfg, db)

	go func() {
		if err := grpc_server.Run(); err != nil {
			logger.Fatal("grpc server run error:\n", err)
		}
	}()

	// websocket server
	logger.Info("starting websocket server...")
	websocket_server := websocket_server.NewServer(logger, cfg, db)

	if err := websocket_server.Run(); err != nil {
		logger.Fatal("websocket server run error:\n", err)
	}
}
