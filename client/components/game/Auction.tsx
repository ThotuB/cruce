import { useGame, useGameFns } from "contexts/GameContext";

const Auction: React.FC<{}> = () => {
    const { auction } = useGame();
    const { playBid } = useGameFns()

    return (
        <div className="absolute w-full h-full flex gap-4 items-center justify-center">
            {auction &&
                <>
                    <AuctionValue
                        bid={0}
                        onBid={playBid}
                    />
                    {[...Array(auction.maxBid)].map((_, index) => (
                        <AuctionValue
                            key={index}
                            bid={index + 1}
                            isDisabled />
                    ))}
                    {[...Array(4 - auction.maxBid)].map((_, index) => (
                        <AuctionValue
                            key={index}
                            bid={auction.maxBid + index + 1}
                            onBid={playBid} />
                    ))}
                </>
            }
        </div>
    )
}

const AuctionValue: React.FC<{
    bid: number;
    isDisabled?: boolean;
    onBid?: (bid: number) => void;
}> = ({ bid, isDisabled, onBid }) => {
    return (
        <button className={`w-24 h-24 rounded-full bg-dark-1 flex items-center justify-center text-5xl font-mono cursor-pointer transition-colors
            hover:bg-purple-300 hover:text-dark-1 ${isDisabled && 'pointer-events-none'}`}
            onClick={() => onBid && onBid(bid)}
            disabled={!onBid}
        >
            {isDisabled || bid}
        </button>
    )
}

export default Auction
