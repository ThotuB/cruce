import type { ITable } from "types/game";
import GameTableCard from "./GameTableCard";

interface GameModeProps {
    title: React.ReactNode;
    games: ITable[];
    onJoin: (table: ITable) => void;
}

export default function GameMode({ title, games, onJoin }: GameModeProps) {

    return (
        <div className="bg-dark-2 grow h-full py-2 rounded-xl flex flex-col items-center gap-8 basis-0">
            <div className="text-3xl font-bold">
                {title}
            </div>
            <div className="flex flex-col gap-4 w-full max-h-full px-4 overflow-y-auto">
                {games.map(({id, name, joined, time, points, password, cheating, bigger}, index) => (
                    <GameTableCard 
                        key={index}
                        id={id}
                        name={name}
                        joined={joined}
                        time={time}
                        points={points}
                        password={password}
                        cheating={cheating}
                        bigger={bigger}
                        gameMode={0}
                        onJoin={onJoin}
                    />
                ))}
            </div>
        </div>
    )
}