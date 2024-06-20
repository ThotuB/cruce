package cruce_2v2_6

import (
	p "cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
	"errors"
)

type RoundStates uint8

const (
	AUCTION = 0
	TRICK   = 1
)

type RoundState struct {
	log               logger.Logger
	game              *GameState
	State             RoundStates
	CardPoints        [2]uint
	PlayerCardsInHand [4][]games.Card
	Auction           *AuctionState
	Trick             *TrickState
	TrickNum          uint
	Trump             *games.Suit // trump of round
}

func NewRoundState(log logger.Logger, game *GameState, playerIndex int) *RoundState {
	round := &RoundState{
		log:               log,
		game:              game,
		State:             AUCTION,
		CardPoints:        [2]uint{0, 0},
		PlayerCardsInHand: games.ShuffledCards4Players(),
		TrickNum:          1,
	}

	round.Auction = NewAuctionState(log, round, playerIndex)

	return round
}

func (rs *RoundState) GetPlayerIndex() int {
	if rs.State == AUCTION {
		return rs.Auction.PlayerIndex
	}

	return rs.Trick.PlayerIndex
}

func (rs *RoundState) AuctionOver() {
	rs.log.Debug("Auction over")

	rs.State = TRICK
	rs.Trick = NewTrickState(rs.log, rs, rs.Auction.GetAuctionWinner())
}

func (rs *RoundState) TrickOver() {
	rs.log.Debug("Trick over")

	trickWinnerData := rs.Trick.GetTrickWinner()
	rs.CardPoints[trickWinnerData.winningTeamIndex] += trickWinnerData.points

	if rs.TrickNum != 6 {
		rs.TrickNum++
		rs.Trick = NewTrickState(rs.log, rs, trickWinnerData.winningPlayerIndex)
		return
	}

	rs.game.RoundOver()
}

func (rs *RoundState) PlayAuction(bid uint) error {
	if rs.State != AUCTION {
		return errors.New("auction error: not in auction state")
	}

	err := rs.Auction.PlayBid(bid)
	if err != nil {
		return err
	}

	return nil
}

func (rs *RoundState) findCardInCurrentPlayersHand(card games.Card) (*int, bool) {
	for i, handCard := range rs.PlayerCardsInHand[rs.Trick.PlayerIndex] {
		if handCard == card {
			return &i, true
		}
	}
	return nil, false
}

func (rs *RoundState) PlayCard(card games.Card) error {
	if rs.State != TRICK {
		return errors.New("play card error: not in trick state")
	}

	cardIndex, ok := rs.findCardInCurrentPlayersHand(card)
	if !ok {
		return errors.New("play card error: card not found in players hand")
	}

	// remove card from players hand
	currentPlayerIndex := rs.GetPlayerIndex()
	hand := &rs.PlayerCardsInHand[currentPlayerIndex]
	*hand = remove(*hand, *cardIndex)

	// the first card played in the round is the trump
	if rs.Trump == nil {
		rs.Trump = &card.Suit
	}

	turn := rs.Trick.TurnNum
	if turn == 1 {
		if rs.doesPlayerHavePair(currentPlayerIndex, card) {
			teamIndex := currentPlayerIndex % 2
			if card.Suit == *rs.Trump {
				rs.CardPoints[teamIndex] += 40
			} else {
				rs.CardPoints[teamIndex] += 20
			}
		}
	}

	// play the card
	rs.Trick.PlayCard(card)

	return nil
}

func (rs *RoundState) CalculateGamePoints() [2]uint {
	return [2]uint{
		rs.CardPoints[0] / 33,
		rs.CardPoints[1] / 33,
	}
}

func (rs *RoundState) IsCardPlayable(playerIndex int, card games.Card) bool {
	if rs.State != TRICK {
		return false
	}

	// turn 1 - play any card
	if rs.Trick.TurnNum == 1 {
		return true
	}

	// turn 2, 3, 4
	// check if player has suit
	// if player has suit, check if card is of that suit
	firstCardSuit := rs.Trick.PlayedCards[0].Suit
	if rs.doesPlayerHaveSuit(playerIndex, firstCardSuit) {
		return card.Suit == firstCardSuit
	}

	// check if player has trump
	// if player has trump, check if card is of that suit
	trumpSuit := *rs.Trump
	if rs.doesPlayerHaveSuit(playerIndex, trumpSuit) {
		return card.Suit == trumpSuit
	}
	// if player has no suit or trump, play any card
	return true
}

func (rs *RoundState) doesPlayerHaveSuit(playerIndex int, suit games.Suit) bool {
	for _, card := range rs.PlayerCardsInHand[playerIndex] {
		if card.Suit == suit {
			return true
		}
	}
	return false
}

func (rs *RoundState) doesPlayerHavePair(playerIndex int, card games.Card) bool {
	if card.Value != games.KING && card.Value != games.QUEEN {
		return false
	}

	if card.Value == games.KING {
		return rs.doesPlayerHaveCard(playerIndex, games.Card{Suit: card.Suit, Value: games.QUEEN})
	}

	return rs.doesPlayerHaveCard(playerIndex, games.Card{Suit: card.Suit, Value: games.KING})
}

func (rs *RoundState) doesPlayerHaveCard(playerIndex int, card games.Card) bool {
	for _, handCard := range rs.PlayerCardsInHand[playerIndex] {
		if handCard == card {
			return true
		}
	}
	return false
}

func (rs *RoundState) ToProto(playerIndex int) (*p.Auction, []*p.TableCard, *p.CardSuit) {
	if rs.State == AUCTION {
		return rs.Auction.ToProto(playerIndex), nil, nil
	}

	playedCards := rs.Trick.ToProto(playerIndex)
	trump := rs.Trump.ToProto()

	return nil, playedCards, trump
}
