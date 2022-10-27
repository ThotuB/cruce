import { useGame } from "contexts/GameContext";
import { useState } from "react";
import { gameSocket } from "utils/sockets";

interface AuctionProps {
    bidMax: number;
    playerIndex: number;
    trick: number;
    isVisible: boolean;
}

export default function Auction({ bidMax, playerIndex, trick, isVisible }: AuctionProps) {
    const { id, game: { round: { turn, playerTurn, auction: { bids } }} } = useGame();
    const [isLoading, setIsLoading] = useState(false);

    const handleBid = (bid: number) => {
        setIsLoading(true);
        gameSocket.emit('play-auction', {gameId: id, playerTurn, playerIndex, bid})
        setIsLoading(false);
    }

    return (
        <div className="absolute w-full h-full flex gap-4 items-center justify-center">
            {isVisible && !isLoading && <>
                <AuctionValue bid={0} onBid={handleBid} />
                {[...Array(bidMax)].map((_, index) => (
                    <AuctionValue key={index} bid={index + 1} isDisabled/>
                ))}
                {[...Array(4 - bidMax)].map((_, index) => (
                    <AuctionValue key={index} bid={bidMax + index + 1} onBid={handleBid} />
                ))}
            </>}
        </div>
    )
}

interface AuctionValueProps {
    bid: number;
    isDisabled?: boolean;
    onBid?: (bid: number) => void;
}

function AuctionValue({ bid, isDisabled, onBid }: AuctionValueProps) {
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