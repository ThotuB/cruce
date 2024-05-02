package models

import (
	"cruce-server/protobufs/protocol/chat_protocol"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type UserGet struct {
	UserId   string  `db:"user_id"`
	Name     string  `db:"name"`
	ImageUrl *string `db:"image_url"`
}

type MessageInsert struct {
	UserId  string `db:"user_id"`
	Message string `db:"message"`
}

type MessageGet struct {
	User    UserGet   `db:"user"`
	Message string    `db:"message"`
	Time    time.Time `db:"time"`
}

func (self *MessageGet) ToProto() *chat_protocol.MessageReceive {
	return &chat_protocol.MessageReceive{
		UserId:       self.User.UserId,
		UserName:     self.User.Name,
		UserImageUrl: *self.User.ImageUrl,
		Message:      self.Message,
		Time:         timestamppb.New(self.Time),
	}
}
