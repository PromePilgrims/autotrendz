import fs from 'fs'
import Sitemapper from 'sitemapper'

(async () => {
  const url = 'https://www.altese.com.br'

  const Google = new Sitemapper({
    url: `${url}/sitemap.xml`,
    timeout: 15000, // 15 seconds
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/all_links.txt', sites.filter(site => site.endsWith('/p')).join('\n'), null, 2)
  } catch (error) {
    console.log(error)
  }
})()