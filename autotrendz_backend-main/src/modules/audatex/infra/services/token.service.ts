import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import puppeteer from 'puppeteer'

export type Token = {
  accessToken: string
}

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name)

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async resolveToken(): Promise<Token> {
    const token = await this.cacheManager.get<string>('audatex_token')
    if (token) {
      this.logger.log('Audatex token found in cache')
      return { accessToken: token }
    }

    this.logger.log('Resolving new Audatex token')

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    })
    const page = await browser.newPage()

    page.on('dialog', async (dialog) => await dialog.accept())

    await page.goto(
      'https://audatexweb.audatex.com.br/Audatex_ConsultaPecas_Home.aspx',
    )

    await page.type('.tbxLogin', this.configService.get('AUDATEX_USER'))
    await page.type('.txtLogSenha', this.configService.get('AUDATEX_PASSWORD'))
    await page.click('#RememberMe')
    await page.click('#dologin')

    await page.waitForNavigation()

    if (page.url().includes('Audatex_Logado')) {
      await page.click(
        '.divConteudoCentral input[name="ctl00$cphBody$Button2"]',
      )
    }

    await page.waitForFunction(() => !!window.localStorage.accessToken)

    const localStorage = await page.evaluate(() =>
      Object.assign({}, window.localStorage),
    )
    await browser.close()

    await this.cacheManager.set(
      'audatex_token',
      localStorage.accessToken,
      60 * 24 * 20 * 60, // 20 days
    )

    this.logger.log('Audatex token saved in cache')

    return { accessToken: localStorage.accessToken }
  }
}
