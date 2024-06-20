import useGameState from "hooks/UseGameState"
import { PlayerPov } from "proto/protocol/game/client_protocol_pb"
import { Card } from "proto/protocol/game/misc_pb"
import { PlayBid, PlayCard } from "proto/protocol/game/server_protocol_pb"
import { Table } from "proto/table_pb"
import React, { createContext, useContext } from "react"
import { useUser } from "./UserContext"

interface GameContext {
    state: PlayerPov
    table: Table
    id: number
    playBid: (bid: number) => void
    playCard: (card: Card) => void
}

const GameContext = createContext({} as GameContext)

export function useGame() {
    return useContext(GameContext).state
}

export function useTable() {
    return useContext(GameContext).table
}

export function useGameFns() {
    const context = useContext(GameContext)
    return {
        playBid: context.playBid,
        playCard: context.playCard,
    }
}

const GameProvider: React.FC<{
    table: Table
    id: number
}> = ({ table, id, children }) => {
    const { user } = useUser()

    const { state, sendBid, sendCard } = useGameState(user.uid, id)

    const playBid = (bid: number) => {
        sendBid(new PlayBid({ bid: bid }))
    }

    const playCard = (card: Card) => {
        sendCard(new PlayCard({ card: card }))
    }

    const accuseCheating = () => {}

    return (
        <>
            {state && (
                <GameContext.Provider
                    value={{
                        state,
                        table,
                        id,
                        playBid,
                        playCard,
                    }}
                >
                    {children}
                </GameContext.Provider>
            )}
        </>
    )
}

export default GameProvider
