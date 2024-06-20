package games

import p "cruce-server/protobufs/protocol/game_protocol"

type Player struct {
	Id     string
	Name   string
	Avatar string
}

func NewPlayer(id string, name string, avatar string) *Player {
	return &Player{
		Id:     id,
		Name:   name,
		Avatar: avatar,
	}
}

func (self Player) ToProto() *p.Player {
	return &p.Player{
		Id:     self.Id,
		Name:   self.Name,
		Avatar: self.Avatar,
	}
}
