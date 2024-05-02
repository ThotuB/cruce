import GameProvider from "contexts/GameContext"
import { Table } from "proto/table_pb"
import React from "react"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"
import { default as TTable } from "./Table"
import Trump from "./Trump"

const Game: React.FC<{
    id: number;
    table: Table;
}> = ({ id, table }) => {
    return (
        <div className="relative w-full h-full">
            <GameProvider table={table} id={id}>
                <div className="absolute h-full w-full flex items-center justify-center">
                    <div className="relative h-3/4 aspect-square bg-dark-2 rounded-full">
                        <Player index={0} />
                        <Player index={1} />
                        <Player index={2} />
                        <Player index={3} />
                        <TTable />
                        <Trump />
                    </div>
                </div>
                <Auction />
                <Hand />
                <ScoreBoard />
                <Buttons />
            </GameProvider>
        </div>
    )
}

export default Game
