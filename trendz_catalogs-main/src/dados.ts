function isNumeric(value) {
  return /^-?\d+$/.test(value)
}

function codigo(valor, opt?: any) {
  var novo = ''
  var simbolos = ["!", "@", "#", "^", "$", "%", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "{", "}", "ª", "°", "?", "|", ":", ";", ".", ",", "/", " ", "\\", "'"]
  var val = valor.split("")

  for (i = 0; i < val.length; i++) {
    for (var c = 0; c < simbolos.length; c++) {
      if (val[i] == simbolos[c]) { val[i] = '' }
    }
  }

  //verifica se deve ignorar os zeros a esquerda
  if (opt != "ignorar") {
    if (val[0] == 0) { var i = 0; while (val[i] == 0) { val[i] = ''; i++ } }
  }

  if (opt == "separado") {
    //mantem os espaços
    for (c = 0; c < val.length; c++) {
      if (val[c] == "") {
        novo = novo + " "
      } else {
        novo = novo + val[c]
      }
    }
  } else {
    for (c = 0; c < val.length; c++) {
      novo = novo + val[c]
    }
  }
  return novo.toUpperCase()
}

function numero(valor) {
  var novo = ''
  novo = valor.trim()
  if (novo.indexOf(",") != -1) {
    novo = novo.replace(/[,]/g, '.')
  }

  if (isNumeric(novo) == true) {
    return novo
  } else {
    return 0
  }
}

function texto(valor) {
  var novo = ''
  if (valor.indexOf("'") != -1) {
    novo = valor.replace(/[']/g, "")
  } else {
    novo = valor
  }
  return novo
}

function removeacento(valor) {
  var A = ["Á", "À", "Â", "Ä", "Ã", "ª"]
  var E = ["É", "È", "Ê", "Ë"]
  var I = ["Í", "Ì", "Î", "Ï"]
  var O = ["Ó", "Ò", "Ô", "Ö", "Õ", "º"]
  var U = ["Ú", "Ù", "Û", "Ü"]
  var cc = ["Ç"]

  for (var c = 0; c < valor.length; c++) {
    if (A.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "A")
    } else if (E.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "E")
    } else if (I.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "I")
    } else if (O.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "O")
    } else if (U.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "U")
    } else if (cc.indexOf(valor.charAt(c).toUpperCase()) != -1) {
      valor = valor.replace(valor.charAt(c), "C")
    } else {
      //sem acento
    }
  }
  return valor
}

function removeespacoduplo(valor) {
  if (valor.charAt(valor.length - 1) == " ") {
    valor = valor.replace(/ +/g, " ")
  }
  return valor
}

function dados(str) {
  if (str && str.trim().indexOf("'") != 0)
    return ("'").concat(str).concat("'")
  else
    return str
}

function conjuntopalavra(valor) {
  var letras = {
    A: "[AÁÀÂÄÃªáàâäã]",
    E: "[EÉÈÊËéèêë]",
    I: "[IÍÌÎÏíìîï]",
    O: "[OÓÒÔÖÕºóòôöõ]",
    U: "[UÚÙÛÜúùûü]",
    C: "[CÇç]"
  }

  valor = valor.toUpperCase()

  valor = valor.replace(/'/g, '\'\'')

  //remove as barras da palavra
  //### Esta regra foi retirada para ficar igual ao catalogo instalado
  // if(valor.indexOf('/') != -1){
  // 	valor = valor.replace(/[/]/g,' ');
  // }
  //remove acento
  valor = removeacento(valor)

  //remove caracteres especiais mantendo espacamento
  //### Esta regra foi retirada para ficar igual ao catalogo instalado
  // valor = codigo(valor, "separado");

  //remove espaco duplo
  valor = removeespacoduplo(valor)

  //quebra string em array
  if (valor.indexOf(" ") != -1) {
    valor = valor.split(" ")
    //garante casa do array sem estar em branco
    if (valor.indexOf("") != -1) {
      valor.splice(valor.indexOf(""))
    }
    //quebra palavras em array
    //substitui vogais para conjunto com acento
    for (var p = 0; p < valor.length; p++) {
      for (var c = 0; c < valor[p].length; c++) {
        var v = valor[p].charAt(c).toUpperCase()
        if (letras[v] != undefined) {
          valor[p] = valor[p].substr(0, c) + letras[v] + valor[p].substr(c + 1, valor[p].length)
          c += letras[v].split(",").length
        }
      }//for
    }//for
  } else {
    //nao possui quebra do array
    //substitui vogais para conjunto com acento
    for (c = 0; c < valor.length; c++) {
      var v = valor.charAt(c).toUpperCase()
      if (letras[v] != undefined) {
        valor = valor.substr(0, c) + letras[v] + valor.substr(c + 1, valor.length)
        c += letras[v].split(",").length
      }
    }//for
  }
  return valor
}

