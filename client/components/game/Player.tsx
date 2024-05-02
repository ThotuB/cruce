import Wait from "components/common/Wait";
import { useGame } from "contexts/GameContext";
import { useWindowDimensions } from "hooks/hooks";

const Player: React.FC<{
    index: number;
}> = ({ index }) => {
    const { auction } = useGame()

    const isJoined = true
    const photo = null
    const name = null

    const { height } = useWindowDimensions()

    const radius = height / 2 - 90
    const angle = -(index + 1) * Math.PI / 2
    const x = radius * Math.cos(angle)
    const y = -radius * Math.sin(angle)

    const style = {
        transform: `translate(${x}px, ${y}px)`
    }

    return (
        <div className="absolute h-full w-full flex items-center justify-center">
            <div className="relative">
                {isJoined ?
                    <div className="group relative w-36 h-36 rounded-full overflow-hidden"
                        style={style}
                    >
                        {auction &&
                            <div className={`absolute transition-opacity bg-dark-1 border-4 border-purple-300 w-full h-full rounded-full flex items-center justify-center text-7xl font-mono font-bold`}>
                                {auction.bids[index].hasBid &&
                                    <>auction.bids[index].value</>
                                }
                            </div>
                        }
                        <img className="w-full h-full"
                            src={photo ?? ''}
                            alt={name ?? 'Anon'}
                        />
                    </div> :
                    <div className="w-36 h-36 bg-dark-1 rounded-full flex items-center justify-center"
                        style={style}
                    >
                        <Wait />
                    </div>
                }
            </div>
        </div>
    )
}

export default Player
