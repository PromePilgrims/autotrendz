import { IScrapperService, Item, Output } from '@/modules/audatex/domain'
import { TokenService } from '@/modules/audatex/infra/services'

import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

type Montadora = {
  codigo: string
  nome: string
}

type Price = {
  PecaDescricao: string
  PecaPrecoConc: number
}

@Injectable()
export class ScrapperService implements IScrapperService {
  private readonly logger = new Logger(ScrapperService.name)

  constructor(
    private readonly tokenService: TokenService,
    private readonly httpService: HttpService,
  ) {}

  async exec(items: Item[]): Promise<Output[]> {
    this.logger.log(`Scrapping Audatex [${items.length}] items`)

    const token = await this.tokenService.resolveToken()

    this.logger.log('Processing items')

    const montadoras = await this.getMontadoras(token.accessToken)

    const output_items = []
    for (const item of items) {
      const data = await this.getPriceByPN(
        montadoras,
        item.pn,
        this.formatMarca(item.marca),
        token.accessToken,
      )

      output_items.push({
        PN: item.pn,
        Marca: item.marca,
        'Descricao Audatex': data?.descricao,
        Preço: data?.preco,
      })
    }

    this.logger.log('Finished processing items')

    return output_items
  }

  private async getPriceByPN(
    montadoras: Montadora[],
    pn: string,
    montadora_name: string,
    token: string,
  ) {
    if (montadora_name) {
      const montadora = montadoras.find((m) => m.nome == montadora_name)
      if (!montadora) return null

      const price = await this.getPrice(pn, montadora.codigo, token)
      if (!price) return null

      return {
        montadora: montadora.nome,
        descricao: price.PecaDescricao,
        preco: price.PecaPrecoConc,
      }
    }

    for (const montadora of montadoras) {
      const price = await this.getPrice(pn, montadora.codigo, token)

      if (price) {
        return {
          montadora: montadora.nome,
          descricao: price.PecaDescricao,
          preco: price.PecaPrecoConc,
        }
      }
    }

    return null
  }

  private async getPrice(
    pn: string,
    codigo_montadora: string,
    token: string,
  ): Promise<Price> {
    const request = this.httpService.get(
      `https://audatexweb.audatex.com.br/ConsultaPecas/Api/Servicos/VeiculosPecasManual?codigoPeca=${pn}&codigoMontadora=${codigo_montadora}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const { data } = await lastValueFrom(request)

    return data
  }

  private async getMontadoras(token: string): Promise<Montadora[]> {
    const request = this.httpService.get(
      'https://audatexweb.audatex.com.br/ConsultaPecas/Api/Servicos/MontadorasVeiculos',
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + token,
        },
      },
    )

    const { data } = await lastValueFrom(request)

    return data.map((data: any) => ({
      codigo: data.codMont,
      nome: data.Montadora,
    }))
  }

  private formatMarca(marca: string): string {
    const de_para = {
      Volkswagen: 'VW',
      Jeep: 'Fiat',
    }

    if (de_para[marca]) {
      marca = de_para[marca]
    }

    return marca.toUpperCase().trim()
  }
}
