import GameProvider from "contexts/GameContext"
import { Table } from "proto/table_pb"
import React from "react"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"
import { default as TableComponent } from "./Table"
import Trump from "./Trump"

const Game: React.FC<{
    id: number
    table: Table
}> = ({ id, table }) => {
    return (
        <div className="relative h-full w-full">
            <GameProvider table={table} id={id}>
                <div className="absolute flex h-full w-full items-center justify-center">
                    <div className="relative aspect-square h-3/4 rounded-full bg-dark-2">
                        <Player index={0} />
                        <Player index={1} />
                        <Player index={2} />
                        <Player index={3} />
                        <TableComponent />
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
