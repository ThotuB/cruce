import Wait from "components/common/Wait"
import { useGame } from "contexts/GameContext"
import { useWindowDimensions } from "hooks/hooks"

const Player: React.FC<{
    index: number
}> = ({ index }) => {
    const { auction, players } = useGame()

    const player = players[index]
    const joined = player.name !== ""

    const { height } = useWindowDimensions()

    const radius = height / 2 - 90
    const angle = (-(index + 1) * Math.PI) / 2
    const x = radius * Math.cos(angle)
    const y = -radius * Math.sin(angle)

    const style = {
        transform: `translate(${x}px, ${y}px)`,
    }

    const bid = auction?.bids[index].value

    return (
        <div className="absolute flex h-full w-full items-center justify-center">
            <div className="relative">
                {joined ? (
                    <div
                        className="group relative h-36 w-36 overflow-hidden rounded-full"
                        style={style}
                    >
                        {bid !== undefined && (
                            <div
                                className={`absolute flex h-full w-full items-center justify-center rounded-full border-4 border-purple-300 bg-dark-1 font-mono text-7xl font-bold transition-opacity`}
                            >
                                <>{bid}</>
                            </div>
                        )}
                        <img
                            className="h-full w-full"
                            src={player.avatar}
                            alt={player.name ?? "Anon"}
                        />
                    </div>
                ) : (
                    <div
                        className="flex h-36 w-36 items-center justify-center rounded-full bg-dark-1"
                        style={style}
                    >
                        <Wait />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Player
