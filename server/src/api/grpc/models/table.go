package models

import "cruce-server/protobufs"

type Table struct {
	TableId  int32   `db:"table_id"`
	UserId   string  `db:"user_id"`
	GameMode string  `db:"game_mode"`
	Points   string  `db:"points"`
	TurnTime string  `db:"turn_time"`
	Iber     bool    `db:"iber"`
	Cheating bool    `db:"cheating"`
	Password *string `db:"password"`
}

func (self *Table) ToProto() *protobufs.Table {
	return &protobufs.Table{
		Id: self.TableId,
		Mode: map[string]protobufs.GameMode{
			"1v1":   0,
			"1v1v1": 1,
			"2v2":   2,
		}[self.GameMode],
		Points: map[string]protobufs.Points{
			"6":  0,
			"11": 1,
			"21": 2,
		}[self.Points],
		Time: map[string]protobufs.Time{
			"5s":  0,
			"15s": 1,
			"30s": 2,
		}[self.TurnTime],
		Iber:     self.Iber,
		Cheating: self.Cheating,
		Password: self.Password,
	}
}
