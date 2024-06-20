import { Graphics as PixiGraphics } from "@pixi/graphics"
import { Graphics, Sprite, Stage } from "@pixi/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import GameProvider from "contexts/GameContext"
import { UserProvider } from "contexts/UserContext"
import { Table } from "proto/table_pb"
import React, { useCallback } from "react"
import Hand from "./Hand"

const gameQueryClient = new QueryClient()

const Game: React.FC<{
    id: number
    table: Table
}> = ({ id, table }) => {
    const ref = React.useRef<Stage>(null)

    console.log(ref.current)

    return (
        <Stage
            ref={ref}
            width={1000}
            height={1000}
            options={{
                backgroundColor: 0x1099bb,
            }}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <QueryClientProvider client={gameQueryClient}>
                <UserProvider>
                    <GameProvider table={table} id={id}>
                        <Hand />
                    </GameProvider>
                </UserProvider>
            </QueryClientProvider>
        </Stage>
    )
}

const Card = (props) => {
    console.log(props)

    const draw = useCallback((g: PixiGraphics) => {
        g.clear()
        g.beginFill(0xff0000)
        g.drawRect(0, 0, 200, 400)
        g.endFill()
    }, [])

    return (
        <Graphics draw={draw}>
            <Sprite image={"/D0.png"} x={10} y={10} width={180} height={180} />
        </Graphics>
    )
}

export default Game
