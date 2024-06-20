import CardImage from "components/cards/CardImage"
import { useGameFns } from "contexts/GameContext"
import { Card as PCard, CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import React from "react"

const Card: React.FC<{
    index: number
    card: PCard
    isCheating: boolean
    isDisabled: boolean
}> = ({ index, card, isCheating, isDisabled }) => {
    const { playCard } = useGameFns()

    return (
        <div
            className={`mx-[max(min(-1rem,calc(10%-153px)),-5rem)] rounded-3xl p-4 shadow-lg transition-all
            ${isDisabled
                    ? "translate-y-20 bg-dark-3 shadow-black"
                    : isCheating
                        ? "translate-y-10 cursor-pointer bg-dark-1 shadow-white hover:translate-y-0"
                        : "cursor-pointer bg-dark-1 shadow-purple-300 hover:-translate-y-20"
                }`}
            style={{
                zIndex: index,
            }}
            onClick={() => playCard(card)}
        >
            <BigCard
                suit={card.suit}
                value={card.value}
                isDisabled={isDisabled}
            />
        </div>
    )
}

const BigCard: React.FC<{
    suit: CardSuit
    value: CardValue
    isDisabled: boolean
}> = ({ suit, value, isDisabled }) => {
    const color = suitColor(suit)

    return (
        <div
            className={`flex h-96 w-56 flex-col justify-center divide-y-4 overflow-hidden rounded-xl border-4 ${color}`}
        >
            <div>
                <CardImage
                    className={`${isDisabled && "brightness-50"}`}
                    pack="original"
                    suit={suit}
                    value={value}
                />
            </div>
            <div>
                <CardImage
                    className={`${isDisabled && "brightness-50"} rotate-180`}
                    pack="original"
                    suit={suit}
                    value={value}
                />
            </div>
        </div>
    )
}

const suitColor = (suit: CardSuit) => {
    switch (suit) {
        case CardSuit.ROSU:
            return "border-red-600 divide-red-600"
        case CardSuit.DUBA:
            return "border-yellow-400 divide-yellow-400"
        case CardSuit.VERDE:
            return "border-green-700 divide-green-700"
        case CardSuit.GHINDA:
            return "border-amber-700 divide-amber-700"
    }
}

export default Card
