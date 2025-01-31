import { Catalogo } from 'external/baixecatalogo/models/catalogs'

const BASE_URL = 'https://baixecatalogo.com.br'

export async function getCatalogs(): Promise<Catalogo[]> {
  const response = await fetch(`${BASE_URL}/api/v1/catalogos?` + new URLSearchParams({
    limit: '1000',
    idm: 'pt'
  }))
  const json = await response.json() as any
  return json.catalogos as Catalogo[]
}
