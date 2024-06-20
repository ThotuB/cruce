package cruce_2v2_6

import (
	p "cruce-server/protobufs/protocol/game_protocol"
	"cruce-server/src/utils/logger"
	"errors"
)

type AuctionState struct {
	log            logger.Logger
	Round          *RoundState
	Bids           []uint
	MaxBid         uint
	AuctionStarter int // index of player who started the auction
	PlayerIndex    int // index of player whos turn it is to auction
	TurnNum        uint
}

func NewAuctionState(log logger.Logger, round *RoundState, playerIndex int) *AuctionState {
	return &AuctionState{
		log:            log,
		Round:          round,
		Bids:           make([]uint, 0, 4),
		MaxBid:         0,
		AuctionStarter: playerIndex,
		PlayerIndex:    playerIndex,
		TurnNum:        1,
	}
}

func (as *AuctionState) nextTurn() {
	as.log.Debug("Auction next turn")
	if as.TurnNum != 4 {
		as.TurnNum++
		as.PlayerIndex = (as.PlayerIndex + 1) % 4
		return
	}

	as.Round.AuctionOver()
}

func (as *AuctionState) PlayBid(bid uint) error {
	if as.MaxBid != 0 && bid != 0 && bid <= as.MaxBid {
		return errors.New("auction error: auction bid < max bid")
	}

	// valid - set state
	as.Bids = append(as.Bids, bid)
	if as.MaxBid < bid {
		as.MaxBid = bid
	}

	as.nextTurn()

	return nil
}

func (as *AuctionState) GetAuctionWinner() int {
	winner := 0
	for i, bid := range as.Bids {
		if bid == as.MaxBid {
			winner = i
			break
		}
	}

	return (winner + as.AuctionStarter) % 4
}

func (as *AuctionState) ToProto(playerIndex int) *p.Auction {
	offset := 4 + as.AuctionStarter - playerIndex

	bids := []*p.Bid{nil, nil, nil, nil}
	for i, bid := range as.Bids {
		value := uint32(bid)
		optBid := &p.Bid{Value: &value}
		bids[(i+offset)%4] = optBid
	}

	return &p.Auction{
		Visible: playerIndex == as.PlayerIndex,
		Bids:    bids,
		MaxBid:  uint32(as.MaxBid),
	}
}
