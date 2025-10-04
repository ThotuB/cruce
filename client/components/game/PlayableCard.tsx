import { useGameFns } from "contexts/GameContext"
import { Card as PCard } from "proto/protocol/game/misc_pb"
import React from "react"
import Card from "./Card"

const PlayableCard: React.FC<{
    index: number
    card: PCard
    isCheating: boolean
    isDisabled: boolean
}> = ({ index, card, isCheating, isDisabled }) => {
    const { playCard } = useGameFns()

    const play = () => {
        if (isDisabled) return

        playCard(card)
    }

    return (
        <div
            className={`mx-[max(min(-1rem,calc(10%-153px)),-5rem)] shadow-lg rounded-3xl transition-all
            ${isDisabled
                    ? "translate-y-20 shadow-black brightness-[0.33]"
                    : isCheating
                        ? "translate-y-10 cursor-pointer shadow-white brightness-50 hover:translate-y-0"
                        : "cursor-pointer shadow-dark-1 hover:-translate-y-20"
                }`}
            style={{
                zIndex: index,
            }}
            onClick={play}
        >
            <Card
                suit={card.suit}
                value={card.value}
            />
        </div>
    )
}

export default PlayableCard
