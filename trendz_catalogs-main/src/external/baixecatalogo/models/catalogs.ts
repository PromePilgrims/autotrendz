export type Plataforma = {
  ENUM_CODIGO_PLATAFORMA: number
  url_catalogo: string
}

export type Catalogo = {
  codigo_catalogo: number
  nome: string
  plataformas: Plataforma[]
}
