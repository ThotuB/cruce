import { Table } from "proto/table_pb"
import GameModeItem from "./GameTableCard"

const GameMode: React.FC<{
    title: React.ReactNode
    games: Table[]
    onJoin: (table: Table) => void
}> = ({ title, games, onJoin }) => {
    return (
        <div className="flex h-full flex-1 flex-col items-center gap-2 rounded-xl bg-dark-2 px-4 py-2 2xl:gap-8">
            <div className="text-3xl font-bold">{title}</div>
            <div className="w-full flex-1 flex-col gap-4 overflow-y-auto md:grid md:flex-none md:grid-cols-2 2xl:flex 2xl:flex-col">
                {games.map((table, index) => (
                    <GameModeItem key={index} table={table} onJoin={onJoin} />
                ))}
            </div>
        </div>
    )
}
export default GameMode
