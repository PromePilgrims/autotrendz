export const nonRevisionFields = [
  {
    type: 'text',
    name: 'contact.name',
    title: 'Nome Completo',
    placeholder: 'Digitar nome completo',
  },
  {
    type: 'text',
    name: 'contact.email',
    title: 'E-mail',
    placeholder: 'Digitar e-mail',
  },
  {
    type: 'text',
    name: 'contact.address.zipCode',
    title: 'CEP',
    placeholder: 'Digitar CEP',
  },
  {
    type: 'text',
    name: 'contact.address.street',
    title: 'Endereço',
    disabled: true,
    placeholder: 'Digitar endereço',
  },
  {
    type: 'text',
    name: 'contact.address.number',
    title: 'Número',
    placeholder: 'Nº da residência',
  },
  {
    type: 'text',
    name: 'contact.address.complement',
    title: 'Complemento',
    placeholder: 'Digitar complemento (se tiver)',
  },
  {
    type: 'text',
    name: 'contact.address.state',
    title: 'Estado',
    disabled: true,
    placeholder: 'Digitar estado',
  },
  {
    type: 'text',
    name: 'contact.address.city',
    title: 'Cidade',
    disabled: true,
    placeholder: 'Digitar cidade',
  },
  {
    type: 'radio',
    name: 'rider.gender',
    title: 'Gênero',
    className: 'grid-cols-2',
    options: [
      {
        label: 'Masculino',
        description: 'Masculino',
        value: 'M',
      },
      {
        label: 'Feminino',
        description: 'Feminino',
        value: 'F',
      },
    ],
  },
  {
    type: 'number',
    name: 'rider.age',
    title: 'Idade',
    description: 'Informe a idade do cliente',
    suffix: 'anos',
    placeholder: 'Ex: 25',
  },
  {
    type: 'select',
    name: 'rider.occupation',
    title: 'Ocupação',
    description: 'Selecione a ocupação do cliente',
    options: [
      {
        value: 'A',
        label: 'Autônomo',
        description: 'Trabalha por conta própria',
      },
      {
        value: 'B',
        label: 'Funcionário Público',
        description: 'Funcionário público',
      },
      {
        value: 'C',
        label: 'Empresário',
        description: 'Comércio/serviço/indústria',
      },
      {
        value: 'D',
        label: 'Diretor',
        description:
          'Diretor, vice-presidente ou presidente de empresa privada',
      },
      {
        value: 'E',
        label: 'Gerente',
        description: 'Gerente ou Supervisor de empresa privada',
      },
      {
        value: 'F',
        label: 'Funcionário',
        description: 'Funcionário de empresa privada',
      },
      {
        value: 'G',
        label: 'Outro',
        description: 'Preencha outra ocupação',
        other: {
          placeholder: 'Preencha outra ocupação',
        },
      },
    ],
  },
  {
    type: 'text',
    title: 'Qual sua renda familiar?',
    description: 'Incluindo todos que moram na sua residência?',
    name: 'rider.income',
    placeholder: 'Ex: R$ 2.500,00',
  },
  {
    type: 'radio',
    name: 'rider.weekDaysUsage',
    title: 'Quantos dias por semana você usa a moto?',
    className: 'grid-cols-2',
    options: [
      {
        label: 'Um ou Dois',
        description: 'No máximos 2 dias',
        value: '1-2',
      },
      {
        label: 'Três ou Quatro',
        description: 'No máximos 4 dias',
        value: '3-4',
      },
      {
        label: 'Cinco ou Seis',
        description: 'No máximos 6 dias',
        value: '5-6',
      },
      {
        label: 'Todos os Dias',
        description: 'Todos os dias',
        value: '7',
      },
    ],
  },
  {
    type: 'checkbox_percentage',
    name: 'rider.usage',
    title: 'Utiliza sua moto para:',
    options: [
      {
        value: 'A',
        label: 'Trabalho',
        description: 'Transporte / entregas de moto, profissionalmente',
        default: {
          enabled: true,
          percentage: 10,
        },
      },
      {
        value: 'B',
        label: 'Lazer',
        description: 'Passeios de moto, sem fins profissionais',
        default: {
          enabled: true,
          percentage: 10,
        },
      },
      {
        label: 'Locomoção Pessoal',
        value: 'C',
        description: 'Deslocamentos pessoais, sem fins profissionais',
        default: {
          enabled: true,
          percentage: 10,
        },
      },
      {
        label: 'Transporte de Passageiros',
        description: 'Profissionalmente (Mototáxi)',
        value: 'D',
        default: {
          enabled: true,
          percentage: 10,
        },
      },
      {
        label: 'Outras Utilizações',
        description: 'Outras utilizações da moto',
        value: 'E',
        default: {
          enabled: true,
          percentage: 10,
        },
      },
    ],
  },
  {
    type: 'select',
    title: 'Modelo',
    name: 'motorcycle.model',
    className: 'h-10',
    options: [
      {
        label: 'FAZER 150',
        value: 'FAZER 150',
      },
      {
        label: 'XTZ 150',
        value: 'XTZ 150',
      },
      {
        label: 'YBR 150 ED',
        value: 'YBR 150 ED',
      },
    ],
  },
  {
    type: 'select',
    title: 'Ano de Fabricação',
    name: 'motorcycle.manufacturingYear',
    options: Array.from({ length: 85 })
      .map((_, i) => ({
        label: `${1940 + i}`,
        value: `${1940 + i}`,
      }))
      .reverse(),
  },
  {
    type: 'number',
    title: 'Qual a quilometragem marcada no hodômetro?',
    placeholder: 'Se não souber coloque 999.999',
    name: 'mileage',
  },
  {
    type: 'number',
    title: 'Quantos km você roda mensalmente, em média?',
    placeholder: 'Se não souber coloque 999.999',
    name: 'monthlyMileage',
  },
  {
    title: 'REV1 - Quais revisões você fez na concessionária?',
    rev: 'REV1',
    name: 'revision.revisionsDoneAtDealership',
    type: 'checkbox',
    className: 'grid-cols-3',
    options: [
      {
        label: 'Primeira',
        value: '1',
      },
      {
        label: 'Segunda',
        value: '2',
      },
      {
        label: 'Terceira',
        value: '3',
      },
      {
        label: 'Quarta',
        value: '4',
      },
      {
        label: 'Nenhuma',
        description: 'Nunca fiz revisão na concessionária',
        value: '0',
      },
      {
        label: 'Todas',
        description: 'Fiz todas as revisões na concessionária',
        value: 'all',
      },
    ],
  },
  {
    title:
      'REV2 - Por que você fez a revisão de acordo com o manual na concessionária?',
    rev: 'REV2',
    name: 'revision.reasonForDealershipRevisionAccordingToManual',
    type: 'checkbox',
    options: [
      {
        value: 'A',
        label: 'Porque minha segurança é importante.',
      },
      {
        value: 'B',
        label: 'Porque quero manter o valor da moto.',
      },
      {
        value: 'C',
        label: 'Porque respeito a recomendação da Yamaha.',
      },
      {
        value: 'D',
        label:
          'Porque acredito que é o mínimo para deixar a moto funcionando bem.',
      },
      {
        value: 'E',
        label:
          'Para reduzir prejuízos com manutenções corretivas (quebras, desgaste etc.).',
      },
      {
        value: 'F',
        label: 'Outro',
        other: {
          placeholder: 'Outro motivo',
        },
      },
    ],
  },
  {
    title:
      'REV3 - Qual foi a concessionária onde você fez serviços pela última vez?',
    rev: 'REV3',
    name: 'revision.lastDealershipVisited',
    type: 'text',
  },
  {
    title: 'REV4 - Por que você deixou de fazer as revisões na concessionária?',
    rev: 'REV4',
    name: 'revision.reasonForStoppingDealershipRevisions',
    type: 'checkbox',
    options: [
      {
        value: 'A',
        label: 'É caro fazer tudo o que pede.',
      },
      {
        value: 'B',
        label: 'Só troco o óleo.',
      },
      {
        value: 'C',
        label: 'Fica longe de casa ou trabalho',
      },
      {
        value: 'D',
        label: 'Não tem concessionária na cidade.',
      },
      {
        value: 'E',
        label: 'Fui mal atendido',
      },
      {
        value: 'F',
        label: 'Tive dificuldades financeiras.',
      },
      {
        value: 'G',
        label: 'Eu não sabia o que dizia o manual.',
      },
      {
        value: 'H',
        label: 'Perdi o prazo da revisão',
      },
      {
        value: 'I',
        label: 'Faço a revisão com periodicidade diferente da recomendada.',
      },
      {
        value: 'J',
        label: 'Porque levo no meu mecânico de confiança',
      },
      {
        value: 'K',
        label: 'Outro',
        other: {
          placeholder: 'Outro motivo',
        },
      },
    ],
  },
  {
    title:
      'REV5 - Se você faz a revisão com uma periodicidade diferente, qual seria? (Em tempo ou em km)',
    rev: 'REV5',
    name: 'revision.alternativeRevisionPeriod',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Em km',
        description: 'A cada X KMs',
      },
      {
        value: 'B',
        label: 'Meses',
        description: 'A cada X meses',
      },
    ],
  },
  {
    title: 'A cada quantos KMs você faz a revisão?',
    name: 'revision.kmRevisionPeriod',
    type: 'number',
  },
  {
    title: 'A cada quantos meses você faz a revisão?',
    name: 'revision.monthRevisionPeriod',
    type: 'number',
  },
  {
    title:
      'REV6 - Se houvesse uma oficina autorizada da fábrica na sua cidade, você optaria por ela?',
    rev: 'REV6',
    name: 'revision.optForFactoryAuthorizedWorkshop',
    type: 'radio',
    className: 'gridc-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title:
      'REV7 - Quais fatores te motivariam a ainda continuar frequentando a oficina da concessionária?',
    rev: 'REV7',
    name: 'revision.motivatingFactorsToContinueDealership',
    type: 'checkbox',
    options: [
      {
        value: 'A',
        label: 'Facilidade em agendar e levar a moto.',
      },
      {
        value: 'B',
        label: 'Preços mais baixos.',
      },
      {
        value: 'C',
        label: 'Serviço feito na minha casa/trabalho.',
      },
      {
        value: 'D',
        label:
          'Um plano envolvendo todas as revisões quando compro a moto nova.',
      },
      {
        value: 'E',
        label: 'Maior valorização na troca da moto na concessionária.',
      },
      {
        value: 'F',
        label: 'Outro',
        other: {
          placeholder: 'Outro motivo',
        },
      },
    ],
  },
  {
    title:
      'REV8 - Você fez algum tipo de revisão depois que deixou a concessionária?',
    rev: 'REV8',
    name: 'revision.revisionAfterLeavingDealership',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title: 'REV9 - Como você mantém sua moto em condições de rodagem?',
    rev: 'REV9',
    name: 'revision.howYouMaintainYourMotorcycle',
    type: 'radio',
    options: [
      {
        value: 'A',
        label: 'Só troco o óleo.',
      },
      {
        value: 'B',
        label: 'Só levo no mecânico quando tem problema.',
      },
      {
        value: 'C',
        label:
          'Faço manutenções básicas recomendadas por meu mecânico de confiança.',
      },
      {
        value: 'D',
        label: 'Outro',
        other: {
          placeholder: 'Outra forma',
        },
      },
    ],
  },
  {
    title:
      'REV10 - Onde você levou para fazer a revisão depois que deixou a concessionária?',
    rev: 'REV10',
    name: 'revision.whereDidYouGoForRevisionAfterDealership',
    type: 'radio',
    options: [
      {
        value: 'A',
        label: 'Oficina mecânica / Centro automotivo',
      },
      {
        value: 'B',
        label: 'Loja de peças de motos',
      },
      {
        value: 'C',
        label: 'Eu mesmo fiz',
      },
      {
        value: 'D',
        label: 'Posto de combustíveis',
      },
      {
        value: 'E',
        label:
          'Oficina especializada na troca de óleo de motor (super troca de óleo)',
      },
      {
        value: 'F',
        label: 'Auto Elétrica',
      },
      {
        value: 'G',
        label: 'Outro',
        other: {
          placeholder: 'Outro lugar',
        },
      },
    ],
  },
  {
    title: 'REV11 - Por que você escolheu esse lugar para fazer a revisão?',
    rev: 'REV11',
    name: 'revision.reasonForChoosingRevisionPlace',
    type: 'radio',
    options: [
      {
        value: 'A',
        label: 'Confiança no mecânico',
      },
      {
        value: 'B',
        label: 'Preços mais baixos',
      },
      {
        value: 'C',
        label: 'É perto de casa/trabalho',
      },
      {
        value: 'D',
        label: 'Já estou acostumado a levar lá',
      },
      {
        value: 'E',
        label: 'O serviço é bem feito',
      },
      {
        value: 'F',
        label: 'Tem várias opções de marcas de peças',
      },
      {
        value: 'G',
        label: 'Outro',
        other: {
          placeholder: 'Outro motivo',
        },
      },
    ],
  },
  {
    title:
      'REV12 - Quais peças você trocou e quais serviços foram feitos na última revisão?',
    rev: 'REV12',
    name: 'revision.partsReplacedAndServicesDoneInLastRevision',
    type: 'checkbox',
    options: [
      {
        value: 'A',
        label: 'Troca de óleo',
      },
      {
        value: 'B',
        label: 'Troca de filtros',
      },
      {
        value: 'C',
        label: 'Troca de velas',
      },
      {
        value: 'D',
        label: 'Lubrificação de partes móveis',
      },
      {
        value: 'E',
        label: 'Verificação de itens de desgaste',
      },
      {
        value: 'F',
        label: 'Esticar corrente',
      },
      {
        value: 'G',
        label: 'Regular farol',
      },
      {
        value: 'H',
        label: 'Ajuste da injeção/embreagem/freio',
      },
      {
        value: 'I',
        label: 'Ajuste de válvulas',
      },
      {
        value: 'J',
        label: 'Outro',
        other: {
          placeholder: 'Outro motivo',
        },
      },
    ],
  },
  {
    title: 'REV13 - Você conhece a Revisão Preço Fixo Yamaha?',
    rev: 'REV13',
    name: 'revision.awareOfYamahaFixedPriceRevision',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title:
      'REV14 - Na hora da entrega da moto, explicaram que a Yamaha oferece revisões com preço fechado e com mão-de-obra gratuita?',
    rev: 'REV14',
    name: 'revision.explanationAboutFixedPrice',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title:
      'REV15 - Na sua opinião, quais benefícios você tem com a Revisão Preço Fixo?',
    rev: 'REV15',
    name: 'revision.benefitsOfFixedPrice',
    type: 'checkbox',
    options: [
      {
        value: 'A',
        label: 'Saber quanto gastarei em manutenção.',
        description: 'Saber quanto gastarei em manutenção.',
      },
      {
        value: 'B',
        label: 'Posso me preparar para a despesa.',
        description: 'Posso me preparar para a despesa.',
      },
      {
        value: 'C',
        label: 'É mais econômico.',
        description: 'É mais econômico.',
      },
      {
        value: 'D',
        label: 'É mais prático.',
        description: 'É mais prático.',
      },
      {
        value: 'E',
        label:
          'Tenho certeza de que os serviços serão feitos de acordo com o necessário.',
        description:
          'Tenho certeza de que os serviços serão feitos de acordo com o necessário.',
      },
      {
        value: 'F',
        label: 'Posso parcelar os valores.',
        description: 'Posso parcelar os valores.',
      },
      {
        value: 'G',
        label: 'Ganho descontos em outros produtos.',
        description: 'Ganho descontos em outros produtos.',
      },
      {
        value: 'H',
        label: 'Outro',
        description: 'Outro',
        other: {
          placeholder: 'Descreva o benefício',
        },
      },
    ],
  },
  {
    title:
      'REV16 - Você tem alguma sugestão de melhoria na Revisão Preço Fixo?',
    rev: 'REV16',
    name: 'revision.fixedPriceRevisionSuggestions',
    type: 'textarea',
  },
  {
    title:
      'REV17 - Você sabia que a Yamaha paga a mão-de-obra na primeira e na segunda revisões?',
    name: 'revision.yamahaCoversLaborForFirstTwo',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title:
      'REV18 - Qual o valor em Reais que você imagina que a Yamaha paga em cada uma da primeira e segunda revisões?',
    rev: 'REV18',
    name: 'revision.costYamahaPaysForEachRevision',
    type: 'revisions_prices',
  },
  {
    title:
      'REV19 - Você prefereria que a Yamaha lhe concedesse um crédito nesse valor para utilizar na 3º ou 4º revisões?',
    rev: 'REV19',
    name: 'revision.preferCreditForLaterRevisions',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title:
      'REV20 - Você se interessaria se houvesse uma revisão com itens de motor, com um valor reduzido e garantia apenas do motor?',
    rev: 'REV20',
    name: 'revision.interestedInEngineOnlyRevision',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title:
      'REV21 - Em relação ao preço praticado na revisão atualmente, quanto você acha que custaria a menos essa revisão reduzida?',
    rev: 'REV21',
    name: 'revision.estimatedCostReductionPercent',
    type: 'percentage',
    className: 'full-width',
  },
  {
    title:
      'REV22 - Você optaria desde o início por essa modalidade de garantia?',
    rev: 'REV22',
    name: 'revision.optForWarrantyFromStart',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Sim',
      },
      {
        value: 'B',
        label: 'Não',
      },
    ],
  },
  {
    title: 'REV23 - Por que optaria desde o início?',
    rev: 'REV23',
    name: 'revision.reasonToOptFromStart',
    type: 'radio',
    options: [
      {
        value: 'A',
        label: 'Porque será mais barato.',
        description: 'Porque será mais barato.',
      },
      {
        value: 'B',
        label: 'Porque me preocupo mais com o motor.',
        description: 'Porque me preocupo mais com o motor.',
      },
      {
        value: 'C',
        label: 'Porque os outros itens não dão problema.',
        description: 'Porque os outros itens não dão problema.',
      },
      {
        value: 'D',
        label: 'Porque a manutenção principal que faço é no motor.',
        description: 'Porque a manutenção principal que faço é no motor.',
      },
      {
        value: 'E',
        label: 'Porque só troco o óleo do motor.',
        description: 'Porque só troco o óleo do motor.',
      },
      {
        value: 'F',
        label: 'Porque os demais itens faço em outros lugares.',
        description: 'Porque os demais itens faço em outros lugares.',
      },
      {
        value: 'G',
        label: 'Outro',
        description: 'Outro',
        other: {
          placeholder: 'Descreva o motivo',
        },
      },
    ],
  },
  {
    title: 'REV24 - Por que não optaria desde o início?',
    rev: 'REV24',
    name: 'revision.reasonToNotOptFromStart',
    type: 'radio',
    options: [
      {
        value: 'A',
        label: 'Porque me planejo financeiramente.',
        description: 'Porque me planejo financeiramente.',
      },
      {
        value: 'B',
        label: 'Podem ocorrer outros problemas no início.',
        description: 'Podem ocorrer outros problemas no início.',
      },
      {
        value: 'C',
        label: 'Porque me sinto mais seguro.',
        description: 'Porque me sinto mais seguro.',
      },
      {
        value: 'D',
        label:
          'Se eu decidir vender a moto, quero que ela mantenha a garantia total.',
        description:
          'Se eu decidir vender a moto, quero que ela mantenha a garantia total.',
      },
      {
        value: 'E',
        label: 'Outro',
        description: 'Outro',
        other: {
          placeholder: 'Descreva o motivo',
        },
      },
    ],
  },
  {
    title:
      'REV25 - Depois de quanto tempo de uso da moto você optaria pela modalidade de garantia só do motor?',
    rev: 'REV25',
    name: 'revision.timeBeforeOptingForEngineWarranty',
    type: 'number',
    className: 'max-w-[400px] h-14 [&_button]:text-base [&_input]:text-base',
    suffix: 'meses',
    placeholder: 'Ex: 12',
  },
]
