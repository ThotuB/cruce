import { useQuery } from "@tanstack/react-query"
import { PlayerPov } from "proto/protocol/game/client_protocol_pb"
import { useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { fromGameProto, GameServerMessage, toGameProto } from "utils/sockets"

interface ProtoSocketHook {
    sendProtoMessage: (message?: GameServerMessage) => void
    lastProtoMessage: PlayerPov | null
    readyState: ReadyState
}

const useProtoSocket = (url: string): ProtoSocketHook => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(url)

    const { data: lastProtoMessage, refetch } = useQuery({
        queryKey: ["cruce"],
        queryFn: async () => {
            console.log("useQuery ran")
            if (!lastMessage) {
                return null
            }

            if (!(lastMessage.data instanceof Blob)) {
                throw new Error(
                    `message was not of type Blob: ${typeof lastMessage.data}`,
                )
            }

            const data = await lastMessage.data.arrayBuffer()
            const message = fromGameProto(new Uint8Array(data))
            if (!message) {
                return null
            }

            return message
        },
        initialData: null,
        enabled: readyState == ReadyState.OPEN,
    })

    useEffect(() => {
        if (!lastMessage) {
            return
        }
        refetch()
    }, [lastMessage])

    const sendProtoMessage = (
        message: GameServerMessage = { case: undefined },
    ) => {
        const byteMessage = toGameProto(message)
        sendMessage(byteMessage)
    }

    return {
        sendProtoMessage,
        lastProtoMessage,
        readyState,
    }
}

export default useProtoSocket
