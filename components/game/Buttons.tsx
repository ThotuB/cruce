import { MinusIcon, XIcon } from "@heroicons/react/solid";
import { gameSocket } from "utils/sockets";

interface ButtonsProps {
    playerIndex: number;
    isCheatMode: boolean;
    joined : number;
    id: string;
    onExit: () => void;
}

export default function Buttons({ isCheatMode, joined, playerIndex, id, onExit }: ButtonsProps) {

    const handleCheating = () => {
        gameSocket.emit('accuse-cheating', {gameId: id, playerIndex})
    }
    
    return (
        <div className="relative p-4">
            <div className="rounded-2xl bg-dark-1 p-4 w-min float-right">
                <div className="flex flex-row-reverse gap-4">
                    <button className="border-2 rounded-full p-4 border-purple-300 hover:bg-purple-300 hover:text-dark-1"
                        onClick={onExit}
                        type="button"
                        title="Leave Game"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>
                    {isCheatMode && (
                        <button className="border-2 rounded-full p-4 border-purple-300 hover:bg-purple-300 hover:text-dark-1"
                            onClick={handleCheating}
                            type="button"
                            title="Minus"
                        >
                            <MinusIcon className="h-8" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}