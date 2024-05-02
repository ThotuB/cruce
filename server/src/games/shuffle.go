package games

import "math/rand"

func AllCards() [24]Card {
	suits := [4]Suit{ROSU, DUBA, VERDE, GHINDA}
	values := [6]Value{ACE, TEN, KING, QUEEN, JACK, NINE}

	var cards [24]Card
	for i, suit := range suits {
		for j, value := range values {
			card := Card{
				Suit:  suit,
				Value: value,
			}
			cards[i*6+j] = card
		}
	}

	return cards
}

func ShuffledCards() [24]Card {
	cards := AllCards()

	for i := range cards {
		j := rand.Intn(i + 1)
		cards[i], cards[j] = cards[j], cards[i]
	}

	return cards
}

func ShuffledCards4Players() [4][]Card {
	shuffledCards := ShuffledCards()

	var playerCards [4][]Card
	for i := range 4 {
		startIndex := i * 6
		stopIndex := i*6 + 6
		playerCards[i] = []Card(shuffledCards[startIndex:stopIndex])
	}

	return playerCards

}
