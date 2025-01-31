package main

import (
	"fmt"

	"github.com/gocolly/colly/v2"
)

func main() {
	c := colly.NewCollector(
		colly.CacheDir("./cache"),
		colly.AllowedDomains("www.mercadocar.com.br"),
		colly.Async(),
	)

	c.Limit(&colly.LimitRule{DomainGlob: "*", Parallelism: 8})

	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		c.Visit(e.Request.AbsoluteURL(link))
	})

	c.OnHTML("html", func(e *colly.HTMLElement) {
		if e.DOM.Find(".product-name").Length() == 0 {
			return
		}

		fmt.Println(e.DOM.Find(".product-name").Text())
		fmt.Println(e.DOM.Find(".product-price").Text())
		fmt.Println(e.DOM.Find(".manufacturer-part-number .value").Text())
	})

	c.Visit("https://www.mercadocar.com.br")
	c.Wait()
}
