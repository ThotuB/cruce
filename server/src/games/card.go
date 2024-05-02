package games

import "cruce-server/protobufs/protocol/game_protocol"

type Suit uint8

const (
	ROSU   Suit = 0
	DUBA   Suit = 1
	VERDE  Suit = 2
	GHINDA Suit = 3
)

type Value uint8

const (
	ACE   Value = 11
	TEN   Value = 10
	KING  Value = 4
	QUEEN Value = 3
	JACK  Value = 2
	NINE  Value = 0
)

type Card struct {
	Suit  Suit
	Value Value
}

func (self Card) GetValue() uint {
	return uint(self.Value)
}

func (self Card) BetterThan(other Card, trump Suit) bool {
	if self.Suit == trump && other.Suit != trump {
		return true
	}

	if self.Suit == other.Suit && self.GetValue() > other.GetValue() {
		return true
	}

	return false
}

func (self Suit) ToProto() game_protocol.CardSuit {
	switch self {
	case ROSU:
		return game_protocol.CardSuit_ROSU
	case DUBA:
		return game_protocol.CardSuit_DUBA
	case VERDE:
		return game_protocol.CardSuit_VERDE
	case GHINDA:
		return game_protocol.CardSuit_GHINDA
	default:
		panic("card suit")
	}
}

func (self Value) ToProto() game_protocol.CardValue {
	switch self {
	case ACE:
		return game_protocol.CardValue_ACE
	case TEN:
		return game_protocol.CardValue_TEN
	case KING:
		return game_protocol.CardValue_KING
	case QUEEN:
		return game_protocol.CardValue_QUEEN
	case JACK:
		return game_protocol.CardValue_JACK
	case NINE:
		return game_protocol.CardValue_NINE
	default:
		panic("card value")
	}
}

func (self Card) ToProto() *game_protocol.Card {
	return &game_protocol.Card{
		Suit:  self.Suit.ToProto(),
		Value: self.Value.ToProto(),
	}
}
