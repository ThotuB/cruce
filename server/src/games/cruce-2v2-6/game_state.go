package cruce_2v2_6

import (
	"cruce-server/src/games"
	"cruce-server/src/utils/logger"
)

type GameState struct {
	log        logger.Logger
	rules      games.Rules
	GamePoints [2]uint
	Round      *RoundState
	RoundNum   uint
}

func NewGameState(log logger.Logger, rules games.Rules) *GameState {
	game := GameState{
		log:        log,
		GamePoints: [2]uint{0, 0},
		RoundNum:   1,
	}
	game.Round = NewRoundState(log, &game, 0)

	return &game
}

type WinningTeam struct {
	teamNo uint
}

func (gs *GameState) winningTeam(rules games.Rules) *WinningTeam {
	t0 := gs.GamePoints[0]
	t1 := gs.GamePoints[1]

	pointsToWin := rules.GetPoints()

	if t0 >= pointsToWin && t1 >= pointsToWin {
		if t0 >= t1-2 {
			return &WinningTeam{
				teamNo: 0,
			}
		} else if t1 >= t0-2 {
			return &WinningTeam{
				teamNo: 1,
			}
		}
		return nil
	}

	if t0 >= pointsToWin {
		return &WinningTeam{
			teamNo: 0,
		}
	}
	if t1 >= pointsToWin {
		return &WinningTeam{
			teamNo: 1,
		}
	}

	return nil
}

func (gs *GameState) RoundOver() {
	gs.log.Debug("Round over")

	scores := gs.Round.CalculateGamePoints()
	gs.GamePoints[0] += scores[0]
	gs.GamePoints[1] += scores[1]

	winningTeam := gs.winningTeam(gs.rules)
	if winningTeam == nil {
		gs.RoundNum++
		gs.Round = NewRoundState(gs.log, gs, (int(gs.RoundNum)-1)%4)
		return
	}

	// game over
}

func (gs *GameState) PlayCard(card games.Card) error {
	err := gs.Round.PlayCard(card)
	if err != nil {
		return err
	}

	return nil
}
