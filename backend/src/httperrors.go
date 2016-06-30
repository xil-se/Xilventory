package main

import (
	"net/http"
)

func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "{\"error\" : \"Item not found\"}", 404)
}

func InternalError(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "{\"error\" : \"Uh, Something went wrong :(\"}", 500)
}
