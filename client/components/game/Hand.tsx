import { useGame, useTable } from "contexts/GameContext";
import { CardState } from "proto/protocol/game/protocol_pb";
import Card from "./Card";


export default function Hand() {
    const { handCards } = useGame()
    const { cheating } = useTable()

    return (
        <div className="absolute flex justify-center -bottom-20 w-full">
            {handCards.map((card, index) => {
                const isCheating = (card.state == CardState.DISABLED) && cheating
                const isDisabled = (card.state == CardState.DISABLED) && !cheating

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
