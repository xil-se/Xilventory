package v1api

import (
	"encoding/json"
	"fmt"
	"github.com/jmoiron/sqlx"
	sqlx_types "github.com/jmoiron/sqlx/types"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji/web"
	"net/http"
)

type Now struct {
	Type string `json:"now"`
}

type Item struct {
	Id       int                 `json:"itemid"`
	Location sqlx_types.JSONText `json:"location"`
	Price    int                 `json:"price"`
	Quantity int                 `json:"quantity"`
	Name     string              `json:"name"`
}

func DbTime(context web.C, w http.ResponseWriter, r *http.Request) {
	now := []Now{}

	context.Env["db"].(*sqlx.DB).Select(&now, "SELECT now() as now")
	fmt.Fprintf(w, "Database time is: %v", now)
}

func ListItems(context web.C, w http.ResponseWriter, r *http.Request) {
	handle := context.URLParams["id"]
	var err error

	db := context.Env["db"].(*sqlx.DB)
	items := []Item{}

	if handle != "" {
		err = db.Select(&items, "SELECT id as id, get_location(location_id) as location, price as price, quantity as quantity, name as name FROM items WHERE id=$1", handle)
	} else {
		err = db.Select(&items, "SELECT id as id, get_location(location_id) as location, price as price, quantity as quantity, name as name FROM items")
	}

	if err != nil {
		http.Error(w, "{\"error\" : \"Something went wrong\"}", 500)
	}

	if len(items) == 0 {
		http.Error(w, http.StatusText(404), 404)
	}

	//if err != nil {
	//  fmt.Fprintf(w, "{\"error\": \"Something went poop\"")
	//}

	json, _ := json.MarshalIndent(items, "", "\t")
	fmt.Fprintf(w, "%s", json)
}
