import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.bomprecopecas.com.br/sitemap.xml',
    timeout: 15000,
    requestHeaders:{
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    }
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/product_links.txt', sites.filter((site) => site.startsWith('https://www.bomprecopecas.com.br/produto/')).join('\n'))
  } catch (error) {
    console.log(error)
  }
})()
