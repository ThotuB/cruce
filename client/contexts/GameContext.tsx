import useGameState from "hooks/UseGameState";
import { PlayerPov } from "proto/protocol/game/protocol_pb";
import { Table } from "proto/table_pb";
import React, { createContext, useContext } from "react";


interface GameContext {
    state: PlayerPov;
    table: Table;
    id: number;
    playBid: (bid: number) => void;
    playCard: (card: any) => void;
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
    const { state, sendBid, sendCard } = useGameState()

    const playBid = (bid: number) => {
        sendBid()
    }

    const playCard = (card: any) => {
        sendCard()
    }

    const accuseCheating = () => {

    }

    return (
        <>
            {state &&
                <GameContext.Provider value={{
                    state,
                    table,
                    id,
                    playBid,
                    playCard
                }}>
                    {children}
                </GameContext.Provider>
            }
        </>
    )
}

export default GameProvider
