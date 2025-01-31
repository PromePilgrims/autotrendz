package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("../inputs/all_links.csv")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	readCsv := csv.NewReader(file)

	productLinks := make([]string, 0)

	for {
		record, err := readCsv.Read()
		if err != nil {
			if err == io.EOF {
				fmt.Println("End of file")
				break
			}
			fmt.Println("Error:", err)
			break
		}
		url := record[0]
		if strings.HasSuffix(url, "/p") {
			productLinks = append(productLinks, url)
		}
	}

	newFile, err := os.Create("../inputs/hipervarejo_links.csv")
	defer newFile.Close()

	newCsv := csv.NewWriter(newFile)
	newCsv.UseCRLF = true
	defer newCsv.Flush()
	for _, link := range productLinks {
		newCsv.Write([]string{link})
	}
}
