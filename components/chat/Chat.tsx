import io, { Socket } from 'socket.io-client'
import TextField from "components/common/TextField"
import { useUser } from "contexts/UserContext";
import { useState, useEffect, useRef } from "react";
import { getMessages, postMessage } from "services/chat";
import { IMessage } from "types/game";
import Message from "./Message"

let socket: Socket;

export default function Chat() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState("");

    const messageRef = useRef<HTMLInputElement>(null);
    
    const { user } = useUser();

    useEffect(() => {
        getMessages()
            .then(res => {
                const msgs: IMessage[] = res.data;
                setMessages(msgs);
                messageRef.current?.scrollIntoView({ behavior: 'smooth' })
                initializeSocket()
            })
    }, [])

    const initializeSocket = async () => {
        await fetch('api/socket');
        socket ??= io('/chat')

        socket.on('connect', () => {
            // console.log('connected')
        })

        socket.on('message-received', ({messages, message}) => {
            setMessages([...messages, message])
            messageRef.current?.scrollIntoView({ behavior: 'smooth' })
        })
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (message.trim().length === 0) return;

            const msg = {
                uid: user.uid,
                image: user?.photoURL ?? undefined,
                name: user?.displayName ?? 'Anonymous',
                message: message,
                time: new Date().toLocaleString()
            }

            setMessages([...messages, msg])
            setMessage("");
            socket.emit('message-sent', {messages, message: msg});
            postMessage(msg)
                .then(() => {})
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-end overflow-hidden">
            <div className="flex flex-col p-2 gap-2 overflow-y-auto">
                {messages.map(({uid, image, name, message, time}, index) => (
                    <Message 
                        key={index}
                        image={image}
                        name={name}
                        message={message}
                        time={time}
                        uid={uid}
                    />
                ))}
                <div ref={messageRef}/>
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