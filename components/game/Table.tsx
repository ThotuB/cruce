import { useWindowDimensions } from "hooks/hooks";
import { ICard } from "types/game";

interface TableProps {
    playerIndex: number;
    openingPlayer: number;
    cards: ICard[];
}

export default function Table({ playerIndex, openingPlayer, cards }: TableProps) {
    const { height } = useWindowDimensions()
    
    const radius = height * 3 / 14

    return (
        <>
            {cards.map((card, index) => {
                const position = (playerIndex - openingPlayer) - index;
                const rad = (position - 1) * Math.PI / 2
                const deg = rad * 180 / Math.PI
                const x = radius * Math.cos(rad)
                const y = -radius * Math.sin(rad)

                const style = {
                    width: `${radius * 0.8}px`,
                    transform: `translate(${x}px, ${y}px) rotate(${deg+90}deg)`,
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

const MiniCard = ( { name }: CardImageProps ) => (
    <div className="w-full h-full rounded-xl border border-purple-300 flex flex-col divide-y divide-purple-300 justify-center overflow-hidden">
        <div>
            <img src={`/${name}.png`} title="card"/>
        </div>               
        <div>
            <img src={`/${name}.png`} title="card-180" className="rotate-180"/>
        </div>
    </div>
)