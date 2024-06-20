import { Graphics as PixiGraphics } from "@pixi/graphics"
import { Graphics, Sprite } from "@pixi/react"
import { useGameFns } from "contexts/GameContext"
import { Card as PCard, CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import React, { useCallback } from "react"

const Card: React.FC<{
    index: number
    card: PCard
    isCheating: boolean
    isDisabled: boolean
}> = ({ index, card, isCheating, isDisabled }) => {
    const { playCard } = useGameFns()

    const draw = useCallback((g: PixiGraphics) => {
        g.clear()
        g.beginFill(new Uint8Array([32, 34, 37]))
        g.lineStyle(4, new Uint8Array([22, 25, 28]))
        g.drawRoundedRect(0, 0, 256, 416, 20)
        g.endFill()
    }, [])

    return (
        <Graphics draw={draw}>
            <CardImage
                suit={card.suit}
                value={card.value}
                isDisabled={isDisabled}
            />
        </Graphics>
    )
}

const CardImage: React.FC<{
    suit: CardSuit
    value: CardValue
    isDisabled: boolean
}> = ({ suit, value, isDisabled }) => {
    const path = imageName(suit, value)
    const color = suitColor(suit)

    const draw = useCallback((g: PixiGraphics) => {
        g.clear()
        g.beginFill(new Uint8Array([32, 34, 37]))
        g.lineStyle(4, new Uint8Array([22, 25, 28]))
        g.drawRoundedRect(0, 0, 224, 440, 20)
        g.endFill()
    }, [])

    return (
        <Graphics x={16} y={16} draw={draw}>
            <Sprite image={path} width={224} height={190} />
        </Graphics>
    )
}

const imageSuit = (suit: CardSuit) => {
    switch (suit) {
        case CardSuit.ROSU:
            return "R"
        case CardSuit.DUBA:
            return "D"
        case CardSuit.VERDE:
            return "V"
        case CardSuit.GHINDA:
            return "G"
    }
}

const imageValue = (value: CardValue) => {
    switch (value) {
        case CardValue.ACE:
            return 11
        case CardValue.TEN:
            return 10
        case CardValue.KING:
            return 4
        case CardValue.QUEEN:
            return 3
        case CardValue.JACK:
            return 2
        case CardValue.NINE:
            return 0
    }
}

const imageName = (suit: CardSuit, value: CardValue) => {
    return `/${imageSuit(suit)}${imageValue(value)}.png`
}

const suitColor = (suit: CardSuit) => {
    switch (suit) {
        case CardSuit.ROSU:
            return "border-red-600 divide-red-600"
        case CardSuit.DUBA:
            return "border-yellow-400 divide-yellow-400"
        case CardSuit.VERDE:
            return "border-green-700 divide-green-700"
        case CardSuit.GHINDA:
            return "border-amber-700 divide-amber-700"
    }
}

export default Card
