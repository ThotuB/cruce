import { Table } from "proto/table_pb";
import GameTableCard from "./GameTableCard";

const GameMode: React.FC<{
    title: React.ReactNode;
    games: Table[];
    onJoin: (table: Table) => void;
}> = ({ title, games, onJoin }) => {
    return (
        <div className="bg-dark-2 grow h-full py-2 rounded-xl flex flex-col items-center gap-8 basis-0">
            <div className="text-3xl font-bold">
                {title}
            </div>
            <div className="flex flex-col gap-4 w-full max-h-full px-4 overflow-y-auto">
                {games.map((table, index) => (
                    <GameTableCard
                        key={index}
                        table={table}
                        onJoin={onJoin}
                    />
                ))}
            </div>
        </div>
    )
}
export default GameMode
