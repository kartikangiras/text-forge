all: build

build-ui:
	cd ui && npm install && npm run build

build-go:
	go build -o bin/textforge cmd/server/main.go

build: build-ui build-go
	@echo "Build complete! Run ./bin/textforge"