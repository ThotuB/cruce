package game

import "github.com/gorilla/websocket"

type GameClient struct {
	room     *GameRoom
	userId   string
	roomId   int
	userName string
	avatar   string
	conn     *websocket.Conn
	send     chan []byte
}

func NewGameClient(room *GameRoom, userId string, roomId int, userName string, avatar string, conn *websocket.Conn, send chan []byte) *GameClient {
	return &GameClient{
		room:     room,
		userId:   userId,
		roomId:   roomId,
		userName: userName,
		avatar:   avatar,
		conn:     conn,
		send:     send,
	}
}

// client -> ReadPump() -> chat room
func (self *GameClient) ReadPump() {
	defer func() {
		self.room.unregister <- self
		self.conn.Close()
	}()

	for {
		_, data, err := self.conn.ReadMessage()
		if err != nil {
			break
		}

		message := Message{
			data:   data,
			userId: self.userId,
		}

		self.room.broadcast <- message
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
				// The room closed the channel.
				self.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			self.conn.WriteMessage(websocket.BinaryMessage, message)
		}
	}
}
