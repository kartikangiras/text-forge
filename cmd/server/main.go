package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/kartikangiras/text-forge/internal"
)

type StringProcessor func(string) (string, error)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/fmt/css", makeHandler(internal.MinifyCSS))
	mux.HandleFunc("POST /api/fmt/json", makeHandler(internal.MarshalInterface))
	mux.HandleFunc("POST /api/fmt/kvjson", makeHandler(internal.KvJson))
	mux.HandleFunc("POST /api/fmt/b64dec", makeHandler(internal.Decodebase64))
	mux.HandleFunc("POST /api/fmt/b64en", makeHandler(internal.Encodebase64))
	mux.HandleFunc("POST /api/fmt/urldec", makeHandler(internal.Decodeurl))
	mux.HandleFunc("POST /api/fmt/urlen", makeHandler(internal.Encodeurl))
	mux.HandleFunc("POST /api/fmt/sha256", makeHandler(internal.GenerateSHA256))

	mux.HandleFunc("POST /api/fmt/clean", handleTextCleanup)
	mux.HandleFunc("POST /api/fmt/uuid", handleUUID)
	mux.HandleFunc("POST /api/fmt/pass", handlePassword)
	mux.HandleFunc("POST /api/fmt/case", handleCaseConvert)
	mux.HandleFunc("POST /api/fmt/stats", handleTextStats)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)

	if err := http.ListenAndServe(":"+port, enableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}


func handleTextCleanup(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Text   string `json:"text"`
		Action string `json:"action"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid Body", 400)
		return
	}

	result, err := internal.CleanUpText(req.Text, req.Action)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"result": result})
}

func handlePassword(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Length int `json:"length"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid Body", 400)
        return
    }

    pass, err := internal.GeneratePassword(req.Length)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"result": pass})
}

func handleTextStats(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Text string `json:"text"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid Body", 400)
        return
    }

    chars, words, lines, nospaces, err := internal.GetTextStats(req.Text)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    response := map[string]int{
        "characters": chars,
        "words":      words,
        "lines":      lines,
        "nospaces":   nospaces,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func handleCaseConvert(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Text string `json:"text"`
        Type string `json:"type"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid Body", 400)
        return
    }

    result, err := internal.ConvertCase(req.Text, req.Type)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"result": result})
}

func handleUUID(w http.ResponseWriter, r *http.Request) {
    result, err := internal.GenerateUUID()
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"result": (result)})
}

func makeHandler(processor StringProcessor) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var req struct {
            Text string `json:"text"`
        }
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            http.Error(w, "Invalid Body", 400)
            return
        }

        result, err := processor(req.Text)
        if err != nil {
            http.Error(w, err.Error(), 400)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{"result": result})
    }
}