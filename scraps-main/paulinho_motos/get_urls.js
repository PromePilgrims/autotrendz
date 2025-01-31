import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.paulinhomotos.com.br/sitemap.xml',
    timeout: 15000, // 15 seconds
  })

  try {
    const { sites } = await Google.fetch()
   fs.writeFileSync('inputs/all_links.txt', sites.filter(site => site.startsWith('https://www.paulinhomotos.com.br/produto/')).join('\n'))
  } catch (error) {
    //console.log(error)
  }
})()
