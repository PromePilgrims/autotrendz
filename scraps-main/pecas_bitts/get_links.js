import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  for (const num of [1, 2]) {
    const Google = new Sitemapper({
      url: `https://www.pecasbitts.com.br/sitemap-1-${num}.xml`,
      timeout: 15000,
      requestHeaders: {
        'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
      }
    })

    try {
      const { sites } = await Google.fetch()
      fs.writeFileSync(`inputs/product_links_${num}.txt`, sites.join('\n'))
    } catch (error) {
      console.log(error)
    }
  }
})()
