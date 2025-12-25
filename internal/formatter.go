package internal

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

func marshalInterface(data any) ([]byte, error) {
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil {
		fmt.Printf("error reading input", err)
		return
	}
	trimmedInput := strings.TrimSpace(input)
	fmt.Printf("formatted json string")
	bytes, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return nil, fmt.Errorf("failed to indent the json: %w", err)
	}
	return bytes, nil

}
