import { CardSuit, CardValue } from "proto/protocol/game/misc_pb"
import { cardImagePath, CardPack } from "utils/cards"

const CardImage: React.FC<{
	pack: CardPack
	suit: CardSuit
	value: CardValue
	className?: string
}> = ({ pack, suit, value, className }) => {
	const path = cardImagePath(pack, suit, value)

	return <img className={className} src={path} />
}

export default CardImage
