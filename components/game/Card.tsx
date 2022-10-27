import type { ICard } from "types/game";


interface CardProps {
    index: number;
    card: ICard;
    isCheating: boolean;
    isDisabled: boolean;
    onPlay: (index: number, card: ICard, isCheating: boolean, isDisabled: boolean) => void;
}

export default function Card({ index, card, isCheating, isDisabled, onPlay }: CardProps) {
    const cardName = `${card.suit}${card.value}`;

    return (
        <div className={`rounded-3xl p-4 shadow-lg transition-all
            ${isDisabled
                ? 'translate-y-20 bg-dark-3 shadow-black' 
                : isCheating
                    ? 'translate-y-10 hover:translate-y-0 bg-dark-1 cursor-pointer shadow-white'
                    : 'hover:-translate-y-20 bg-dark-1 cursor-pointer shadow-purple-300'
            }`}
            onClick={() => onPlay(index, card, isCheating, isDisabled)}
        >
            <CardImage name={cardName} />
        </div>
    )
}

interface CardImageProps {
    name: string
}

const CardImage = ( { name }: CardImageProps ) => (
    <div className="w-56 h-96 rounded-xl border border-purple-300 flex flex-col divide-y divide-purple-300 justify-center overflow-hidden">
        <div>
            <img src={`/${name}.png`} title="card"/>
        </div>               
        <div>
            <img src={`/${name}.png`} title="card-180" className="rotate-180"/>
        </div>
    </div>
)