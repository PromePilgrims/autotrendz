import Sitemapper from 'sitemapper'
import fs from 'fs'

(async () => {
  const Google = new Sitemapper({
    url: 'https://www.hipervarejo.com.br/sitemap.xml',
    timeout: 15000, // 15 seconds
  })

  try {
    const { sites } = await Google.fetch()
   fs.writeFileSync('inputs/all_links.txt', sites.filter(site => site.endsWith('/p')).join('\n'))
  } catch (error) {
    //console.log(error)
  }
})()
