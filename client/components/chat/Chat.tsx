import TextField from "components/common/TextField"
import { useUser } from "contexts/UserContext"
import { MessageReceive, MessageSend } from "proto/protocol/chat/protocol_pb"
import { useEffect, useRef, useState } from "react"
import useWebSocket from "react-use-websocket"
import { fromChatProto, toChatProto } from "utils/sockets"
import { default as MMessage } from "./Message"

const socketUrl = "ws://192.168.1.218:8083/chat"

export default function Chat() {
    const [messageHistory, setMessageHistory] = useState<MessageReceive[]>([])
    const [message, setMessage] = useState("")

    const messageRef = useRef<HTMLInputElement>(null)

    const { user } = useUser()

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

    useEffect(() => {
        if (lastMessage !== null) {
            ;(lastMessage.data as Blob).arrayBuffer().then((data) => {
                const message = fromChatProto(new Uint8Array(data))
                if (!message) {
                    return
                }
                switch (message.case) {
                    case "messageReceive":
                        setMessageHistory([...messageHistory, message.value])
                        break
                    case "messageHistory":
                        setMessageHistory(message.value.messages)
                        break
                }
            })
            // const messageReceive = fromProto()
        }
    }, [lastMessage])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") {
            return
        }
        if (message.trim().length === 0) {
            return
        }

        const msg = new MessageSend({
            userId: user.uid,
            messsage: message,
        })

        setMessage("")
        sendMessage(toChatProto(msg))
    }

    return (
        <div className="flex flex-1 flex-col justify-end overflow-hidden">
            <div className="flex flex-1 flex-col justify-end gap-2 overflow-y-auto p-2">
                {messageHistory.map((message, index) => (
                    <MMessage key={index} message={message} />
                ))}
                <div ref={messageRef} />
            </div>
            <div className="p-2">
                <TextField
                    value={message}
                    onChange={setMessage}
                    type="text"
                    placeholder="Type a message..."
                    onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}
