# TextIO

A lightweight text processing toolkit featuring case conversion, formatting, and security utilities.

**Live Demo:** https://textio-app.vercel.app

## Features

- **Text Cleanup:** Remove extra spaces, line breaks, and whitespace.
- **Case Converter:** Toggle between camelCase, snake_case, PascalCase, and more.
- **Code Formatter:** JSON beautifier, Key-Value to JSON, and CSS minifier.
- **Encoding:** Base64, URL encoding/decoding, and SHA-256 hashing.
- **Generators:** UUID v4 and secure password generation.
- **Statistics:** Real-time character, word, and line counts.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite (Hosted on Vercel)
- **Backend:** Go (Golang) (Hosted on Render)

## Local Development

### Prerequisites
- Node.js 18+
- Go 1.21+

### Frontend
```bash
cd ui
npm install
npm run dev

### Backend

# Set PORT environment variable (optional, defaults to 8080)
go run ./cmd/server/main.go