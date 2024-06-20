package games

import pbs "cruce-server/protobufs/protocol/game_protocol"

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

func (s *Suit) ToProto() *pbs.CardSuit {
	if s == nil {
		return nil
	}

	switch *s {
	case ROSU:
		return pbs.CardSuit_ROSU.Enum()
	case DUBA:
		return pbs.CardSuit_DUBA.Enum()
	case VERDE:
		return pbs.CardSuit_VERDE.Enum()
	case GHINDA:
		return pbs.CardSuit_GHINDA.Enum()
	default:
		panic("card suit")
	}
}

func (self Value) ToProto() pbs.CardValue {
	switch self {
	case ACE:
		return pbs.CardValue_ACE
	case TEN:
		return pbs.CardValue_TEN
	case KING:
		return pbs.CardValue_KING
	case QUEEN:
		return pbs.CardValue_QUEEN
	case JACK:
		return pbs.CardValue_JACK
	case NINE:
		return pbs.CardValue_NINE
	default:
		panic("card value")
	}
}

func (c Card) ToProto() *pbs.Card {
	return &pbs.Card{
		Suit:  *c.Suit.ToProto(),
		Value: c.Value.ToProto(),
	}
}

func SuitFromProto(proto pbs.CardSuit) Suit {
	switch proto {
	case pbs.CardSuit_ROSU:
		return ROSU
	case pbs.CardSuit_DUBA:
		return DUBA
	case pbs.CardSuit_VERDE:
		return VERDE
	case pbs.CardSuit_GHINDA:
		return GHINDA
	default:
		panic("card suit")
	}
}

func ValueFromProto(proto pbs.CardValue) Value {
	switch proto {
	case pbs.CardValue_ACE:
		return ACE
	case pbs.CardValue_TEN:
		return TEN
	case pbs.CardValue_KING:
		return KING
	case pbs.CardValue_QUEEN:
		return QUEEN
	case pbs.CardValue_JACK:
		return JACK
	case pbs.CardValue_NINE:
		return NINE
	default:
		panic("card value")
	}
}

func CardFromProto(proto *pbs.Card) Card {
	return Card{
		Suit:  SuitFromProto(proto.Suit),
		Value: ValueFromProto(proto.Value),
	}
}
