package v1api

import (
	"encoding/json"
	"fmt"
	"github.com/jmoiron/sqlx"
	sqlx_types "github.com/jmoiron/sqlx/types"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji/web"
	"io/ioutil"
	"net/http"
)

type Now struct {
	Type string `json:"now"`
}

type Item struct {
	Id       int                 `json:"item_id"`
	Location sqlx_types.JSONText `json:"location"`
	Price    int                 `json:"price"`
	Quantity int                 `json:"quantity"`
	Name     string              `json:"name"`
}

type Location struct {
	Id       int                 `json:"location_id"`
	Name     string              `json:"name"`
	Location sqlx_types.JSONText `json:"location"`
}

type LocationJsonApi struct {
	ParentId int    `json:"parent_id"`
	Name     string `json:"name"`
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

	json, err := json.MarshalIndent(items, "", "\t")
	fmt.Fprintf(w, "%s", json)
}

func ListLocations(context web.C, w http.ResponseWriter, r *http.Request) {
	db := context.Env["db"].(*sqlx.DB)
	locations := []Location{}

	err := db.Select(&locations, "SELECT id, get_location(parent_id) as location, name FROM locations WHERE parent_id > 0")

	if err != nil {
		http.Error(w, "{\"error\" : \"Something went wrong\"}", 500)
	}

	json, err := json.MarshalIndent(locations, "", "\t")
	fmt.Fprintf(w, "%s", json)

}

func Dummy(context web.C, w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Weeeooo")
}

func AddLocation(context web.C, w http.ResponseWriter, r *http.Request) {
	db := context.Env["db"].(*sqlx.DB)
	_ = db

	// Is this how you do it?
	var req LocationJsonApi

	body, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(body, &req)

	if err != nil {
		http.Error(w, "{\"error\" : \"Something went wrong\"}", 500)
		return
	}

	if req.Name == "" {
		http.Error(w, "{\"error\" : \"Name missing\"}", 400)
		return
	}

	if req.ParentId <= 0 {
		http.Error(w, "{\"error\" : \"Parent id missing or is zero\"}", 400)
		return
	}

	fmt.Fprintf(w, "%s %v", body, req)
}
