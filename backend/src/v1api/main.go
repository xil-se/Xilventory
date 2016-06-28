package v1api

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji/web"
	"net/http"
)

type Now struct {
	Now string `db:"now"`
}

func Hello(context web.C, w http.ResponseWriter, r *http.Request) {

	now := []Now{}

	context.Env["db"].(*sqlx.DB).Select(&now, "SELECT now()")
	fmt.Fprintf(w, "%v", now[0])

	fmt.Fprintf(w, "Hello, %s!", context.URLParams["name"])
	fmt.Fprintf(w, "Hello, %v!", now)

}
