import { useGame } from "contexts/GameContext"
import { useWindowDimensions } from "hooks/hooks"
import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import CardImage from "components/cards/CardImage"
import Card from "./Card"

const DEGS = [0, -30, 0, 30]

export default function Table() {
    const { playedCards } = useGame()

    const { height } = useWindowDimensions()

    const radius = (height * 3) / 14

    return (
        <>
            {playedCards.map((tableCard, index) => {
                if (!tableCard.card) return null

                const position = -index
                const rad = ((position - 1) * Math.PI) / 2
                const x = radius * Math.cos(rad)
                const y = -radius * Math.sin(rad)

                const cardStyle = {
                    width: `${radius * 0.6}px`,
                }

                const containerStyle = {
                    transform: `translate(${x}px, ${y}px) rotate(${DEGS[index]}deg)`,
                }

                const card = tableCard.card

                return (
                    <div
                        className="absolute flex h-full w-full items-center justify-center"
                        key={index}
                        style={containerStyle}
                    >
                        <Card suit={card.suit} value={card.value} cardStyle={cardStyle} containerClassName="p-2" cardClassName="" />
                    </div>
                )
            })}
        </>
    )
}
