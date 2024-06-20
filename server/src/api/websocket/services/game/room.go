package game

import (
	"cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	cruce_2v2_6 "cruce-server/src/games/cruce-2v2-6"
	"cruce-server/src/utils/logger"

	"google.golang.org/protobuf/proto"
)

type Message struct {
	data   []byte
	userId string
}

type GameRoom struct {
	log  logger.Logger
	game cruce_2v2_6.Game

	// Registered clients
	clients map[*GameClient]bool

	// Inbound messages from clients
	broadcast chan Message

	// Register clients
	register chan *GameClient

	// Unregister clients
	unregister chan *GameClient
}

func NewGameRoom(log logger.Logger, game cruce_2v2_6.Game) *GameRoom {
	return &GameRoom{
		log:        log,
		game:       game,
		clients:    make(map[*GameClient]bool),
		broadcast:  make(chan Message),
		register:   make(chan *GameClient),
		unregister: make(chan *GameClient),
	}
}

func (self *GameRoom) Run() {
	for {
		select {
		case client := <-self.register:
			self.clients[client] = true
			player := games.NewPlayer(client.userId, client.userName, client.avatar)
			self.game.Join(player)
			self.log.Info("client registered in room ")

		case client := <-self.unregister:
			if _, ok := self.clients[client]; ok {
				delete(self.clients, client)
				close(client.send)
			}
			self.game.Leave(client.userId)
			self.log.Info("client unregistered in room")

		case message := <-self.broadcast:
			self.log.Info("client broadcast in room")

			receiveProto := &game_protocol.GameServerProtocol{}
			err := proto.Unmarshal(message.data, receiveProto)
			if err != nil {
				self.log.Error("proto.Unmarshal error:\n", err)
				continue
			}

			self.log.Info("game client message:\n", receiveProto)

			receiveMessage := receiveProto.Message
			switch receiveMessage.(type) {
			case *game_protocol.GameServerProtocol_PlayBid:
				self.log.Info("game client play bid")
				bid := receiveProto.GetPlayBid().Bid
				err = self.game.PlayAuction(message.userId, uint(bid))
				if err != nil {
					self.log.Error("game.PlayAuction error:\n", err)
					continue
				}
			case *game_protocol.GameServerProtocol_PlayCard:
				self.log.Info("game client play card")
				cardProto := receiveProto.GetPlayCard().Card
				card := games.CardFromProto(cardProto)
				err = self.game.PlayCard(message.userId, card)
				if err != nil {
					self.log.Error("game.PlayCard error:\n", err)
					continue
				}
			case *game_protocol.GameServerProtocol_AccuseCheating:
				self.log.Info("game client accuse cheating")
				panic("not implemented")
			default:
				self.log.Warn("game client message not implemented")
			}

			self.log.Info("game server broadcast: ", "player pov")

			for client := range self.clients {
				playerPov, err := self.game.ToProto(client.userId)
				if err != nil {
					self.log.Error("game.ToProto error:\n", err)
					continue
				}

				sendProto := &game_protocol.GameClientProtocol{
					PlayerPov: playerPov,
				}

				bytes, err := proto.Marshal(sendProto)
				if err != nil {
					self.log.Error("proto.Marshall error:\n", err)
					continue
				}

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
