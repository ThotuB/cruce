package games

type Points uint

const (
	POINTS_6  Points = 0
	POINTS_11 Points = 1
	POINTS_21 Points = 2
)

type Time int32

const (
	TIME_5S  Time = 0
	TIME_15S Time = 1
	TIME_30S Time = 2
)

type Rules struct {
	Points   Points
	Time     Time
	Iber     bool
	Cheating bool
}

func (self Rules) GetPoints() uint {
	switch self.Points {
	case POINTS_6:
		return 6
	case POINTS_11:
		return 11
	case POINTS_21:
		return 21
	}
	return 0
}
