package cruce_2v2_6

import (
	"cruce-server/src/games"
	"errors"
)

type RoundStates uint8

const (
	AUCTION = 0
	TRICK   = 1
)

type RoundState struct {
	State             RoundStates
	TeamPoints        [2]uint
	PlayerCardsInHand [4][]games.Card
	Auction           AuctionState
	Trick             TrickState
	TrickNum          uint
}

func NewRoundState(playerIndex uint) RoundState {
	return RoundState{
		State:             AUCTION,
		TeamPoints:        [2]uint{0, 0},
		PlayerCardsInHand: games.ShuffledCards4Players(),
		Auction:           NewAuctionState(playerIndex),
		TrickNum:          1,
	}
}

func (self RoundState) NextAuctionPlayer() {
	self.Auction.TurnNum++

	if self.Auction.TurnNum != 4 {
		self.Auction.PlayerIndex = (self.Auction.PlayerIndex + 1) % 4
		return
	}

	auctionWinnerIndex := self.Auction.GetAuctionWinner()

	self.State = TRICK
	self.Trick = NewTrickState(auctionWinnerIndex)
}

func (self RoundState) PlayAuction(bid uint) error {
	if self.State != AUCTION {
		return errors.New("auction error: not in auction state")
	}

	err := self.Auction.PlayBid(bid)
	if err != nil {
		return err
	}

	return nil
}

func (self RoundState) findCardInCurrentPlayersHand(card games.Card) (*int, bool) {
	for i, handCard := range self.PlayerCardsInHand[self.Trick.PlayerIndex] {
		if handCard == card {
			return &i, true
		}
	}
	return nil, false
}

func (self RoundState) NextTrick() bool {
	self.TrickNum++
	trickWinnerData := self.Trick.GetTrickWinner()
	self.TeamPoints[trickWinnerData.winningTeamIndex] += trickWinnerData.points

	if self.TrickNum != 6 {
		self.Trick = NewTrickState(trickWinnerData.winningPlayerIndex)
		return false
	}

	return true
}

func (self RoundState) PlayCard(card games.Card) error {
	if self.State != TRICK {
		return errors.New("play card error: not in trick state")
	}

	cardIndex, ok := self.findCardInCurrentPlayersHand(card)
	if !ok {
		return errors.New("play card error: card not found in players hand")
	}

	err := self.Trick.PlayCard(card)
	if err != nil {
		return err
	}

	hand := &self.PlayerCardsInHand[self.Trick.PlayerIndex]
	*hand = remove(*hand, *cardIndex)

	if self.TrickNum == 1 {
		self.Trick.Trump = card.Suit
	}

	return nil
}

func (self RoundState) GetTeamScores() [2]uint {
	return [2]uint{
		self.TeamPoints[0] / 33,
		self.TeamPoints[1] / 33,
	}
}
