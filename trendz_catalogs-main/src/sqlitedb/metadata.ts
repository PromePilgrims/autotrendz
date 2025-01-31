type Platform =  {
  data_lancamento: string;
  data_atualizacao: string;
  ENUM_IDIOMAS: string[];
  _id: string;
  ENUM_CODIGO_PLATAFORMA: number;
  url_catalogo: string;
  downloads: string;
  download_ativo: boolean;
  tamanho_arquivo: string;
  senha_acesso: string | null;
}

export type Metadata = {
  _id: string;
  codigo_catalogo: number;
  ENUM_ATIVIDADE_EMPRESA: number[];
  ENUM_LINHA_PRODUTOS: number[];
  cliente_ideia: boolean;
  complemento_linha_produto: string;
  contato_geral: string;
  email: string;
  endereco: string;
  endereco_google_maps: string;
  exibe_catalogo_site_ideia: boolean;
  facebook: string;
  imagens: {
    logo: string;
    icone_app_144x144: string;
  };
  instagram: string;
  linkedin: string;
  nome: string;
  nome_contato: string;
  palavra_chave: string[];
  plataformas: Platform[];
  site: string;
  sobre_empresa: string;
  telefone: string;
  twitter: string;
  youtube: string;
  id_nome: string;
  complemento_linha_produto_resumida: string | null;
  agrupa_catalogos: string | null;
  foundInCatalogos: boolean;
  maxDataLancamento: string;
  minDataLancamento: string;
  ordenaAleatorios: number;
  extract_date: string;
}
