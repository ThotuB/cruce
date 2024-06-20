import { useGame } from "contexts/GameContext"
import { useWindowDimensions } from "hooks/hooks"
import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import CardImage from "./CardImage"

export default function Table() {
    const { playedCards } = useGame()

    const { height } = useWindowDimensions()

    const radius = (height * 3) / 14

    return (
        <>
            {playedCards.map((tableCard, index) => {
                const position = -index
                const rad = ((position - 1) * Math.PI) / 2
                const deg = (rad * 180) / Math.PI
                const x = radius * Math.cos(rad)
                const y = -radius * Math.sin(rad)

                const style = {
                    width: `${radius * 0.8}px`,
                    transform: `translate(${x}px, ${y}px) rotate(${deg + 90}deg)`,
                }

                if (!tableCard.card) return null

                const card = tableCard.card

                return (
                    <div
                        className="absolute flex h-full w-full items-center justify-center"
                        key={index}
                    >
                        <div
                            className="rounded-3xl bg-dark-1 p-4 shadow-lg"
                            style={style}
                        >
                            <MiniCard suit={card.suit} value={card.value} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

const MiniCard: React.FC<{
    suit: CardSuit
    value: CardValue
}> = ({ suit, value }) => (
    <div className="flex h-full w-full flex-col justify-center divide-y divide-purple-300 overflow-hidden rounded-xl border border-purple-300">
        <div>
            <CardImage suit={suit} value={value} />
        </div>
        <div>
            <CardImage className="rotate-180" suit={suit} value={value} />
        </div>
    </div>
)
