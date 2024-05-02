package main

import (
	"log"

	"cruce-server/config"
	grpc_server "cruce-server/src/api/grpc/server"
	websocket_server "cruce-server/src/api/websocket/server"
	"cruce-server/src/database"
)

func main() {
	// config
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatal(err)
	}

	// logger
	logger := log.Default()

	// database
	db, err := database.Connect(&cfg.PostgreSQL)
	if err != nil {
		logger.Fatalln("pgx connection error:\n", err)
	}
	logger.Println("database connected:", db.DB.Stats().OpenConnections)

	// grpc server
	grpc_server := grpc_server.NewServer(logger, cfg, db)

	go func() {
		if err := grpc_server.Run(); err != nil {
			logger.Fatalln("grpc server run error:\n", err)
		}
	}()

	// websocket server
	websocket_server := websocket_server.NewServer(logger, cfg, db)

	if err := websocket_server.Run(); err != nil {
		logger.Fatalln("websocket server run error:\n", err)
	}
}
