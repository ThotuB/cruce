import CardImage from "components/cards/CardImage"
import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"

const Card: React.FC<{
    suit: CardSuit,
    value: CardValue,
    containerClassName?: string,
    cardClassName?: string,
    containerStyle?: React.CSSProperties,
    cardStyle?: React.CSSProperties,
}> = ({ suit, value, containerClassName, containerStyle, cardClassName, cardStyle }) => (
    <div className={`bg-white rounded-3xl ${containerClassName || "p-4"}`}
        style={containerStyle}
    >
        <div
            className={`flex flex-col ${cardClassName || "w-56"} aspect-card justify-center divide-y-4 overflow-hidden rounded-xl border-4 border-dark-2 divide-dark-2`}
            style={cardStyle}
        >
            <div>
                <CardImage
                    pack="original"
                    suit={suit}
                    value={value}
                />
            </div>
            <div>
                <CardImage
                    className='rotate-180'
                    pack="original"
                    suit={suit}
                    value={value}
                />
            </div>
        </div>
    </div>
)

export default Card