function aplicacao(str, shouldSplit) {
  str = str.toUpperCase().trim()
  if (str.length <= 2) return str

  var iNotL = str.search(/[^A-z]/)

  if (!~iNotL) return str

  var fp = str.substr(0, iNotL)
  fp = fp && fp + ' '

  var sp = str.substr(iNotL)
  sp = sp.replace(/^[^A-z0-9]+/, '')

  if (!~fp.indexOf(' '))
    sp = sp.replace(/[^A-z0-9]/, ' ')

  return shouldSplit ? (fp + sp).split(' ') : (fp + sp)
}

export function obtemDados(data, where?: any, pagina: number = 1, ordem: string = 'produto', qtd: any = 1) {

  var sql = ""
  var adicional = [] as any
  //adiciona o sql base
  sql = data.base
  //console.log("SQL BASE: " + sql);
  //leitura dos valores que nao estao em branco no objeto where
  var input: any = null
  for (var atributo in where) {
    if (where[atributo].trim() != '') {
      if (data.filtro[atributo] != undefined) {
        //analisa o tipo de dado
        if (data.filtro[atributo].tipo != undefined) {
          if (data.filtro[atributo].tipo == "codigo") {
            input = codigo(where[atributo])
          } else if (data.filtro[atributo].tipo == "codigo2") {
            input = codigo(where[atributo], 'ignorar')
          } else if (data.filtro[atributo].tipo == "numero") {
            input = numero(where[atributo])
          } else if (data.filtro[atributo].tipo == "dados") {
            // var input = where[atributo];
            input = dados(where[atributo])
          } else if (data.filtro[atributo].tipo == "conjuntopalavra") {
            input = conjuntopalavra(where[atributo])
          } else if (data.filtro[atributo].tipo.indexOf("aplicacao") >= 0) {
             input = aplicacao(where[atributo], data.filtro[atributo].tipo.indexOf("#1") == -1)
          }
        } else {
           input = texto(where[atributo])
        }
        if (sql.indexOf("{" + atributo + "}") != -1) {
          var found = sql.substring(sql.indexOf("{" + atributo + "}"), (sql.indexOf("{" + atributo + "}") + ("{" + atributo + "}").length))
          adicional.push({ sql: data.filtro[atributo].sql, valor: input, found: found })
          //console.log(JSON.stringify({sql: data.filtro[atributo].sql, valor: input, found: found}));
        } else {
          adicional.push({ sql: (data.filtro[atributo].sql), valor: input })
          //console.log(JSON.stringify({sql: (data.filtro[atributo].sql), valor: input}));
        }
      }
    }
  }

  //busca se o where é pré-definido
  if (sql.indexOf('<WHR>') != -1) {
    //WHERE É PRÉ-DEFINIDO
    if (adicional.length == 1) {
      var valor = adicional[0].sql
      valor = valor.replace('?', adicional[0].valor)
      sql = sql.replace('<WHR>', valor)
    } else {
      var valor = adicional[0].sql
      valor = valor.replace('?', adicional[0].valor)
      sql = sql.replace('<WHR>', valor)
    }

  } else {
    //WHERE NÃO É PRÉ-DEFINIDO

    //adiciona os filtros no sql principal
    if (adicional.length > 0) {
      //possui filtros
      //verifica se existe o where na clausula e adiciona
      if (sql.indexOf('WHERE') == -1) {
        sql += " WHERE "
      } else {
        sql += " AND "
      }

      //loop para adicionar os wheres de filtro
      for (c = 0; c < adicional.length; c++) {
        //verifica proxima posicao
        if (adicional[c + 1] != null) {
          //possui proxima casa
          if (adicional[c].found != undefined) {
            //possui found
            var rep = replaceBase(adicional[c].found, adicional[c].valor, adicional[c].sql)
            for (s = 0; s < rep.tmp_subsql.length; s++) {
              sql = sql.replace(rep.tmp_subsql[s].found, rep.tmp_subsql[s].sub)
            }
            sql += rep.tmp_arr_sql[0] + " AND "
          } else {
            //nao possui found
            sql += ((adicional[c].sql).replace(/[?]/g, adicional[c].valor) + " AND ")
          }
        } else {
          //nao possui proxima casa
          if (Array.isArray(adicional[c].valor) == true) {
            //array de palavras
            if (adicional[c].found != undefined) {
              //found
              var rep = replaceBase(adicional[c].found, adicional[c].valor, adicional[c].sql)
              for (var s = 0; s < rep.tmp_subsql.length; s++) {
                sql = sql.replace(rep.tmp_subsql[s].found, rep.tmp_subsql[s].sub)
              }
              for (var a = 0; a < rep.tmp_arr_sql.length; a++) {
                sql += rep.tmp_arr_sql[a] + " AND "
              }
            } else {
              //no found
              for (var v = 0; v < adicional[c].valor.length; v++) {
                if (v + 1 == adicional[c].valor.length) {
                  sql += ((adicional[c].sql).replace(/[?]/g, adicional[c].valor[v]))
                } else {
                  sql += ((adicional[c].sql).replace(/[?]/g, adicional[c].valor[v])) + " AND "
                }
              }
            }
          } else {
            //filtro nao é array
            if (adicional[c].found != undefined) {
              //possui found
              var rep = replaceBase(adicional[c].found, adicional[c].valor, adicional[c].sql)
              for (s = 0; s < rep.tmp_subsql.length; s++) {
                sql = sql.replace(rep.tmp_subsql[s].found, rep.tmp_subsql[s].sub)
              }
              sql += rep.tmp_arr_sql[0]
            } else {
              //nao possui found
              sql += ((adicional[c].sql).replace(/[?]/g, adicional[c].valor))
            }
          }
        }
      }
    } else {
      //nao possui filtros
    }//fim do adicional length
  }

  //executa replace no base principal do sql caso exista tag {}
  function replaceBase(found, valor, query) {
    var tmp_subsql = [] as any
    var tmp_arr_sql = [] as any

    var qtdFounds = sql.match(new RegExp(found, "g") || [])?.length || 0
    var sql_tmp = sql
    for (var q = 0; q < qtdFounds; q++) {
      var tmp_found = sql_tmp.substring(sql_tmp.indexOf(found), sql_tmp.indexOf(found) + found.length + 2)
      var tmp_codigofound = tmp_found.split("#")[1]
      var tmp_param = tmp_found.substring(0, tmp_found.length - 2)
      var tmp_param = tmp_param.replace(/[{}]/g, '')
      var tmp_query = data.filtro[tmp_param].founds['found' + tmp_codigofound]
      sql_tmp = sql_tmp.replace(tmp_found, "xxxx")

      if (Array.isArray(valor) == true) {
        //valores para substituir na query e array
        var tmp_subquery = ""
        for (var v = 0; v < valor.length; v++) {
          if (v == 0) {
            //nao inicia com string do loop do array OR ou AND
            if (tmp_query.indexOf("OR:") != -1) {
              tmp_subquery += (tmp_query.replace("OR:", "")).replace(/[?]/g, valor[v])
            } else if (tmp_query.indexOf("AND:") != -1) {
              tmp_subquery += (tmp_query.replace("AND:", "")).replace(/[?]/g, valor[v])
            } else {
              tmp_subquery += (tmp_query.replace("AND:", "")).replace(/[?]/g, valor[v])
            }
          } else {
            if (tmp_query.indexOf("OR:") != -1) {
              tmp_subquery += " OR " + (tmp_query.replace("OR:", "")).replace(/[?]/g, valor[v])
            } else if (tmp_query.indexOf("AND:") != -1) {
              tmp_subquery += " AND " + (tmp_query.replace("AND:", "")).replace(/[?]/g, valor[v])
            } else {
              tmp_subquery += " AND " + (tmp_query.replace("AND:", "")).replace(/[?]/g, valor[v])
            }
          }

          if (tmp_arr_sql.indexOf(query.replace(/[?]/g, valor[v])) == -1) {
            tmp_arr_sql.push(query.replace(/[?]/g, valor[v]))
          }
        }//for[v]
        tmp_subsql.push({ sub: tmp_subquery, found: tmp_found })
      } else {
        //valores nao array
        if (tmp_query.indexOf("OR:") != -1) {
          tmp_subsql.push({ sub: (tmp_query.replace("OR:", "")).replace(/[?]/g, valor), found: tmp_found })
        } else if (tmp_query.indexOf("AND:") != -1) {
          tmp_subsql.push({ sub: (tmp_query.replace("AND:", "")).replace(/[?]/g, valor), found: tmp_found })
        } else {
          tmp_subsql.push({ sub: tmp_query.replace(/[?]/g, valor), found: tmp_found })
        }
      }
      if (tmp_arr_sql.length == 0) {
        tmp_arr_sql.push(query.replace(/[?]/g, valor))
      }
    }//fim das quantidades de ocorrencia
    return { tmp_subsql: tmp_subsql, tmp_arr_sql: tmp_arr_sql }
  }//replaceBase

  //realiza busca por {param} para substituir por objeto notfound caso nao tenha sido substituido
  while (sql.indexOf("{") != -1 && sql.indexOf("}#") != -1) {
    var tmp_notfound = sql.substring(sql.indexOf("{"), sql.indexOf("}#") + 3)
    var tmp_codigonotfound = tmp_notfound.split("#")[1]
    var tmp_param = tmp_notfound.substring(0, tmp_notfound.length - 2)
    var tmp_param = tmp_param.replace(/[{}]/g, "")
    sql = sql.replace(tmp_notfound, data.filtro[tmp_param].notfounds['notfound' + tmp_codigonotfound])
  }

  //previne parametro AND no fim do sql
  var fim = sql.substring(sql.length - 5, sql.length)
  if (fim.indexOf("AND") != -1) {
    sql = sql.substring(0, sql.lastIndexOf("AND"))
  }

  //adicionar ORDER BY
  if (ordem != undefined) {
    if (ordem.trim() != '') {
      for (var c = 0; c < data.ordem.length; c++) {
        for (var atributo in data.ordem[c]) {
          if (atributo == ordem) {
            sql += " ORDER BY " + data.ordem[c][atributo]
          }
        }
      }
    } else {
      //se estiver em branco
      for (var atributo in data.ordem[0]) {
        sql += " ORDER BY " + data.ordem[0][atributo]
      }
    }
  } else {
    //se for undefined
    for (var atributo in data.ordem[0]) {
      sql += " ORDER BY " + data.ordem[0][atributo]
    }
  }

  sql += " limit '" + qtd + "' offset " + ((pagina - 1) * parseInt(qtd))

  var _i = ''
  sql = sql.replace(/<IDM>/g, (_i != 'P' && _i) || '')
  var sql_count: any = null

  if (sql.indexOf("<COUNT>") != -1) {
    if (pagina == 1) {
      var count_sql = sql.substring(sql.indexOf("<COUNT>") + ("<COUNT>").length, sql.length)
      var table = count_sql.match(/\w+\s/)!.shift()!.replace(/\s/g, '')
      var distinct = table ? ['DISTINCT', ' ', table, '.', 'CODIGO', table].join('') : '*'
      sql_count = "SELECT count(" + distinct + ") AS Count FROM " + count_sql
    } else {
      sql_count = null
    }
    sql = sql.replace("<COUNT>", "")
  } else {
    sql_count = null
  }
  return sql

}//obtemDados
