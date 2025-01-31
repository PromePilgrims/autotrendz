export const mappings = {
  tecfil: {
    product_properties: {
      'Altura': 'CpoAuxProd1',
      'Ø Ext.': 'CpoAuxProd2',
      'Ø Int.': 'CpoAuxProd3',
      'Rosca': 'CpoAuxProd7'
    },
    application_properties: {
      'Veiculo': ['DescricaoAplicacao', 'ComplementoAplicacao3_1'],
      'Motor': ['ComplementoAplicacao3_2', 'ComplementoAplicacao3_5'],
      'Ano': ['ComplementoAplicacao3_3', 'ComplementoAplicacao3_4'],
    }
  },
  taranto: {
    product_properties: {
      'Diâmetro': 'CpoAuxProd7',
      'Diâmetro do Alojamento': 'CpoAuxProd8',
      'Altura': 'CpoAuxProd9',
      'Fibra': 'CpoAuxProd28',
      'Material': 'CpoAuxProd32',
      'Espessura': 'CpoAuxProd30',
    },
    application_properties: {
      'Veiculo': ['DescricaoAplicacao'],
      'Motor': ['ComplementoAplicacao'],
      'Ano': ['ComplementoAplicacao2'],
      'Observação': ['ComplementoAplicacao3'],
    }
  }
}
