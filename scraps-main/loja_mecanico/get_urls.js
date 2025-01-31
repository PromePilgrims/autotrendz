import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://18.229.10.78/sitemap',
    rejectUnauthorized: false,
    requestHeaders: {
      'Referer': 'https://www.lojadomecanico.com.br/',
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    }
  })

  try {
    const { sites } = await Google.fetch()

    fs.writeFileSync('inputs/links_products.txt',
      sites.filter(site => site.startsWith('https://www.lojadomecanico.com.br/produto/'))
        .map(url => url.replace('https://www.lojadomecanico.com.br', ''))
        .join('\n')
      , null, 2)
  } catch (error) {
    console.log(error)
  }
})()
