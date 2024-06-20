package cruce_2v2_6

import (
	p "cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
)

type TrickState struct {
	log          logger.Logger
	round        *RoundState
	PlayedCards  []games.Card // all played cards in trick
	TrickStarter int          // index of player who won the auction/last trick
	PlayerIndex  int          // index of player whos turn it is to play card
	TurnNum      uint
}

func NewTrickState(log logger.Logger, round *RoundState, trickStarter int) *TrickState {
	return &TrickState{
		log:          log,
		round:        round,
		PlayedCards:  make([]games.Card, 0, 4),
		TrickStarter: trickStarter,
		PlayerIndex:  trickStarter,
		TurnNum:      1,
	}
}

func (ts *TrickState) nextTurn() {
	if ts.TurnNum != 4 {
		ts.TurnNum++
		ts.PlayerIndex = (ts.PlayerIndex + 1) % 4
		return
	}

	ts.round.TrickOver()
}

func (ts *TrickState) PlayCard(card games.Card) {
	ts.PlayedCards = append(ts.PlayedCards, card)

	ts.nextTurn()
}

type TrickWinnerData struct {
	winningPlayerIndex int
	winningTeamIndex   int
	points             uint
}

func (ts *TrickState) GetTrickWinner() TrickWinnerData {
	winningCard := struct {
		index int
		card  games.Card
	}{
		index: 0,
		card:  ts.PlayedCards[0],
	}

	for i, card := range ts.PlayedCards[1:] {
		if card.BetterThan(winningCard.card, *ts.round.Trump) {
			ts.log.Debugf("%v better than %v", card.ToProto(), winningCard.card.ToProto())
			winningCard.index = i + 1
			winningCard.card = card
		} else {
			ts.log.Debugf("%v not better than %v", card.ToProto(), winningCard.card.ToProto())
		}
		ts.log.Debugf("card winner index: %v", winningCard.index)
	}

	points := uint(0)
	for _, card := range ts.PlayedCards {
		points += card.GetValue()
	}

	winningPlayerIndex := (ts.TrickStarter + winningCard.index) % 4
	winningTeamIndex := winningPlayerIndex % 2

	ts.log.Debugf("trick starter: %v", ts.TrickStarter)

	return TrickWinnerData{
		winningPlayerIndex: winningPlayerIndex,
		winningTeamIndex:   winningTeamIndex,
		points:             points,
	}
}

func (ts *TrickState) ToProto(playerIndex int) []*p.TableCard {
	offset := 4 + ts.TrickStarter - playerIndex

	playedCards := []*p.TableCard{nil, nil, nil, nil}
	for i, card := range ts.PlayedCards {
		playedCard := card.ToProto()
		tableCard := &p.TableCard{
			Card: playedCard,
		}
		playedCards[(i+offset)%4] = tableCard
	}

	return playedCards
}
