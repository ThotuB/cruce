import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"

export const CARD_PACK = {
    ORIGINAL: "original",
    BETA: "beta",
    MOSAIC: "mosaic"
} as const

const CARD_SUIT = {
    [CardSuit.ROSU]: "R",
    [CardSuit.DUBA]: "D",
    [CardSuit.VERDE]: "V",
    [CardSuit.GHINDA]: "G"
} as const

const CARD_VALUE = {
    [CardValue.ACE]: 11,
    [CardValue.TEN]: 10,
    [CardValue.KING]: 4,
    [CardValue.QUEEN]: 3,
    [CardValue.JACK]: 2,
    [CardValue.NINE]: 9
} as const

const CARD_EXTENSION = {
    [CARD_PACK.ORIGINAL]: "png",
    [CARD_PACK.BETA]: "png",
    [CARD_PACK.MOSAIC]: "svg"
} as const

type ObjectValues<T> = T[keyof T]
export type CardPack = ObjectValues<typeof CARD_PACK>


export const cardImagePath = (pack: CardPack, suit: CardSuit, value: CardValue) => {
    return `/${pack}/${CARD_SUIT[suit]}-${CARD_VALUE[value]}.${CARD_EXTENSION[pack]}`
}

export const trumpImagePath = (pack: CardPack, suit: CardSuit) => {
    return `/${pack}/${CARD_SUIT[suit]}.${CARD_EXTENSION[pack]}`
}
