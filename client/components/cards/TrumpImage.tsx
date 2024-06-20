import { CardSuit } from "proto/protocol/game/misc_pb"
import { CardPack, trumpImagePath } from "utils/cards"

const TrumpImage: React.FC<{
	pack: CardPack
	suit: CardSuit
	className?: string
}> = ({ pack, suit, className }) => {
	const path = trumpImagePath(pack, suit)

	return <img className={className} src={path} />
}

export default TrumpImage
