import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://loja.josecar.com.br/sitemap.xml',
    timeout: 15000,
    requestHeaders: {
      'User-Agent': 'Googlebot'
    }
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/product_links.txt', sites.filter((link) => link.includes('?_pid=')).join('\n'))
  } catch (error) {
    console.log(error)
  }
})()
