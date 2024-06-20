import { useGame, useGameFns } from "contexts/GameContext"

const Auction: React.FC<{}> = () => {
    const { auction } = useGame()
    const { playBid } = useGameFns()

    return (
        <div className="absolute flex h-full w-full items-center justify-center gap-4">
            {auction && auction.visible && (
                <>
                    <AuctionValue bid={0} onBid={playBid} />
                    {[...Array(auction.maxBid)].map((_, index) => (
                        <AuctionValue key={index} bid={index + 1} isDisabled />
                    ))}
                    {[...Array(4 - auction.maxBid)].map((_, index) => (
                        <AuctionValue
                            key={index}
                            bid={auction.maxBid + index + 1}
                            onBid={playBid}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

const AuctionValue: React.FC<{
    bid: number
    isDisabled?: boolean
    onBid?: (bid: number) => void
}> = ({ bid, isDisabled, onBid }) => {
    return (
        <button
            className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-dark-1 font-mono text-5xl transition-colors
            hover:bg-purple-300 hover:text-dark-1 ${isDisabled && "pointer-events-none"}`}
            onClick={() => onBid && onBid(bid)}
            disabled={!onBid}
        >
            {isDisabled || bid}
        </button>
    )
}

export default Auction
