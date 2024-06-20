import { useGame, useTable } from "contexts/GameContext"
import { CardState } from "proto/protocol/game/client_protocol_pb"
import Card from "./Card"

export default function Hand() {
    const { handCards } = useGame()
    const { cheating } = useTable()

    return (
        <div className="absolute -bottom-20 flex w-full justify-center">
            {handCards.map((card, index) => {
                const isCheating = card.state == CardState.DISABLED && cheating
                const isDisabled = card.state == CardState.DISABLED && !cheating

                return (
                    <Card
                        key={index}
                        index={index}
                        card={card.card!}
                        isCheating={isCheating}
                        isDisabled={isDisabled}
                    />
                )
            })}
        </div>
    )
}
