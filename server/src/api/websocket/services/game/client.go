package game

import "github.com/gorilla/websocket"

type GameClient struct {
	hub    *GameHub
	roomId string
	conn   *websocket.Conn
	send   chan []byte
}

func NewGameClient(hub *GameHub, roomId string, conn *websocket.Conn, send chan []byte) *GameClient {
	return &GameClient{
		hub:    hub,
		roomId: roomId,
		conn:   conn,
		send:   send,
	}
}

// client -> ReadPump() -> chat room
func (self *GameClient) ReadPump() {
	defer func() {
		self.hub.unregister <- self
		self.conn.Close()
	}()

	for {
		_, data, err := self.conn.ReadMessage()
		if err != nil {
			break
		}

		message := Message{
			roomId: self.roomId,
			data:   data,
		}

		self.hub.broadcast <- message
	}
}

// chat room -> WritePump() -> client
func (self *GameClient) WritePump() {
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
