import fs from 'fs'
import SiteMapper from 'sitemapper'

(async () => {
  const Google = new SiteMapper({
    url: `https://www.monumentoshoppingcar.com.br/sitemap.xml`,
    timeout: 15000,
  })

  try {
    const { sites } = await Google.fetch()
    fs.writeFileSync('inputs/all_links.txt', sites.filter(site => site.startsWith('https://www.monumentoshoppingcar.com.br/produtos/')).join('\n'), null, 2)
  } catch (error) {
    console.log(error)
  }
})()