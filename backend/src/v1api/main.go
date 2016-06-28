package v1api

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji/web"
	"net/http"
)

type Now struct {
	Time string `db:"now"`
}

func DbTime(context web.C, w http.ResponseWriter, r *http.Request) {

	now := []Now{}

	context.Env["db"].(*sqlx.DB).Select(&now, "SELECT now() as now")
	fmt.Fprintf(w, "Database time is: %s", now[0].Time)
}
