import { useGame } from "contexts/GameContext"
import { Player } from "proto/protocol/game/client_protocol_pb"
import { useState } from "react"

export default function ScoreBoard() {
    const { team1Score, team2Score, team1Points, team2Points, players } = useGame()

    const [hidden, setHidden] = useState(false)

    return (
        <div className="absolute flex gap-3 p-4">
            <div
                className="peer w-min cursor-pointer rounded-2xl bg-dark-1 p-4"
                onClick={() => setHidden(!hidden)}
            >
                <div className="flex flex-col divide-y divide-purple-300 rounded-lg border border-purple-300 font-mono text-4xl font-bold">
                    <div className="flex divide-x divide-purple-300">
                        <div className="flex w-20 items-center justify-center py-6">
                            {team1Points}
                        </div>
                        <div className="flex w-20 items-center justify-center py-6">
                            {team1Score}
                        </div>
                    </div>
                    <div className="flex divide-x divide-purple-300">
                        <div className="flex w-20 items-center justify-center py-6">
                            {team2Points}
                        </div>
                        <div className="flex w-20 items-center justify-center py-6">
                            {team2Score}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`cursor-pointer rounded-2xl bg-dark-1 p-4 ${hidden && "hidden"}`}
            >
                <div className="h-full flex flex-col divide-y divide-purple-300 rounded-lg border border-purple-300 text-2xl font-bold">
                    <div className="flex flex-col flex-1 justify-evenly">
                        <ScoreBoardPlayer player={players[0]} />
                        <ScoreBoardPlayer player={players[1]} />
                    </div>
                    <div className="flex flex-col flex-1 justify-evenly">
                        <ScoreBoardPlayer player={players[2]} />
                        <ScoreBoardPlayer player={players[3]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ScoreBoardPlayer: React.FC<{ player?: Player }> = ({ player }) => {
    return (
        <div className="px-4">
            {player ?
                <div className="">
                    {player.name}
                </div> :
                <div className="">
                    Waiting for player
                </div>
            }
        </div>
    )
}
