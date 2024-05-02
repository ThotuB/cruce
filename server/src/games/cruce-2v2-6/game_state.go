package cruce_2v2_6

import "cruce-server/src/games"

type GameState struct {
	TeamScore [2]uint
	Round     RoundState
	RoundNum  uint
}

func NewGameState() GameState {
	return GameState{
		TeamScore: [2]uint{0, 0},
		Round:     NewRoundState(0),
		RoundNum:  1,
	}
}

type WinningTeam struct {
	teamNo uint
}

func (self GameState) winningTeam(rules games.Rules) *WinningTeam {
	t0 := self.TeamScore[0]
	t1 := self.TeamScore[1]

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

func (self GameState) nextRound(rules games.Rules) bool {
	self.RoundNum++
	scores := self.Round.GetTeamScores()
	self.TeamScore[0] += scores[0]
	self.TeamScore[1] += scores[1]

	winningTeam := self.winningTeam(rules)
	if winningTeam == nil {
		self.Round = NewRoundState((self.RoundNum - 1) % 4)
		return false
	}

	return true
}

func (self GameState) PlayCard(card games.Card) error {
	err := self.Round.PlayCard(card)
	if err != nil {
		return err
	}

	return nil
}
