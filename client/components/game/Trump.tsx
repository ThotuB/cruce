import { useGame } from "contexts/GameContext"
import { CardSuit } from "proto/protocol/game/misc_pb"

export default function Trump() {
    const { trump } = useGame()

    const trumpExists = trump != null

    if (!trumpExists) return null

    return (
        <div className="absolute flex h-full w-full items-center justify-center">
            <div
                className={`flex h-36 w-36 items-center justify-center rounded-full border-4 border-purple-300 bg-dark-1 transition-opacity
                    ${trumpExists ? "" : "opacity-0"}`}
            >
                <TrumpImage trump={trump} />
            </div>
        </div>
    )
}

const TrumpImage: React.FC<{ trump: CardSuit }> = ({ trump }) => {
    const fileName = toPngFileName(trump)

    return <img src={`/${fileName}.png`} alt="trump" />
}

const toPngFileName = (trump: CardSuit) => {
    switch (trump) {
        case CardSuit.DUBA:
            return "D"
        case CardSuit.ROSU:
            return "R"
        case CardSuit.VERDE:
            return "V"
        case CardSuit.GHINDA:
            return "G"
    }
}
