import fs from 'fs'
import SiteMapper from 'sitemapper'

(async () => {
  const url = 'https://www.autopecasmolina.com.br'

  const Google = new SiteMapper({
    url: `${url}/sitemap.xml`,
    timeout: 15000,
    requestHeaders: {
      'User-Agent': 'Googlebot',
    }
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/all_links.txt', sites.join('\n'), null, 2)
  } catch (error) {
    console.log(error)
  }
})()