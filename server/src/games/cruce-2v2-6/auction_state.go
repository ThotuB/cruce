package cruce_2v2_6

import "errors"

type AuctionState struct {
	Bids           []uint
	MaxBid         uint
	AuctionStarter uint // index of player who started the auction
	PlayerIndex    uint // index of player whos turn it is to auction
	TurnNum        uint
}

func NewAuctionState(playerIndex uint) AuctionState {
	return AuctionState{
		Bids:        make([]uint, 0, 4),
		MaxBid:      0,
		PlayerIndex: playerIndex,
	}
}

func (self AuctionState) PlayBid(bid uint) error {
	if self.MaxBid != 0 && bid != 0 && bid <= self.MaxBid {
		return errors.New("auction error: auction bid < max bid")
	}

	// valid - set state
	self.Bids = append(self.Bids, bid)
	if self.MaxBid < bid {
		self.MaxBid = bid
	}

	return nil
}

func (self AuctionState) GetAuctionWinner() uint {
	winner := uint(0)
	for i, bid := range self.Bids {
		if bid == self.MaxBid {
			winner = uint(i)
			break
		}
	}

	return (winner + self.AuctionStarter) % 4
}
