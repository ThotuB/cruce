import Button from "components/common/Button";

interface GameOverProps {
    outcome: string;
    onContinue: () => void;
    onExit: () => void;
}

export default function GameOver({ outcome, onContinue, onExit }: GameOverProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-12 px-32 py-16">
            <div className="text-7xl">
                <GameOverMessage outcome={outcome} />
            </div>
            <div className="text-4xl flex gap-5 font-mono">
                <Button 
                    onClick={onContinue}
                >
                    CONTINUE
                </Button>
                <Button 
                    onClick={onExit}
                >
                    EXIT
                </Button>
            </div>
        </div>
    )
}

interface GameOverMessageProps {
    outcome: string;
}

const GameOverMessage = ( { outcome }: GameOverMessageProps ) => {
    if (outcome === "win") {
        return (
            <div className="text-center text-white font-bold">
                You won!
            </div>
        )
    }

    if (outcome === "lose") {
        return (
            <div className="text-center text-white font-bold">
                You lost!
            </div>
        )
    }

    if (outcome === "draw") {
        return (
            <div className="text-center text-white font-bold">
                It's a draw!
            </div>
        )
    }

    return <></>
}