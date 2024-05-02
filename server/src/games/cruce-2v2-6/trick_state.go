package cruce_2v2_6

import "cruce-server/src/games"

type TrickState struct {
	PlayedCards  []games.Card // all played cards in trick
	TrickStarter uint         // index of player who won the auction/last trick
	PlayerIndex  uint         // index of player whos turn it is to play card
	Trump        games.Suit   // trump of trick
	TurnNum      uint
}

func NewTrickState(trickStarter uint) TrickState {
	return TrickState{
		PlayedCards:  make([]games.Card, 0, 4),
		TrickStarter: trickStarter,
		PlayerIndex:  trickStarter,
		TurnNum:      1,
	}
}

func (self TrickState) NextTurn() bool {
	self.TurnNum++

	if self.TurnNum != 4 {
		self.PlayerIndex = (self.PlayerIndex + 1) % 4
		return false
	}

	return true
}

func (self TrickState) PlayCard(card games.Card) error {
	self.PlayedCards = append(self.PlayedCards, card)

	return nil
}

type TrickWinnerData struct {
	winningPlayerIndex uint
	winningTeamIndex   uint
	points             uint
}

func (self TrickState) GetTrickWinner() TrickWinnerData {
	winningCard := struct {
		index uint
		card  games.Card
	}{
		index: 0,
		card:  self.PlayedCards[0],
	}

	for i, card := range self.PlayedCards[1:] {
		if card.BetterThan(winningCard.card, self.Trump) {
			winningCard.index = uint(i)
			winningCard.card = card
		}
	}

	points := uint(0)
	for _, card := range self.PlayedCards {
		points += card.GetValue()
	}

	winningPlayerIndex := (self.TrickStarter + winningCard.index) % 4
	winningTeamIndex := winningPlayerIndex % 2

	return TrickWinnerData{
		winningPlayerIndex: winningPlayerIndex,
		winningTeamIndex:   winningTeamIndex,
		points:             points,
	}
}
