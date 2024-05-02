import { PlayerPov } from "proto/protocol/game/protocol_pb"
import { useEffect } from "react"
import { ReadyState } from "react-use-websocket"
import useProtoSocket from "./UseProtoSocket"

const socketUrl = "ws://192.168.1.218:8083/game"

interface UseGameHook {
    state: PlayerPov | null
}

const useGameState = () => {
    const { lastProtoMessage, sendProtoMessage, readyState } = useProtoSocket(socketUrl)

    useEffect(() => {
        if (readyState == ReadyState.OPEN) {
            sendProtoMessage()
        }
    }, [readyState])

    const sendBid = () => {
        sendProtoMessage()
    }

    const sendCard = () => {
        sendProtoMessage()
    }

    return {
        state: lastProtoMessage,
        sendBid,
        sendCard
    }
}

export default useGameState
