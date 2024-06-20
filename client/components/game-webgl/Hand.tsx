import { Container } from "@pixi/react"
import { useGame, useTable } from "contexts/GameContext"
import { CardState } from "proto/protocol/game/client_protocol_pb"
import Card from "./Card"

const Hand: React.FC = () => {
    const { handCards } = useGame()
    const { cheating } = useTable()

    return (
        <Container x={100} y={800}>
            {handCards.map((card, index) => {
                const isCheating = card.state == CardState.DISABLED && cheating
                const isDisabled = card.state == CardState.DISABLED && !cheating

                return (
                    <Container x={index * 112}>
                        <Card
                            key={index}
                            index={index}
                            card={card.card!}
                            isCheating={isCheating}
                            isDisabled={isDisabled}
                        />
                    </Container>
                )
            })}
        </Container>
    )
}

export default Hand
