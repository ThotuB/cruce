import {
    ChatClientProtocol,
    ChatServerProtocol,
    Header,
    MessageSend,
} from "proto/protocol/chat/protocol_pb"
import { GameClientProtocol } from "proto/protocol/game/client_protocol_pb"
import { GameServerProtocol } from "proto/protocol/game/server_protocol_pb"

export const toChatProto = (message: MessageSend) => {
    const type = message.getType().typeName
    const data = message.toBinary()

    const messageProto = new ChatServerProtocol({
        header: new Header({
            dataLength: data.length,
            command: type,
        }),
        messageSend: message,
    })

    return messageProto.toBinary()
}

export const fromChatProto = (arr: Uint8Array) => {
    const message = ChatClientProtocol.fromBinary(arr)

    return message.message
}

export type GameServerMessage = GameServerProtocol["message"]

export const toGameProto = (message: GameServerMessage) => {
    const messageProto = new GameServerProtocol({
        header: new Header({}),
        message: message,
    })

    return messageProto.toBinary()
}

export const fromGameProto = (arr: Uint8Array) => {
    const message = GameClientProtocol.fromBinary(arr)

    return message.playerPov
}
