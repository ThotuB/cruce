import { useGame } from "contexts/GameContext";
import { useWindowDimensions } from "hooks/hooks";

export default function Table() {
    const { playedCards } = useGame()

    const { height } = useWindowDimensions()

    const radius = height * 3 / 14

    return (
        <>
            {playedCards.map((card, index) => {
                const position = - index;
                const rad = (position - 1) * Math.PI / 2
                const deg = rad * 180 / Math.PI
                const x = radius * Math.cos(rad)
                const y = -radius * Math.sin(rad)

                const style = {
                    width: `${radius * 0.8}px`,
                    transform: `translate(${x}px, ${y}px) rotate(${deg + 90}deg)`,
                }

                return (
                    <div className="absolute h-full w-full flex items-center justify-center"
                        key={index}
                    >
                        <div className="bg-dark-1 p-4 rounded-3xl shadow-lg"
                            style={style}
                        >
                            <MiniCard name={`${card.suit}${card.value}`} />
                        </div>
                    </div>
                )
            })}
        </>
    )

}

interface CardImageProps {
    name: string
}

const MiniCard = ({ name }: CardImageProps) => (
    <div className="w-full h-full rounded-xl border border-purple-300 flex flex-col divide-y divide-purple-300 justify-center overflow-hidden">
        <div>
            <img src={`/${name}.png`} title="card" />
        </div>
        <div>
            <img src={`/${name}.png`} title="card-180" className="rotate-180" />
        </div>
    </div>
)
