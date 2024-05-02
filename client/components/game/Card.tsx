import { useGameFns } from "contexts/GameContext";
import { Card as TCard, CardSuit, CardValue } from "proto/protocol/game/protocol_pb";
import React from "react";

const Card: React.FC<{
    index: number
    card: TCard;
    isCheating: boolean;
    isDisabled: boolean;
}> = ({ index, card, isCheating, isDisabled }) => {
    const { playCard } = useGameFns()

    return (
        <div className={`rounded-3xl p-4 shadow-lg transition-all mx-[max(min(-1rem,calc(10%-153px)),-5rem)]
            ${false
                ? 'translate-y-20 bg-dark-3 shadow-black'
                : isCheating
                    ? 'translate-y-10 hover:translate-y-0 bg-dark-1 cursor-pointer shadow-white'
                    : 'hover:-translate-y-20 bg-dark-1 cursor-pointer shadow-purple-300'
            }`}
            style={{
                zIndex: index
            }}
            onClick={() => playCard(card)}
        >
            <CardImage suit={card.suit} value={card.value} isDisabled={isDisabled} />
        </div>
    )
}

const CardImage: React.FC<{
    suit: CardSuit
    value: CardValue
    isDisabled: boolean
}> = ({ suit, value, isDisabled }) => {
    const path = imageName(suit, value)
    const color = suitColor(suit)

    return (
        <div className={`w-56 h-96 rounded-xl border-4 flex flex-col divide-y-4 justify-center overflow-hidden ${color}`}>
            <div>
                <img className={`${isDisabled && 'brightness-50'}`} src={path} />
            </div>
            <div>
                <img className={`${isDisabled && 'brightness-50'} rotate-180`} src={path} />
            </div>
        </div>
    )
}

const imageSuit = (suit: CardSuit) => {
    switch (suit) {
        case CardSuit.ROSU:
            return 'R'
        case CardSuit.DUBA:
            return 'D'
        case CardSuit.VERDE:
            return 'V'
        case CardSuit.GHINDA:
            return 'G'
    }
}

const imageValue = (value: CardValue) => {
    switch (value) {
        case CardValue.ACE:
            return 11
        case CardValue.TEN:
            return 10
        case CardValue.KING:
            return 4
        case CardValue.QUEEN:
            return 3
        case CardValue.JACK:
            return 2
        case CardValue.NINE:
            return 0
    }
}

const imageName = (suit: CardSuit, value: CardValue) => {
    return `/${imageSuit(suit)}${imageValue(value)}.png`
}

const suitColor = (suit: CardSuit) => {
    switch (suit) {
        case CardSuit.ROSU:
            return 'border-red-600 divide-red-600'
        case CardSuit.DUBA:
            return 'border-yellow-400 divide-yellow-400'
        case CardSuit.VERDE:
            return 'border-green-700 divide-green-700'
        case CardSuit.GHINDA:
            return 'border-amber-700 divide-amber-700'
    }

}

export default Card
