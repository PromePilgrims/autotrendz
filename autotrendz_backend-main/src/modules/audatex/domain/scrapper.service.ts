export type Item = {
  pn: string
  marca: string
}

export type Output = {
  Marca: string
  PN: number
  'Descricao Audatex'?: string
  Preço?: number
}

export interface IScrapperService {
  exec(items: Item[]): Promise<Output[]>
}
