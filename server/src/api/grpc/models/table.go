package models

import pbs "cruce-server/protobufs"

type Table struct {
	TableId  int32   `db:"table_id"`
	Name     string  `db:"name"`
	UserId   string  `db:"user_id"`
	GameMode string  `db:"game_mode"`
	Points   string  `db:"points"`
	TurnTime string  `db:"turn_time"`
	Iber     bool    `db:"iber"`
	Cheating bool    `db:"cheating"`
	Password *string `db:"password"`
}

func (t *Table) ToProto() *pbs.Table {
	return &pbs.Table{
		Id:   t.TableId,
		Name: t.Name,
		Mode: map[string]pbs.GameMode{
			"1v1":   0,
			"1v1v1": 1,
			"2v2":   2,
		}[t.GameMode],
		Points: map[string]pbs.Points{
			"6":  0,
			"11": 1,
			"21": 2,
		}[t.Points],
		Time: map[string]pbs.Time{
			"5s":  0,
			"15s": 1,
			"30s": 2,
		}[t.TurnTime],
		Iber:     t.Iber,
		Cheating: t.Cheating,
		Password: t.Password,
	}
}
