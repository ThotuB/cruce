import { createContext, useContext } from "react";
import { IGame, ITable } from "types/game";

interface GameContext {
    game: IGame;
    table: ITable;
    id: string;
}

export const GameContext = createContext({} as GameContext)

export function useGame() {
    return useContext(GameContext)
}