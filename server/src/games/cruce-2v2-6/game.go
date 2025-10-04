package cruce_2v2_6

import (
	p "cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
	"errors"
)

type GameStates uint8

const (
	WAITING_FOR_PLAYERS GameStates = 0
	GAME_ONGOING        GameStates = 1
	GAME_OVER           GameStates = 2
)

type Game struct {
	log     logger.Logger
	rules   games.Rules
	players [4]*games.Player
	joined  uint
	state   GameStates
	game    *GameState
}

func NewGame(log logger.Logger, rules games.Rules) Game {
	return Game{
		log:     log,
		rules:   rules,
		players: [4]*games.Player{nil, nil, nil, nil},
		joined:  0,
		state:   WAITING_FOR_PLAYERS,
		game:    NewGameState(log, rules),
	}
}

func (g *Game) findOpenSlot() *int {
	for i, player := range g.players {
		if player == nil {
			return &i
		}
	}

	return nil
}

func (g *Game) findPlayerIndex(playerId string) *int {
	for i, player := range g.players {
		if player != nil && player.Id == playerId {
			return &i
		}
	}

	return nil
}

func (g *Game) Join(player *games.Player) error {
	if g.state != WAITING_FOR_PLAYERS {
		return errors.New("game join errror: too many players")
	}

	slot := g.findOpenSlot()
	if slot == nil {
		return errors.New("game join error: no open slots")
	}

	g.players[*slot] = player
	g.joined++
	if g.joined == 4 {
		g.state = GAME_ONGOING
	}

	return nil
}

func (g *Game) Leave(playerId string) error {
	playerIndex := g.findPlayerIndex(playerId)
	if playerIndex == nil {
		return errors.New("game leave error: player not found")
	}

	g.players[*playerIndex] = nil

	g.joined--
	g.state = WAITING_FOR_PLAYERS
	return nil
}

func (g *Game) Empty() bool {
	return g.joined == 0
}

func (g *Game) PlayAuction(playerId string, bid uint) error {
	g.log.Debug("game play auction")

	playerIndex := g.findPlayerIndex(playerId)
	if playerIndex == nil {
		return errors.New("game play auction error: player not found")
	}

	currentPlayerIndex := g.game.Round.GetPlayerIndex()
	if *playerIndex != currentPlayerIndex {
		return errors.New("game play auction error: not players turn")
	}

	if g.state != GAME_ONGOING {
		return errors.New("game error: game not ongoing")
	}

	err := g.game.Round.PlayAuction(bid)
	if err != nil {
		return err
	}

	return nil
}

func (g *Game) PlayCard(playerId string, card games.Card) error {
	g.log.Debug("game play card")

	playerIndex := g.findPlayerIndex(playerId)
	if playerIndex == nil {
		return errors.New("game play card error: player not found")
	}

	currentPlayerIndex := g.game.Round.GetPlayerIndex()
	if *playerIndex != currentPlayerIndex {
		return errors.New("game play card error: not players turn")
	}

	if g.state != GAME_ONGOING {
		return errors.New("game error: game not ongoing")
	}

	err := g.game.Round.PlayCard(card)
	if err != nil {
		return err
	}

	return nil
}

// protobuf conversion functions

func (g *Game) handCardsToProto(playerIndex int) []*p.HandCard {
	currentPlayerIndex := g.game.Round.GetPlayerIndex()
	isCurrentPlayer := playerIndex == currentPlayerIndex

	var handCards []*p.HandCard
	for _, card := range g.game.Round.PlayerCardsInHand[playerIndex] {
		var state p.CardState
		if g.state != GAME_ONGOING {
			state = p.CardState_DISABLED
		} else if g.game.Round.State != TRICK {
			state = p.CardState_DISABLED
		} else if !isCurrentPlayer {
			state = p.CardState_DISABLED
		} else if !g.game.Round.IsCardPlayable(playerIndex, card) {
			state = p.CardState_DISABLED
		} else {
			state = p.CardState_ENABLED
		}

		handCard := &p.HandCard{
			Card:  card.ToProto(),
			State: state,
		}
		handCards = append(handCards, handCard)
	}

	return handCards
}

func (g *Game) playersToProto(playerIndex int) []*p.Player {
	offset := 4 - playerIndex

	var players [4]*p.Player
	for i, player := range g.players {
		if player == nil {
			players[(i+offset)%4] = nil
			continue
		}

		playerProto := player.ToProto()
		players[(i+offset)%4] = playerProto
	}

	return players[:]
}

func (g *Game) ToProto(userId string) (*p.PlayerPov, error) {
	playerIndex := g.findPlayerIndex(userId)
	if playerIndex == nil {
		return nil, errors.New("game to proto error: player not found")
	}

	var auction *p.Auction
	var playedCards []*p.TableCard
	var trump *p.CardSuit
	if g.state == GAME_ONGOING {
		auction, playedCards, trump = g.game.Round.ToProto(*playerIndex)
	}

	return &p.PlayerPov{
		Team_1Score:  uint32(g.game.GamePoints[0]),
		Team_2Score:  uint32(g.game.GamePoints[1]),
		Team_1Points: uint32(g.game.Round.CardPoints[0]),
		Team_2Points: uint32(g.game.Round.CardPoints[1]),
		HandCards:    g.handCardsToProto(*playerIndex),
		PlayedCards:  playedCards,
		Auction:      auction,
		Trump:        trump,
		CheatButton:  false,
		Players:      g.playersToProto(*playerIndex),
	}, nil
}
