import { MinusIcon, XIcon } from "@heroicons/react/solid"
import { useGame } from "contexts/GameContext"
import React from "react"

const Buttons: React.FC = () => {
    const { cheatButton } = useGame()

    const onExit = () => {}
    const handleCheating = () => {}

    return (
        <div className="relative p-4">
            <div className="float-right w-min rounded-2xl bg-dark-1 p-4">
                <div className="flex flex-row-reverse gap-4">
                    <button
                        className="rounded-full border-2 border-purple-300 p-4 hover:bg-purple-300 hover:text-dark-1"
                        onClick={onExit}
                        type="button"
                        title="Leave Game"
                    >
                        <XIcon className="h-8 w-8" />
                    </button>
                    {cheatButton && (
                        <button
                            className="rounded-full border-2 border-purple-300 p-4 hover:bg-purple-300 hover:text-dark-1"
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

export default Buttons
