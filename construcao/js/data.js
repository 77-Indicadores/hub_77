/* =========================================================
   BASE DE DEMONSTRAÇÃO — CONSTRUÇÃO CIVIL — 100% FICTÍCIA
   Construtora, obras, clientes, pessoas e números são
   inventados para apresentação. Nenhum dado real.
   As telas seguem o modelo dos painéis de obras da 77
   (resultado de obra, cronograma, aging, frota, compras...).
   ========================================================= */

const BRAND = {
  nome:'VÉRTICE',
  full:'Vértice Engenharia',
  sub:'Obras públicas, pavimentação e edificações',
  sigla:'V',
  plataforma:'77 Gestão · Obras',
  periodo:'Setembro / 2026'
};

/* logo SVG com degradê — desenhado aqui, nada externo */
function logoSVG(size){
  size = size || 46;
  const uid = 'lg' + Math.random().toString(36).slice(2,8);
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="Vértice">
    <defs>
      <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffd27a"/>
        <stop offset="52%" stop-color="#f5902a"/>
        <stop offset="100%" stop-color="#d0561a"/>
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="19" fill="url(#${uid})"/>
    <path d="M14 18 h9.5 L32 39.5 40.5 18 H50 L36.6 48 h-9.2 Z" fill="#2a1204"/>
    <path d="M8 52 h48" stroke="#2a1204" stroke-width="3" stroke-linecap="round" opacity=".45"/>
  </svg>`;
}

/* ---------------- páginas / navegação por hiperlink ----------------
   Os caminhos partem da raiz do hub (data-root no <body>). */
const PAGES = [
  {id:'hub',        file:'index.html',                          nav:'← Hub',          grad:'--g-brand'},
  {id:'capa',       file:'construcao/index.html',               nav:'Capa',           grad:'--g-obra'},
  {id:'obras',      file:'construcao/paginas/obras.html',       nav:'Obras',          grad:'--g-obra'},
  {id:'saude',      file:'construcao/paginas/saude.html',       nav:'Saúde da Obra',  grad:'--g-metas'},
  {id:'orcado',     file:'construcao/paginas/orcado.html',      nav:'Orç. × Real.',   grad:'--g-produtos'},
  {id:'dre',        file:'construcao/paginas/dre.html',         nav:'DRE',            grad:'--g-vendas'},
  {id:'caixa',      file:'construcao/paginas/caixa.html',       nav:'Fluxo de Caixa', grad:'--g-positivacao'},
  {id:'faturamento',file:'construcao/paginas/faturamento.html', nav:'Faturamento',    grad:'--g-relatorios'},
  {id:'aging',      file:'construcao/paginas/aging.html',       nav:'Aging',          grad:'--g-financeiro'},
  {id:'frota',      file:'construcao/paginas/frota.html',       nav:'Frota',          grad:'--g-cobranca'},
  {id:'compras',    file:'construcao/paginas/compras.html',     nav:'Compras',        grad:'--g-clientes'},
  {id:'comercial',  file:'construcao/paginas/comercial.html',   nav:'Comercial',      grad:'--g-app2'}
];

/* cores de apoio para os gráficos SVG de cada página */
const ACCENTS = {
  capa:['#ffc45c','#e8741f'],
  obras:['#ffc45c','#e8741f'],
  saude:['#b78cff','#6c4cf0'],
  orcado:['#ffd27a','#e8901f'],
  dre:['#5cf0a4','#12a45f'],
  faturamento:['#8dffb8','#1fbe5c'],
  aging:['#ff9d9d','#e0416b'],
  caixa:['#5ce8e0','#1a9fbe'],
  frota:['#ffd27a','#e8681f'],
  compras:['#7fb4ff','#4260d8'],
  comercial:['#8ec6ff','#2f6fe0']
};

/* =========================================================
   NÚMEROS DA OPERAÇÃO (fictícios, consistentes entre telas)
   ========================================================= */
const DB = {

  geral:{
    obrasAtivas:38,
    contrato:'R$ 412,6 mi',
    recebido:'R$ 238,4 mi',
    aExecutar:'R$ 174,2 mi',
    resultado:'R$ 31,8 mi',
    margem:'13,3%',
    fatMes:'R$ 18,74 mi',
    execFaturar:'R$ 6,92 mi',
    aReceber:'R$ 42,3 mi',
    vencido:'R$ 5,86 mi',
    saldoBanco:'R$ 16,6 mi'
  },

  /* resultado por cidade — receita × custo (R$ mi) */
  cidades:[
    ['Sorocaba',   62.4, 53.1],
    ['Campinas',   54.8, 48.9],
    ['Jundiaí',    38.2, 32.6],
    ['Piracicaba', 31.6, 28.8],
    ['Itu',        24.9, 20.4],
    ['Bauru',      17.3, 16.9],
    ['Tatuí',       9.2,  8.1]
  ],

  /* obras: [código, nome, cidade, tipo, contrato R$ mi, recebido %, físico %, resultado R$ mi, margem %] */
  obras:[
    ['8231','Duplicação Av. das Indústrias','Sorocaba','Público', 48.6, 61, 58, 5.42, 14.8],
    ['8244','Pavimentação Distrito Norte','Campinas','Público', 36.2, 72, 70, 4.87, 16.1],
    ['8252','Residencial Parque das Águas','Jundiaí','Privado', 29.8, 48, 51, 3.96, 17.2],
    ['8260','Centro Logístico Vale Norte','Itu','Privado', 24.9, 83, 86, 3.51, 15.6],
    ['8266','Recapeamento Anel Viário','Piracicaba','Público', 21.4, 57, 49, 1.02, 6.3],
    ['8271','Drenagem Córrego do Moinho','Bauru','Público', 17.3, 44, 38, -0.41, -3.1],
    ['8275','UBS e Creche Jd. Primavera','Campinas','Público', 12.6, 39, 42, 0.88, 9.4],
    ['8280','Galpão Industrial Rod. 280','Tatuí','Privado', 9.2, 66, 63, -0.18, -2.7]
  ],

  /* ---------- saúde da obra (obra 8231) ---------- */
  curvaS:{
    meses:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar'],
    planejado:[3,8,14,21,29,37,45,53,64,74,83,90,95,98,100],
    realizado:[2,6,12,18,25,32,39,47,58],
    financeiro:[4,9,16,23,31,39,47,55,61],
    projecao:[null,null,null,null,null,null,null,null,58,65,72,79,86,92,97]
  },
  frentes:[
    ['Terraplenagem',       18, 100, 100, 'good'],
    ['Drenagem profunda',   14,  92,  78, 'red'],
    ['Base e sub-base',     22,  71,  64, 'warn'],
    ['Pavimento asfáltico', 24,  38,  31, 'warn'],
    ['Obras de arte (ponte)',12, 55,  41, 'red'],
    ['Sinalização',          5,   0,   0, 'mute'],
    ['Paisagismo',           5,   0,   0, 'mute']
  ],

  /* ---------- four box: etapas [nome, avanço físico %, consumo do orçamento %] ---------- */
  fourBox:[
    ['Terraplenagem',100,94],['Drenagem',78,91],['Base',64,58],['Asfalto',31,44],
    ['Ponte',41,56],['Canteiro',70,62],['Meio-fio',52,47],['Calçadas',28,24],
    ['Iluminação',15,12],['Contenção',60,73]
  ],
  /* insumo a insumo: [insumo, un, qtd orç, qtd real, preço orç, preço real] */
  insumos:[
    ['CAP 50/70',            't',   1840, 1712, 4280, 4960],
    ['Concreto usinado fck30','m³', 6200, 6510,  612,  598],
    ['Aço CA-50',            't',    410,  452, 6950, 7210],
    ['Brita graduada',       'm³', 18400,17100,  118,  124],
    ['Tubo concreto DN1000', 'm',   2300, 2480,  890,  905],
    ['Diesel S10',           'L', 612000,655000, 5.9,  6.4],
    ['Locação de rolo',      'h',   3800, 4150,  265,  265],
    ['Manta geotêxtil',      'm²', 22000,26800,   9.8, 10.1]
  ],

  /* ---------- faturamento (R$ mi) ---------- */
  faturamentoMes:[
    ['Jan',12.4,10.8],['Fev',13.1,11.9],['Mar',15.8,13.4],['Abr',16.2,14.1],
    ['Mai',17.9,15.2],['Jun',16.6,15.8],['Jul',18.1,16.3],['Ago',17.1,16.9],['Set',18.7,17.2]
  ],
  fatCidade:[['Sorocaba',5.12],['Campinas',4.46],['Jundiaí',3.08],['Piracicaba',2.41],['Itu',2.06],['Bauru',1.61]],

  /* ---------- aging (R$ mil) ---------- */
  aging:[
    ['A vencer',36440],['1–30 d',2210],['31–60 d',1180],['61–90 d',760],['91–180 d',980],['180+ d',730]
  ],
  agingObras:[
    ['8231 Av. Indústrias','Consórcio Viário Leste','R$ 8,42 mi','R$ 1,64 mi','R$ 1,92 mi'],
    ['8244 Distrito Norte','Autarquia Municipal de Obras','R$ 6,10 mi','R$ 0,98 mi','R$ 1,21 mi'],
    ['8266 Anel Viário','Secretaria de Infraestrutura','R$ 4,36 mi','R$ 1,12 mi','R$ 0,84 mi'],
    ['8271 Córrego do Moinho','Autarquia de Saneamento','R$ 3,05 mi','R$ 0,91 mi','R$ 0,66 mi'],
    ['8252 Parque das Águas','Incorporadora Horizonte','R$ 5,77 mi','R$ 0,42 mi','R$ 0,58 mi'],
    ['8260 Vale Norte','Vale Norte Logística','R$ 4,92 mi','R$ 0,21 mi','R$ 0,47 mi']
  ],
  devedores:[
    ['Consórcio Viário Leste','medição 07 e 08','62 dias','R$ 1,64 mi',100,'red'],
    ['Secretaria de Infraestrutura','medição 11','48 dias','R$ 1,12 mi',68,'red'],
    ['Autarquia Municipal de Obras','medição 05','35 dias','R$ 0,98 mi',60,'warn'],
    ['Autarquia de Saneamento','reajuste contratual','121 dias','R$ 0,91 mi',55,'red']
  ],

  /* ---------- fluxo de caixa (R$ mi) ---------- */
  caixaMes:[
    ['Jan',11.2,12.6],['Fev',12.8,12.1],['Mar',14.9,13.8],['Abr',15.4,15.9],
    ['Mai',16.8,14.7],['Jun',15.9,16.2],['Jul',17.6,15.4],['Ago',16.4,16.1],['Set',17.2,15.8]
  ],
  saldoAcum:[['Jan',9.6],['Fev',10.3],['Mar',11.4],['Abr',10.9],['Mai',13.0],['Jun',12.7],['Jul',14.9],['Ago',15.2],['Set',16.6]],
  dfc:[
    ['Receita de Obras',        '+17,20','+141,80','good'],
    ['Custos Diretos',          '−8,64', '−71,90', 'red'],
    ['Pessoal',                 '−3,42', '−29,70', 'red'],
    ['Despesas Gerais & Adm',   '−1,18', '−10,20', 'red'],
    ['Pátio e Equipamentos',    '−0,96', '−8,10',  'red'],
    ['Impostos e Tributos',     '−1,12', '−9,64',  'red'],
    ['Investimentos',           '−0,48', '−4,20',  'red']
  ],

  /* ---------- frota ---------- */
  /* [prefixo, horas produtivas, horas com motor ligado] */
  frotaHoras:[
    ['MN-04',212,238],['EC-11',204,231],['RC-02',188,226],['VA-07',176,219],
    ['PC-03',163,214],['CB-09',149,207],['RT-05',131,198],['MN-08',118,191]
  ],
  os:[
    {l:'Escavadeira EC-14', s:'bomba hidráulica · oficina própria', v:'23 dias', p:100, c:'red'},
    {l:'Rolo compactador RC-06', s:'aguardando peça · fornecedor', v:'14 dias', p:61, c:'warn'},
    {l:'Caminhão basculante CB-21', s:'freio pneumático', v:'6 dias', p:26, c:'good'}
  ],

  /* ---------- compras ---------- */
  comprasCat:[['CAP / Asfalto',2.86],['Concreto usinado',1.94],['Aço',1.41],['Diesel',1.28],['Agregados',1.12],['Locação de equip.',0.74]],
  altas:[
    ['CAP 50/70','Distribuidora Petroasfalto','R$ 4.620','R$ 4.960','+7,4%','R$ 118 mil'],
    ['Aço CA-50 10mm','Siderúrgica Paulista','R$ 6.980','R$ 7.210','+3,3%','R$ 64 mil'],
    ['Diesel S10','Posto Rodovia 280','R$ 6,08','R$ 6,40','+5,3%','R$ 57 mil'],
    ['Brita 1','Pedreira Santa Luzia','R$ 116','R$ 124','+6,9%','R$ 41 mil'],
    ['Cimento CP-II','Cimentos do Vale','R$ 38,90','R$ 41,20','+5,9%','R$ 29 mil'],
    ['Tubo DN600','Pré-moldados Itu','R$ 402','R$ 418','+4,0%','R$ 17 mil']
  ],

  /* ---------- contratos & licitações ---------- */
  vencimentos:[
    ['041/2024','Autarquia de Saneamento','08/10/2026','16','R$ 2,4 mi',['red','Aditivar']],
    ['118/2023','Secretaria de Infraestrutura','19/10/2026','27','R$ 5,1 mi',['red','Aditivar']],
    ['PV-022','Incorporadora Horizonte','02/11/2026','41','R$ 3,8 mi',['warn','Negociar']],
    ['076/2025','Autarquia Municipal de Obras','30/11/2026','69','R$ 7,6 mi',['warn','Acompanhar']],
    ['PV-031','Vale Norte Logística','15/01/2027','115','R$ 1,2 mi',['good','No prazo']],
    ['093/2025','Consórcio Viário Leste','28/02/2027','159','R$ 19,4 mi',['good','No prazo']]
  ],
  funil:[['Editais analisados',412],['Participou',126],['Habilitada',71],['Classificada',48],['Venceu',23]],

  /* ---------- DRE gerencial (R$ mi, acumulado jan–set) ---------- */
  /* [linha, valor, % receita, tipo] — tipo: t = total, s = subtotal, '' = conta */
  dre:[
    ['Receita bruta de obras',      '151,4','—',     't'],
    ['(−) Impostos sobre receita',  '−13,2','8,7%',  ''],
    ['= Receita líquida',           '138,2','100%',  's'],
    ['(−) Custos diretos de obra',  '−78,6','56,9%', ''],
    ['(−) Pessoal de obra',         '−24,1','17,4%', ''],
    ['(−) Pátio e equipamentos',    '−8,9', '6,4%',  ''],
    ['= Lucro bruto',               '26,6', '19,2%', 's'],
    ['(−) Despesas gerais & adm',   '−10,2','7,4%',  ''],
    ['= EBITDA',                    '16,4', '11,9%', 's'],
    ['(−) Depreciação',             '−1,1', '0,8%',  ''],
    ['(−) Despesas financeiras',    '−2,3', '1,7%',  ''],
    ['(−) IR e CSLL',               '−1,3', '0,9%',  ''],
    ['= Resultado líquido',         '11,7', '8,5%',  't']
  ],
  /* margem bruta mês a mês (%) */
  margemMes:[['Jan',17.1],['Fev',18.4],['Mar',19.6],['Abr',18.2],['Mai',20.3],['Jun',19.1],['Jul',20.8],['Ago',19.4],['Set',19.9]],
  /* receita × custo por empresa do grupo (R$ mi) */
  empresas:[['Vértice Obras',92.6,73.8],['Vértice Pav.',41.3,34.9],['Vértice Locação',17.5,12.6]],

  /* ---------- ticker da capa ---------- */
  eventos:[
    ['Medição 09 da obra 8244 aprovada — R$ 1,86 mi','good'],
    ['Contrato 041/2024 vence em 16 dias — aditivo pendente','red'],
    ['CAP 50/70 subiu 7,4% na última compra','warn'],
    ['Escavadeira EC-14 há 23 dias na oficina','red'],
    ['Obra 8260 atingiu 86% de avanço físico','good'],
    ['R$ 6,92 mi executados aguardando faturamento','blue'],
    ['Licitação 212/2026 vencida — pavimentação Distrito Sul','good'],
    ['Drenagem da obra 8231 14 p.p. atrás do planejado','warn']
  ]
};
