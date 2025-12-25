package server

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

var uiAssets embed.FS

func main() {
	distFS, err := fs.Sub(uiAssets, "ui/dist")
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status": "ok"}`))
	})

	fileServer := http.FileServer(http.FS(distFS))
	mux.Handle("/", fileServer)

	log.Println("Server starting on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
