import { useGame } from "contexts/GameContext"
import { useState } from "react"

export default function ScoreBoard() {
    const { team1Score, team2Score, team1Points, team2Points } = useGame()

    const [hidden, setHidden] = useState(true)

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
        </div>
    )
}
