package chat

import "github.com/gorilla/websocket"

type ChatClient struct {
	room *ChatRoom
	conn *websocket.Conn
	send chan []byte
}

func NewClient(room *ChatRoom, conn *websocket.Conn, send chan []byte) *ChatClient {
	return &ChatClient{
		room: room,
		conn: conn,
		send: send,
	}
}

// client -> ReadPump() -> chat room
func (self *ChatClient) ReadPump() {
	defer func() {
		self.room.unregister <- self
		self.conn.Close()
	}()

	for {
		_, message, err := self.conn.ReadMessage()
		if err != nil {
			break
		}
		self.room.broadcast <- message
	}
}

// chat room -> WritePump() -> client
func (self *ChatClient) WritePump() {
	defer func() {
		self.conn.Close()
	}()

	for {
		select {
		case message, ok := <-self.send:
			if !ok {
				// The.room closed the channel.
				self.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			self.conn.WriteMessage(websocket.BinaryMessage, message)
		}
	}
}
