import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.machadoautoparts.com.br/public/machadoautoparts/sitemap/sitemap_index.xml.gz',
    timeout: 15000,
    requestHeaders:{
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    }
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/product_links.txt', sites.filter((site) => site.includes('/p/pro')).join('\n'))
  } catch (error) {
    console.log(error)
  }
})()
