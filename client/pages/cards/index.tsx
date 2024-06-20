import CardImage from "components/cards/CardImage"
import TrumpImage from "components/cards/TrumpImage"
import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import { useState } from "react"
import { CardPack, CARD_PACK } from "utils/cards"

const cardPacks = [CARD_PACK.ORIGINAL, CARD_PACK.BETA, CARD_PACK.MOSAIC]
const cardSuits = [CardSuit.ROSU, CardSuit.VERDE, CardSuit.GHINDA, CardSuit.DUBA]
const cardValues = [CardValue.ACE, CardValue.TEN, CardValue.NINE, CardValue.KING, CardValue.QUEEN, CardValue.JACK]

const CardViewer: React.FC = () => {
    const [pack, setPack] = useState<CardPack>(CARD_PACK.ORIGINAL)

    return (
        <div className="h-full w-full flex flex-row justify-center items-center gap-x-16">
            <div className="flex flex-col gap-y-4">
                {cardPacks.map((pack, index) => (
                    <button key={index} className="rounded-xl border-4 text-3xl font-black bg-dark-3 border-purple-300 p-4" onClick={() => setPack(pack)}>
                        {pack.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className="flex flex-row items-stretch gap-x-16 py-4 px-12 bg-dark-2 rounded-2xl">
                <div className="flex flex-col justify-around gap-y-4">
                    {cardSuits.map((suit, index) => (
                        <div key={index} className="bg-white rounded-full p-2 border-4 border-purple-300">
                            <TrumpImage pack={pack} suit={suit} className="w-24" />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-6 gap-x-12 gap-y-4">
                    {cardSuits.map((suit, suitIndex) => (
                        <>{
                            cardValues.map((value, valueIndex) => (
                                <Card key={suitIndex * 6 + valueIndex}
                                    pack={pack}
                                    suit={suit}
                                    value={value}
                                />

                            ))
                        }</>
                    ))}
                </div>
            </div>
        </div>
    )
}

const Card: React.FC<{
    pack: CardPack
    suit: CardSuit
    value: CardValue
}> = ({ pack, suit, value }) => {
    return (
        <div className="rounded-2xl p-2 bg-white">
            <div className="flex flex-col justify-center divide-y-2 divide-dark-2 overflow-hidden rounded-xl border-2 border-dark-2">
                <div>
                    <CardImage
                        className="w-36 pt-1"
                        pack={pack}
                        suit={suit}
                        value={value}
                    />
                </div>
                <div>
                    <CardImage
                        className="w-36 rotate-180 pts-1"
                        pack={pack}
                        suit={suit}
                        value={value}
                    />
                </div>
            </div>
        </div>
    )
}


export default CardViewer
