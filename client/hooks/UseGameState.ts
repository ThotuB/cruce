import { PlayerPov } from "proto/protocol/game/client_protocol_pb"
import { PlayBid, PlayCard } from "proto/protocol/game/server_protocol_pb"
import { useEffect } from "react"
import { ReadyState } from "react-use-websocket"
import useProtoSocket from "./UseProtoSocket"

const socketUrl = "ws://192.168.1.218:8083/game"

interface UseGameHook {
    state: PlayerPov | null
}

const useGameState = (uid: string, tid: number) => {
    const { lastProtoMessage, sendProtoMessage, readyState } = useProtoSocket(
        `${socketUrl}?uid=${uid}&tid=${tid}`,
    )

    useEffect(() => {
        if (readyState == ReadyState.OPEN) {
            sendProtoMessage()
        }
    }, [readyState])

    const sendBid = (bid: PlayBid) => {
        sendProtoMessage({
            case: "playBid",
            value: bid,
        })
    }

    const sendCard = (card: PlayCard) => {
        sendProtoMessage({
            case: "playCard",
            value: card,
        })
    }

    return {
        state: lastProtoMessage,
        sendBid,
        sendCard,
    }
}

export default useGameState
