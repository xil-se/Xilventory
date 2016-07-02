package main

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/zenazn/goji"
	"github.com/zenazn/goji/web"
	_ "github.com/BurntSushi/toml"
	"log"
	"net/http"
	"strings"
	"v1api"
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

func enforceContentType(c *web.C, h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		contentType := r.Header.Get("Accept")
		w.Header().Set("Content-Type", "application/vnd.api+json")

		if !strings.HasPrefix(contentType, "application/vnd.api+json") {
			w.WriteHeader(http.StatusUnsupportedMediaType)
			w.Write([]byte("{error: \"Unsupported mediatype\"}"))
			return
		}

		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func DBContext(c *web.C, h http.Handler) http.Handler {
	db := initializeDatabase("user=xilventory dbname=schematest password=123456")
	fmt.Printf("running")

	fn := func(w http.ResponseWriter, r *http.Request) {
		c.Env["db"] = db
		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}



func main() {

	apimux := web.New()
	goji.NotFound(NotFound) // Why you no work?

	goji.Handle("/api/v1/*", apimux)
	apimux.Use(enforceContentType)
	apimux.Use(DBContext)
	apimux.Get("/api/v1/time", v1api.DbTime)

	apimux.Get("/api/v1/items", v1api.ListItems)
	apimux.Get("/api/v1/items/:id", v1api.ListItems)

	apimux.Get("/api/v1/locations", v1api.ListLocations)
	apimux.Post("/api/v1/locations", v1api.AddLocation)


	goji.Serve()

}
