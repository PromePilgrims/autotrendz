import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.krambeck.com.br/sitemap.xml',
    timeout: 15000,
    requestHeaders:{
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    }
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/product_links.txt', sites.join('\n'))
  } catch (error) {
    console.log(error)
  }
})()
