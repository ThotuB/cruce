package cruce_2v2_6

import (
	"cruce-server/src/games"
)

func remove(slice []games.Card, i int) []games.Card {
	return append(slice[:i], slice[i+1:]...)
}
