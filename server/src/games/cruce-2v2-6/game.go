package cruce_2v2_6

import (
	p "cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	"errors"
)

type GameStates uint8

const (
	WAITING_FOR_PLAYERS GameStates = 0
	GAME_ONGOING        GameStates = 1
	GAME_OVER           GameStates = 2
)

type Game struct {
	rules  games.Rules
	joined uint
	state  GameStates
	game   GameState
}

func NewGame(rules games.Rules) Game {
	return Game{
		rules:  rules,
		joined: 1,
		state:  WAITING_FOR_PLAYERS,
		game:   NewGameState(),
	}
}

func (self Game) Join() error {
	if self.state != WAITING_FOR_PLAYERS {
		return errors.New("game join errror: too many players")
	}

	self.joined++
	if self.joined == 4 {
		self.state = AUCTION
	}

	return nil
}

func (self Game) Leave() {
	if self.joined == 0 {
		return
	}
	self.joined--
	self.state = WAITING_FOR_PLAYERS
}

func (self Game) Empty() bool {
	return self.joined == 0
}

func (self Game) PlayAuction(bid uint) error {
	if self.state != GAME_ONGOING {
		return errors.New("game error: game not ongoing")
	}

	self.game.Round.PlayAuction(bid)

	return nil
}

func (self Game) HandCardsToProto(playerIndex uint) []*p.HandCard {
	var handCards []*p.HandCard
	for _, card := range self.game.Round.PlayerCardsInHand[playerIndex] {
		var state p.CardState
		if self.state != GAME_ONGOING {
			state = p.CardState_DISABLED
		} else if self.game.Round.State != TRICK {
			state = p.CardState_DISABLED
		} else { // TODO
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

func (self AuctionState) ToProto(playerIndex uint) *p.Auction {
	offset := 4 + self.AuctionStarter - playerIndex

	bids := []*p.Bid{nil, nil, nil, nil}
	for i, bid := range self.Bids {
		optBid := &p.Bid{Value: uint32(bid)}
		bids[(i+int(offset))%4] = optBid
	}

	return &p.Auction{
		Visible: playerIndex == self.PlayerIndex,
		Bids:    bids,
		MaxBid:  uint32(self.MaxBid),
	}
}

func (self Game) ToProto() p.PlayerPov {
	const PLAYER_INDEX = 0

	var auction *p.Auction
	var playedCards []*p.Card
	var trump *p.CardSuit
	if self.game.Round.State == TRICK {
		for _, card := range self.game.Round.Trick.PlayedCards {
			playedCard := card.ToProto()
			playedCards = append(playedCards, playedCard)
		}
		trump = self.game.Round.Trick.Trump.ToProto().Enum()
	} else {
		auction = self.game.Round.Auction.ToProto(PLAYER_INDEX)
	}

	return p.PlayerPov{
		Team_1Score:  uint32(self.game.TeamScore[0]),
		Team_2Score:  uint32(self.game.TeamScore[1]),
		Team_1Points: uint32(self.game.Round.TeamPoints[0]),
		Team_2Points: uint32(self.game.Round.TeamPoints[1]),
		HandCards:    self.HandCardsToProto(PLAYER_INDEX),
		PlayedCards:  playedCards,
		Auction:      auction,
		Trump:        trump,
		CheatButton:  false,
	}
}
