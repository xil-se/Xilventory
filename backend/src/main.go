package main

import (
	"v1api"
	_ "github.com/lib/pq"
	"github.com/jmoiron/sqlx"
	"github.com/zenazn/goji"
	"github.com/zenazn/goji/web"
	"log"
	"net/http"
	"strings"
	"fmt"
)

var db *sqlx.DB


func initializeDatabase(url string) *sqlx.DB {
        var err error
        db, err = sqlx.Open("postgres", url)
        if err != nil {
                log.Fatalf("Could not create database connection pool: %s", err)
                return nil
        }
        err = db.Ping()
        if err != nil {
                log.Printf("Warning! Could not open database connection: %s", err)
                return nil
        }

        db.SetMaxIdleConns(5)
        db.SetMaxOpenConns(50)

		return db
}

func enforceContentType(c *web.C, h http.Handler) http.Handler{
	fn := func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Content-Type")
		w.Header().Set("Content-Type", "application/vnd.api+json")

		if ! strings.HasPrefix(contentType, "application/vnd.api+json") {
			w.WriteHeader(http.StatusUnsupportedMediaType)
			w.Write([]byte("{error: \"Unsupported mediatype\"}"))
			return
		}


		h.ServeHTTP(w,r)
	}
	return http.HandlerFunc(fn)
}

func DBContext(c *web.C, h http.Handler) http.Handler{
	db := initializeDatabase("user=xilventory dbname=schematest password=123456")
	fmt.Printf("running")

	fn := func(w http.ResponseWriter, r *http.Request) {
		c.Env["db"] = db
		h.ServeHTTP(w,r)
	}
	return http.HandlerFunc(fn)
}

func main() {

	apimux := web.New()
	goji.Handle("/api/v1/*", apimux)
	apimux.Use(enforceContentType)
	apimux.Use(DBContext)
	apimux.Get("/api/v1/", v1api.Hello)
	goji.Serve()

}
