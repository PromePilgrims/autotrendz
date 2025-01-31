import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.jocar.com.br/sitemapindex.xml',
    timeout: 15000, // 15 seconds
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/products_v2.json', JSON.stringify(sites.filter(site => site.startsWith('https://www.jocar.com.br/produto/')), null, 2))
  } catch (error) {
    console.log(error)
  }
})()
