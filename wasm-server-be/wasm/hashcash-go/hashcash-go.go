package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
	"strings"
	"time"
	"syscall/js"
)

// Function to calculate the hashcash proof of work for a specific nonce range
func calculateHashcashInRange(input string, difficulty int, startNonce, endNonce uint32) (string, uint32, bool, time.Duration) {
	target := strings.Repeat("0", difficulty)
	var hash string
	found := false
	startTime := time.Now()

	for nonce := startNonce; nonce <= endNonce; nonce++ {
		data := fmt.Sprintf("%s:%d", input, nonce)
		hashBytes := sha256.Sum256([]byte(data))
		hash = hex.EncodeToString(hashBytes[:])

		if strings.HasPrefix(hash, target) {
			found = true
			return hash, nonce, found, time.Since(startTime)
		}
	}

	return "", 0, found, time.Since(startTime)
}

func wasmMain(this js.Value, args []js.Value) interface{} {
	input := "Hello World!\n"
	difficulty := 7
	var startNonce uint32 = 0
	var endNonce uint32 = 1000000

	if len(args) == 2 {
		start, err1 := strconv.ParseUint(args[0].String(), 10, 32)
		end, err2 := strconv.ParseUint(args[1].String(), 10, 32)
		if err1 != nil || err2 != nil {
			fmt.Println("Invalid arguments")
			result := map[string]interface{}{
				"hash":     "",
				"nonce":    0,
				"found":    false,
			}
			return js.ValueOf(result)
		}
		startNonce = uint32(start)
		endNonce = uint32(end)
	}

	hash, nonce, found, duration := calculateHashcashInRange(input, difficulty, startNonce, endNonce)

	if found {
		fmt.Printf("Input: %s\n", input)
		fmt.Printf("Difficulty: %d\n", difficulty)
		fmt.Printf("Hash: %s\n", hash)
		fmt.Printf("Nonce: %d\n", nonce) 
	} else {
		fmt.Println("No valid hash found in the specified range.")
	}
	fmt.Printf("Time taken: %s\n", duration)
	
	result := map[string]interface{}{
		"hash":     hash,
		"nonce":    nonce,
		"found":    found,
        }
        return js.ValueOf(result)
}

func main() {
    fmt.Println("Hello Webassembly")
    c := make(chan bool)
    js.Global().Set("wasmMain", js.FuncOf(wasmMain))
    <-c
}
