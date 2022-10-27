import { useState } from "react";
import { IUser } from "types/game";

interface ScoreBoardProps {
    players: (IUser | null)[];
    playerIndex: number;
    team1Points: number;
    team2Points: number;
    team1Score: number;
    team2Score: number;
}

export default function ScoreBoard({ players, playerIndex, team1Points, team2Points, team1Score, team2Score }: ScoreBoardProps) {
    const [hidden, setHidden] = useState(true);

    return (
        <div className="absolute p-4 flex gap-3">
            <div className="peer rounded-2xl bg-dark-1 p-4 w-min cursor-pointer"
                onClick={() => setHidden(!hidden)}
            >
                <div className="border border-purple-300 rounded-lg flex flex-col text-4xl font-bold font-mono divide-y divide-purple-300">
                    <div className="flex divide-x divide-purple-300">
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team1Points}
                        </div>
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team1Score}
                        </div>
                    </div>
                    <div className="flex divide-x divide-purple-300">
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team2Points}
                        </div>
                        <div className="py-6 w-20 flex justify-center items-center">
                            {team2Score}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`rounded-2xl bg-dark-1 p-4 transition-all ${hidden ? 'opacity-0 peer-hover:opacity-100' : ''}`}>
                <div className="h-full border border-purple-300 rounded-lg flex flex-col justify-center text-4xl font-bold font-mono divide-y divide-purple-300">
                    <div className="flex flex-col px-12">
                        <div className={`${(playerIndex === 0) && 'text-purple-300'}`}>
                            {players[0]?.name || '...'}
                        </div>
                        <div className={`${(playerIndex === 2) && 'text-purple-300'}`}>
                            {players[2]?.name || '...'}
                        </div>
                    </div>
                    <div className="flex flex-col px-12">
                        <div className={`${(playerIndex === 1) && 'text-purple-300'}`}>
                            {players[1]?.name || '...'}
                        </div>
                        <div className={`${(playerIndex === 3) && 'text-purple-300'}`}>
                            {players[3]?.name || '...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}