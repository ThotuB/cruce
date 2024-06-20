package cruce_2v2_6

import (
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
	"github.com/stretchr/testify/require"
	"testing"
)

func playerCardsInHand() [4][]games.Card {
	return [4][]games.Card{
		{
			{Suit: games.VERDE, Value: games.ACE},
			{Suit: games.ROSU, Value: games.TEN},
			{Suit: games.ROSU, Value: games.KING},
			{Suit: games.ROSU, Value: games.QUEEN},
			{Suit: games.ROSU, Value: games.JACK},
			{Suit: games.ROSU, Value: games.NINE},
		},
		{
			{Suit: games.ROSU, Value: games.ACE},
			{Suit: games.VERDE, Value: games.TEN},
			{Suit: games.VERDE, Value: games.KING},
			{Suit: games.VERDE, Value: games.QUEEN},
			{Suit: games.VERDE, Value: games.JACK},
			{Suit: games.VERDE, Value: games.NINE},
		},
		{
			{Suit: games.GHINDA, Value: games.ACE},
			{Suit: games.GHINDA, Value: games.TEN},
			{Suit: games.GHINDA, Value: games.KING},
			{Suit: games.GHINDA, Value: games.QUEEN},
			{Suit: games.GHINDA, Value: games.JACK},
			{Suit: games.GHINDA, Value: games.NINE},
		},
		{
			{Suit: games.DUBA, Value: games.ACE},
			{Suit: games.DUBA, Value: games.TEN},
			{Suit: games.DUBA, Value: games.KING},
			{Suit: games.DUBA, Value: games.QUEEN},
			{Suit: games.DUBA, Value: games.JACK},
			{Suit: games.DUBA, Value: games.NINE},
		},
	}
}

func setupRoundState() *RoundState {
	logger := logger.New()
	logger.Init()

	return NewRoundState(logger, nil, 0)
}

func TestPlayTrumpPair(t *testing.T) {
	require := require.New(t)
	sut := setupRoundState()
	sut.PlayerCardsInHand = playerCardsInHand()

	sut.PlayAuction(2)
	sut.PlayAuction(0)
	sut.PlayAuction(0)
	sut.PlayAuction(0)

	playerIndex := sut.GetPlayerIndex()
	require.Equal(0, playerIndex)

	card := games.Card{Suit: games.ROSU, Value: games.KING}
	err := sut.PlayCard(card)
	require.Nil(err)

	pointsTrumpPair := sut.CardPoints[0]
	require.Equal(uint(40), pointsTrumpPair)
}

func TestPlayNormalPair(t *testing.T) {
	require := require.New(t)
	sut := setupRoundState()
	sut.PlayerCardsInHand = playerCardsInHand()

	sut.PlayAuction(2)
	sut.PlayAuction(0)
	sut.PlayAuction(0)
	sut.PlayAuction(0)

	card := games.Card{Suit: games.ROSU, Value: games.KING}
	err := sut.PlayCard(card)
	require.Nil(err)

	card = games.Card{Suit: games.ROSU, Value: games.ACE}
	err = sut.PlayCard(card)
	require.Nil(err)

	card = games.Card{Suit: games.GHINDA, Value: games.NINE}
	err = sut.PlayCard(card)
	require.Nil(err)

	card = games.Card{Suit: games.DUBA, Value: games.ACE}
	err = sut.PlayCard(card)
	require.Nil(err)

	playerIndex := sut.GetPlayerIndex()
	require.Equal(1, playerIndex)

	team1PointsBeforePair := sut.CardPoints[1]

	card = games.Card{Suit: games.VERDE, Value: games.KING}
	err = sut.PlayCard(card)
	require.Nil(err)

	team1PointsAfterPair := sut.CardPoints[1]
	pointsNormalPair := team1PointsAfterPair - team1PointsBeforePair
	require.Equal(uint(20), pointsNormalPair)
}
