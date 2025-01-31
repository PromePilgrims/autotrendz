export const revisionFields = [
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
    title: 'Quais revisões você fez na concessionária?',
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
      'REV1 - Por qual motivo você realiza as revisões na moto de acordo com o manual?',
    rev: 'REV1',
    name: 'revision.reasonForManualRevision',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Manter a garantia da moto' },
      { value: 'B', label: 'Garantir a minha segurança' },
      { value: 'C', label: 'Valorizar a moto na revenda' },
      { value: 'D', label: 'Aumentar a vida útil da moto' },
      {
        value: 'E',
        label: 'Reduzir prejuízos com manutenções corretivas',
      },
      {
        value: 'F',
        label: 'Outro',
        other: { placeholder: 'Outro motivo' },
      },
    ],
  },
  {
    title:
      'REV2 - Por que você escolhe a concessionária para fazer as revisões em sua moto?',
    rev: 'REV2',
    name: 'revision.reasonForDealershipChoice',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Confio na empresa' },
      { value: 'B', label: 'Tem as peças que preciso' },
      { value: 'C', label: 'Os serviços são bem feitos' },
      { value: 'D', label: 'Gosto do atendimento' },
      { value: 'E', label: 'É perto da minha casa ou trabalho' },
      { value: 'F', label: 'Tem preços justos' },
      { value: 'G', label: 'Tem horários convenientes' },
      {
        value: 'H',
        label: 'Outro',
        other: { placeholder: 'Outro...' },
      },
    ],
  },
  {
    title:
      'REV3 - Quais fatores te motivariam a ainda continuar frequentando a oficina da concessionária?',
    rev: 'REV3',
    name: 'revision.motivationalFactorsForDealership',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Facilidade em agendar e levar a moto',
      },
      { value: 'B', label: 'Preços mais baixos' },
      {
        value: 'C',
        label: 'Serviço feito na minha casa/trabalho',
      },
      {
        value: 'D',
        label:
          'Um plano envolvendo todas as revisões quando compro a moto nova',
      },
      {
        value: 'E',
        label: 'Maior valorização na troca da moto na concessionária',
      },
      {
        value: 'F',
        label: 'Outro',
        other: { placeholder: 'Outro...' },
      },
    ],
  },
  {
    title: 'REV4 - Você conhece a Revisão Preço Fixo Yamaha?',
    rev: 'REV4',
    name: 'revision.knowledgeAboutFixedPrice',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title:
      'REV5 - Na hora da entrega da moto, explicaram que a Yamaha oferece revisões com preço fechado e com mão-de-obra paga pela Yamaha nas duas primeiras?',
    rev: 'REV5',
    name: 'revision.explanationAboutFixedPrice',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title:
      'REV6 - Na sua opinião, quais benefícios você tem com a Revisão Preço Fixo?',
    rev: 'REV6',
    name: 'revision.benefitsOfFixedPrice',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Saber quanto gastarei em manutenção',
      },
      {
        value: 'B',
        label: 'Posso me preparar para a despesa',
      },
      { value: 'C', label: 'É mais econômico' },
      { value: 'D', label: 'É mais prático' },
      {
        value: 'E',
        label:
          'Tenho certeza de que os serviços serão feitos de acordo com o necessário',
      },
      {
        value: 'F',
        label: 'Posso parcelar os valores',
      },
      {
        value: 'G',
        label: 'Ganho descontos em outros produtos',
      },
      {
        value: 'H',
        label: 'Outro',
        other: { placeholder: 'Outro...' },
      },
    ],
  },
  {
    title: 'REV7 - Você tem alguma sugestão de melhoria na Revisão Preço Fixo?',
    rev: 'REV7',
    name: 'revision.suggestionsForImprovement',
    type: 'textarea',
    className: 'full-width',
  },
  {
    title:
      'REV8 - Você sabia que a Yamaha paga a mão-de-obra na primeira e na segunda revisões?',
    rev: 'REV8',
    name: 'revision.knowledgeAboutLaborCost',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title:
      'REV9 - Qual o valor em Reais que você imagina que a Yamaha paga em cada uma da primeira e segunda revisões?',
    rev: 'REV9',
    name: 'revision.estimatedCostForFirstTwoRevisions',
    type: 'revisions_prices',
  },
  {
    title:
      'REV10 - Você preferiria que a Yamaha lhe concedesse um crédito nesse valor para utilizar na 3º ou 4º revisões?',
    rev: 'REV10',
    name: 'revision.preferCreditForLaterRevisions',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title:
      'REV11 - Você se interessaria se houvesse uma revisão com itens de motor, com um valor reduzido e garantia apenas do motor?',
    rev: 'REV11',
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
      'REV12 - Em relação ao preço praticado na revisão atualmente, quanto você acha que custaria a menos essa revisão reduzida (em percentual)?',
    rev: 'REV12',
    name: 'revision.estimatedCostReduction',
    type: 'percentage',
    className: 'full-width',
  },
  {
    title:
      'REV13 - Você optaria desde o início por essa modalidade de garantia?',
    rev: 'REV13',
    name: 'revision.initialOptionForWarrantyType',
    type: 'radio',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Sim' },
      { value: 'B', label: 'Não' },
    ],
  },
  {
    title: 'REV14 - Por que optaria desde o início?',
    rev: 'REV14',
    name: 'revision.reasonsForInitialOption',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      { value: 'A', label: 'Porque será mais barato' },
      {
        value: 'B',
        label: 'Porque me preocupo mais com o motor',
      },
      {
        value: 'C',
        label: 'Porque os outros itens não dão problema',
      },
      {
        value: 'D',
        label: 'Porque a manutenção principal que faço é no motor',
      },
      {
        value: 'E',
        label: 'Porque só troco o óleo do motor',
      },
      {
        value: 'F',
        label: 'Porque os demais itens faço em outros lugares',
      },
      {
        value: 'G',
        label: 'Outro',
        other: { placeholder: 'Outro...' },
      },
    ],
  },
  {
    title: 'REV15 - Por que não optaria desde o início?',
    rev: 'REV15',
    name: 'revision.reasonsAgainstInitialOption',
    type: 'checkbox',
    className: 'grid-cols-2',
    options: [
      {
        value: 'A',
        label: 'Porque me planejo financeiramente',
      },
      {
        value: 'B',
        label: 'Podem ocorrer outros problemas no início',
      },
      { value: 'C', label: 'Porque me sinto mais seguro' },
      {
        value: 'D',
        label:
          'Se eu decidir vender a moto, quero que ela mantenha a garantia total',
      },
      {
        value: 'E',
        label: 'Outro',
        other: { placeholder: 'Outro...' },
      },
    ],
  },
  {
    title:
      'REV16 - Depois de quanto tempo de uso da moto você optaria pela modalidade de garantia só do motor?',
    rev: 'REV16',
    name: 'revision.timeBeforeOptingForEngineWarranty',
    type: 'number',
    className: 'max-w-[400px] h-14 [&_button]:text-base [&_input]:text-base',
    suffix: 'meses',
    placeholder: 'Ex: 12',
  },
]
