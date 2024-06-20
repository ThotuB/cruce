package cruce_2v2_6

import (
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
	"testing"

	"github.com/stretchr/testify/require"
)

func setupGameState(rules games.Rules) *GameState {
	logger := logger.New()
	logger.Init()

	return NewGameState(logger, rules)
}

func TestFullRound(t *testing.T) {
	require := require.New(t)
	sut := setupGameState(games.Rules{})
	sut.Round.PlayerCardsInHand = playerCardsInHand()

	// auction
	err := sut.Round.PlayAuction(2)
	require.Nil(err)
	err = sut.Round.PlayAuction(0)
	require.Nil(err)
	err = sut.Round.PlayAuction(0)
	require.Nil(err)
	err = sut.Round.PlayAuction(0)
	require.Nil(err)

	// trick 1
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.QUEEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.ACE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.NINE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.ACE})
	require.Nil(err)

	playerIndex := sut.Round.GetPlayerIndex()
	require.Equal(1, playerIndex, "Player 1 should have won the trick")

	points := sut.Round.CardPoints
	require.Equal(uint(40), points[0], "Team 0 should have 40 points")
	require.Equal(uint(25), points[1], "Team 1 should have 25 points")

	// trick 2
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.QUEEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.TEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.NINE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.ACE})
	require.Nil(err)

	playerIndex = sut.Round.GetPlayerIndex()
	require.Equal(0, playerIndex, "Player 0 should have won the trick")

	points = sut.Round.CardPoints
	require.Equal(uint(64), points[0], "Team 0 should have 64 points")
	require.Equal(uint(45), points[1], "Team 1 should have 45 points")

	// trick 3
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.TEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.NINE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.ACE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.JACK})
	require.Nil(err)

	playerIndex = sut.Round.GetPlayerIndex()
	require.Equal(0, playerIndex, "Player 0 should have won the trick")

	points = sut.Round.CardPoints
	require.Equal(uint(87), points[0], "Team 0 should have 87 points")
	require.Equal(uint(45), points[1], "Team 1 should have 45 points")

	// trick 4
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.KING})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.JACK})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.KING})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.QUEEN})

	playerIndex = sut.Round.GetPlayerIndex()
	require.Equal(0, playerIndex, "Player 0 should have won the trick")

	points = sut.Round.CardPoints
	require.Equal(uint(100), points[0], "Team 0 should have 100 points")
	require.Equal(uint(45), points[1], "Team 1 should have 45 points")

	// trick 5
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.JACK})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.KING})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.QUEEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.TEN})
	require.Nil(err)

	playerIndex = sut.Round.GetPlayerIndex()
	require.Equal(0, playerIndex, "Player 0 should have won the trick")

	points = sut.Round.CardPoints
	require.Equal(uint(119), points[0], "Team 0 should have 119 points")
	require.Equal(uint(45), points[1], "Team 1 should have 45 points")

	// trick 6
	err = sut.PlayCard(games.Card{Suit: games.ROSU, Value: games.NINE})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.VERDE, Value: games.TEN})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.GHINDA, Value: games.JACK})
	require.Nil(err)
	err = sut.PlayCard(games.Card{Suit: games.DUBA, Value: games.KING})
	require.Nil(err)

	// round over
	teamScores := sut.GamePoints
	require.Equal(uint(4), teamScores[0], "Team 0 should have 4 game points")
	require.Equal(uint(1), teamScores[1], "Team 1 should have 0 game points")

	// new round - auction passed to player 1
	playerIndex = sut.Round.GetPlayerIndex()
	require.Equal(1, playerIndex, "Player 1 should start the auction")
}
