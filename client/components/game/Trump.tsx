import { useGame } from "contexts/GameContext"
import { CardSuit } from "proto/protocol/game/misc_pb"
import { trumpImagePath } from "utils/cards"

export default function Trump() {
    const { trump } = useGame()

    const trumpExists = trump != null

    if (!trumpExists) return null

    return (
        <div className="absolute flex h-full w-full items-center justify-center">
            <div
                className={`flex h-36 w-36 items-center justify-center rounded-full border-4 border-dark-1 bg-white transition-opacity
                    ${trumpExists ? "" : "opacity-0"}`}
            >
                <TrumpImage trump={trump} />
            </div>
        </div>
    )
}

const TrumpImage: React.FC<{ trump: CardSuit }> = ({ trump }) => {
    const fileName = trumpImagePath("original", trump)

    return <img src={fileName} alt="trump" />
}

