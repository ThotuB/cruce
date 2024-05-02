package models

type User struct {
	UserId   string  `db:"user_id"`
	Name     string  `db:"name"`
	ImageUrl *string `db:"image_url"`
}
