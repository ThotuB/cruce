import { useGame } from "contexts/GameContext"
import { CardSuit } from "proto/protocol/game/protocol_pb"


export default function Trump() {
    const { trump } = useGame()

    if (!trump) {
        return (<></>)
    }

    const fileName = toPngFileName(trump)

    return (
        <div className='absolute h-full w-full flex items-center justify-center'>
            <div className={`w-36 h-36 rounded-full bg-dark-1 border-4 border-purple-300 flex items-center justify-center transition-opacity
                    ${trump ? '' : 'opacity-0'}`}
            >
                <img src={`/${fileName}.png`} alt='trump' />
            </div>
        </div>
    )
}

const toPngFileName = (trump: CardSuit) => {
    switch (trump) {
        case CardSuit.DUBA:
            return ''
        case CardSuit.ROSU:
            return ''
        case CardSuit.VERDE:
            return ''
        case CardSuit.GHINDA:
            return ''

    }
}
