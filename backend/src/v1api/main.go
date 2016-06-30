package v1api

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji/web"
	"net/http"
  "encoding/json"
  sqlx_types "github.com/jmoiron/sqlx/types"
)

type Now struct {
	Type string `json:"now"`
}

type Item struct {
  Id int `json:"itemid"`
  Location sqlx_types.JSONText `json:"location"`
  Price int `json:"price"`
  Quantity int `json:"quantity"`
  Name string `json:"name"`
}

func DbTime(context web.C, w http.ResponseWriter, r *http.Request) {
	now := []Now{}

	context.Env["db"].(*sqlx.DB).Select(&now, "SELECT now() as now")
	fmt.Fprintf(w, "Database time is: %v", now)
}


func ListItems(context web.C, w http.ResponseWriter, r *http.Request) {
  db := context.Env["db"].(*sqlx.DB)
  items := []Item{}

  err := db.Select(&items, "SELECT id as id, get_location(location_id) as location, price as price, quantity as quantity, name as name FROM items")
  if err != nil {
    fmt.Fprintf(w, "{\"error\": \"Something went poop\"")
  }
  json, _ := json.MarshalIndent(items, "", "\t")
  fmt.Fprintf(w, "%s", json)
}

