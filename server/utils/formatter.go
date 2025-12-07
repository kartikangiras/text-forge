package utils

import (
	"encoding/json"
	"fmt"
)

func FormatJson(input string) (string, error) {
	var jsonObj interface{}

	if err := json.Unmarshal([]byte(input), &jsonObj); err != nil {
		return "", fmt.Errorf("invalid JSON: %v", err)
	}
	pretty, err := json.MarshalIndent(jsonObj, "", "  ")
	if err != nil {
		return "", fmt.Errorf("error formatting JSON: %v", err)
	}
	return string(pretty), nil
}
