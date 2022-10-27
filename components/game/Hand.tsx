import { useGame } from "contexts/GameContext";
import { useState } from "react";
import { ICard } from "types/game";
import { canPlayerPlay, isCardCheating } from "utils/game_rules";
import { gameSocket } from "utils/sockets";
import Card from "./Card";

interface HandProps {
    playerIndex: number;
}

export default function Hand({ playerIndex }: HandProps) {
    const { id, table: { cheating, points }, game: {round: {trick, trump, turn, playerTurn, playerCards, playedCards}} } = useGame()
    const [isLoading, setIsLoading] = useState(false);
    const cards = playerCards[playerIndex]

    const disabled = !canPlayerPlay(trick, playerIndex, playerTurn)

    const handlePlayCard = (index: number, card: ICard, isCheating: boolean, isDisabled: boolean) => {
        if (isDisabled) return;

        // setIsLoading(true);
        gameSocket.emit('play-card', {
            gameId: id,
            playerTurn,
            playerIndex,
            cardIndex: index, 
            card, 
            isCheating, 
            scoreToWin: points
        })
    }

    return (
        <div className="absolute flex justify-center -bottom-20 w-full">
            {cards.map((card, index) => {
                const isCheating = disabled || isCardCheating(card, cards, playedCards, trump, turn, playerTurn)

                return (
                    <Card 
                        key={index}
                        index={index}
                        card={card}
                        isCheating={isCheating}
                        isDisabled={isLoading || disabled || (!cheating && isCheating)}
                        onPlay={handlePlayCard}
                    />
                )
            })}
        </div>
    )
}