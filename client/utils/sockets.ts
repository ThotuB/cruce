import { Header, ChatServerProtocol, MessageSend, ChatClientProtocol } from "proto/protocol/chat/protocol_pb";
import { GameClientProtocol, GameServerProtocol } from "proto/protocol/game/protocol_pb";

export const toChatProto = (message: MessageSend) => {
    const type = message.getType().typeName
    const data = message.toBinary()

    const messageProto = new ChatServerProtocol({
        header: new Header({
            dataLength: data.length,
            command: type
        }),
        messageSend: message
    })

    return messageProto.toBinary()
}

export const fromChatProto = (arr: Uint8Array) => {
    const message = ChatClientProtocol.fromBinary(arr)

    return message.message
}

export const toGameProto = () => {
    const messageProto = new GameServerProtocol({
        header: new Header({
        }),
    })

    return messageProto.toBinary()
}

export const fromGameProto = (arr: Uint8Array) => {
    const message = GameClientProtocol.fromBinary(arr)

    return message.playerPov
}
