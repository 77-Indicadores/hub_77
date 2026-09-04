/* =========================================================
   BASE DE DEMONSTRAÇÃO — 100% FICTÍCIA
   Empresa, pessoas, clientes e números são inventados
   para apresentação de feira. Nenhum dado real.
   ========================================================= */

const BRAND = {
  nome:'BELLARIA',
  full:'Bellaria Distribuidora',
  sub:'Distribuição de cosméticos profissionais',
  sigla:'B',
  plataforma:'77 Gestão',
  periodo:'Agosto / 2025'
};

/* logo SVG com degradê — desenhado aqui, nada externo */
function logoSVG(size){
  size = size || 46;
  const uid = 'lg' + Math.random().toString(36).slice(2,8);
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="Bellaria">
    <defs>
      <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#6ef7b0"/>
        <stop offset="52%" stop-color="#17bd72"/>
        <stop offset="100%" stop-color="#0a8f7e"/>
      </linearGradient>
      <linearGradient id="${uid}b" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="rgba(255,255,255,.55)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="62" height="62" rx="19" fill="url(#${uid})"/>
    <path d="M4 44 C20 34 30 46 60 26 L60 62 L4 62 Z" fill="url(#${uid}b)" opacity=".22"/>
    <path d="M23 17 h13.5 c6.6 0 10.5 3.4 10.5 8.6 0 3.4-1.8 5.9-4.8 7 3.9 1 6.2 3.9 6.2 7.9 0 5.8-4.3 9.5-11.4 9.5 H23 Z
             M30.4 23.2 v7.2 h5.4 c2.8 0 4.4-1.3 4.4-3.6 0-2.3-1.6-3.6-4.4-3.6 Z
             M30.4 36.1 v7.7 h6.1 c3 0 4.8-1.4 4.8-3.9 0-2.4-1.8-3.8-4.8-3.8 Z"
          fill="#04241a"/>
  </svg>`;
}

/* ---------------- páginas / navegação por hiperlink ---------------- */
const PAGES = [
  {id:'capa',        file:'index.html',              nav:'Capa',              icon:'◆', grad:'--g-brand'},
  {id:'vendas',      file:'paginas/vendas.html',     nav:'Vendas',            icon:'↗', grad:'--g-vendas'},
  {id:'metas',       file:'paginas/metas.html',      nav:'Metas',             icon:'◎', grad:'--g-metas'},
  {id:'positivacao', file:'paginas/positivacao.html',nav:'Positivação I',     icon:'⊕', grad:'--g-positivacao'},
  {id:'positivacao2',file:'paginas/positivacao2.html',nav:'Positivação II',   icon:'⊞', grad:'--g-positivacao'},
  {id:'clientes',    file:'paginas/clientes.html',   nav:'Clientes',          icon:'☰', grad:'--g-clientes'},
  {id:'produtos',    file:'paginas/produtos.html',   nav:'Produtos',          icon:'▦', grad:'--g-produtos'},
  {id:'financeiro',  file:'paginas/financeiro.html', nav:'Financeiro',        icon:'R$',grad:'--g-financeiro'},
  {id:'cobranca',    file:'paginas/cobranca.html',   nav:'Cobrança',          icon:'⚖', grad:'--g-cobranca'},
  {id:'app1',        file:'paginas/app1.html',       nav:'App I',             icon:'⌖', grad:'--g-campo'},
  {id:'app2',        file:'paginas/app2.html',       nav:'App II',            icon:'◧', grad:'--g-app2'},
  {id:'relatorios',  file:'paginas/relatorios.html', nav:'WhatsApp',          icon:'✉', grad:'--g-relatorios'}
];

/* cores de apoio para os gráficos SVG de cada página */
const ACCENTS = {
  capa:['#56efa0','#12a45f'],
  vendas:['#5cf0a4','#12a45f'],
  metas:['#b78cff','#6c4cf0'],
  positivacao:['#5ce8e0','#1a9fbe'],
  positivacao2:['#5ce8e0','#1a9fbe'],
  clientes:['#7fb4ff','#4260d8'],
  produtos:['#ffd27a','#e8901f'],
  financeiro:['#ff9d9d','#e0416b'],
  cobranca:['#ffd27a','#e8681f'],
  app1:['#7ff0c8','#15a48d'],
  app2:['#8ec6ff','#2f6fe0'],
  relatorios:['#8dffb8','#1fbe5c'],
  ia:['#e2a8ff','#8347f5']
};

/* =========================================================
   NÚMEROS DA OPERAÇÃO (fictícios, consistentes entre telas)
   ========================================================= */
const DB = {

  /* ---------- visão geral ---------- */
  geral:{
    faturamentoMes:'R$ 4,28 mi',
    faturamentoDelta:'+12,4%',
    pedidos:'1.842',
    ticket:'R$ 2.324',
    margem:'31,8%',
    meta:'R$ 4,75 mi',
    metaPct:'90,1%',
    projecao:'98,7%',
    baseClientes:'2.140',
    positivados:'1.286',
    positivadosPct:'60,1%',
    estoque:'R$ 3,42 mi',
    baixoGiro:'R$ 784 mil',
    receber:'R$ 6,84 mi',
    vencido:'R$ 728 mil',
    execucaoPDV:'92%'
  },

  /* faturamento mensal — R$ mil (ano atual x anterior) */
  faturamentoMes:[
    ['Jan',3620,3210],['Fev',3480,3300],['Mar',3910,3450],['Abr',3760,3390],
    ['Mai',4020,3560],['Jun',4140,3680],['Jul',4190,3720],['Ago',4280,3810]
  ],

  /* venda diária do mês — R$ mil */
  vendaDiaria:[
    ['01',148],['04',162],['05',171],['06',158],['07',184],['08',196],['11',176],
    ['12',188],['13',204],['14',192],['15',216],['18',198],['19',224],['20',212],
    ['21',236],['22',228],['25',214],['26',242],['27',231],['28',248]
  ],

  /* ---------- vendas ---------- */
  categorias:[
    ['Tratamento capilar',1320,'Progressivas, botox, máscaras'],
    ['Coloração',918,'Tinturas, oxidantes, pó descolorante'],
    ['Unhas e esmaltes',604,'Esmalte, gel, acessórios'],
    ['Skincare',512,'Facial e corporal'],
    ['Perfumaria',421,'Deo colônia e body splash'],
    ['Barbearia',289,'Pomadas, navalhas, cera'],
    ['Acessórios',216,'Escovas, secadores, chapinhas']
  ],

  regioes:[
    ['Sudeste',1284,1180,'Marina Reis'],
    ['Capital',964,940,'Carlos Mendes'],
    ['Nordeste',598,690,'Juliana Prado'],
    ['Sul',521,620,'Rafael Souza'],
    ['Litoral',487,520,'Bruna Lima'],
    ['Interior',402,400,'Paula Antunes'],
    ['Centro-Oeste',404,560,'Tiago Alves'],
    ['Norte',392,550,'Léo Farias']
  ],

  canais:[
    ['#5cf0a4','Salão e profissional',1842],
    ['#3fe0d0','Revenda / varejo',1216],
    ['#6ea8ff','Franquias e redes',742],
    ['#b78cff','E-commerce parceiro',312],
    ['rgba(255,255,255,.14)','Outros',168]
  ],

  pedidos:[
    ['#48210','Bella Hair Cosméticos','Marina Reis','R$ 18.420','Hoje 09:12',['good','Faturado']],
    ['#48209','Salão Studio Vogue','Carlos Mendes','R$ 3.180','Hoje 09:48',['good','Faturado']],
    ['#48208','Rede Beleza Total — 6 lojas','Marina Reis','R$ 42.760','Hoje 10:04',['warn','Em separação']],
    ['#48207','Cosmétika Norte','Juliana Prado','R$ 9.940','Hoje 10:22',['blue','Aprovação']],
    ['#48206','Empório da Beleza','Rafael Souza','R$ 6.512','Hoje 10:35',['red','Bloqueado — crédito']],
    ['#48205','Nail Concept','Juliana Prado','R$ 2.870','Hoje 11:02',['good','Faturado']],
    ['#48204','Hair Box Profissional','Bruna Lima','R$ 12.340','Hoje 11:18',['good','Faturado']],
    ['#48203','Distribuidora Charme','Paula Antunes','R$ 21.680','Hoje 11:44',['warn','Em separação']]
  ],

  /* ---------- metas ---------- */
  vendedores:[
    ['Marina Reis','Sudeste',812,760],
    ['Carlos Mendes','Capital',664,650],
    ['Paula Antunes','Interior',402,400],
    ['Bruna Lima','Litoral',487,520],
    ['Juliana Prado','Nordeste',598,690],
    ['Rafael Souza','Sul',521,620],
    ['Tiago Alves','Centro-Oeste',404,560],
    ['Léo Farias','Norte',392,550]
  ],

  metaHistorico:[
    ['Mar',96],['Abr',92],['Mai',101],['Jun',98],['Jul',94],['Ago',90]
  ],

  planoAcao:[
    ['Tiago Alves','R$ 156 mil','41 clientes inativos na carteira','Rota de recuperação — 14 dias',['red','Alta']],
    ['Léo Farias','R$ 158 mil','Ticket médio 22% abaixo da média','Combos e escada de desconto',['red','Alta']],
    ['Rafael Souza','R$ 99 mil','Queda de 18% em coloração','Campanha de mix + treinamento',['warn','Média']],
    ['Juliana Prado','R$ 92 mil','Ritmo abaixo nos últimos 5 dias','Reforço nos 20 maiores clientes',['warn','Média']],
    ['Bruna Lima','R$ 33 mil','Sazonalidade do litoral','Acompanhar — tende a fechar',['mute','Baixa']]
  ],

  /* ---------- positivação ---------- */
  positivacaoMes:[
    ['Mar',1142,2010],['Abr',1188,2042],['Mai',1204,2068],
    ['Jun',1231,2094],['Jul',1252,2118],['Ago',1286,2140]
  ],

  carteiraStatus:[
    ['#5ce8e0','Compraram no mês',1286],
    ['#6ea8ff','Compraram em 30-60 dias',402],
    ['#ffc45c','Sem compra 60-90 dias',186],
    ['#ff7b7b','Sem compra 90+ dias',132],
    ['rgba(255,255,255,.14)','Nunca compraram',134]
  ],

  /* ---------- positivação no modelo ADL ---------- */
  /* base ativa (comprou nos últimos 365 dias) = 2.006 clientes */
  ativos:2006,

  /* faixas de dias sem compra: [chave, rótulo, tag, clientes] */
  faixas:[
    ['0-30d','0 a 30 dias','POSITIVADO',1286,'good'],
    ['31-60d','31 a 60 dias','RISCO',402,'blue'],
    ['61-90d','61 a 90 dias','ALERTA',186,'warn'],
    ['+90d','Acima de 90 dias','CHURN',132,'red']
  ],

  /* distribuição por curva ABC × faixa de dias sem compra */
  curvaFaixa:[
    ['A',176,24,8,6],
    ['B',312,74,26,16],
    ['C',798,304,152,110]
  ],

  /* ---------- positivação II: cliente × linha de produto ---------- */
  /* status: R = recente (até 60 dias) · P = recompra · N = nunca comprou */
  linhas:[
    ['prog','Progressiva'],['color','Coloração'],['trat','Tratamento'],
    ['unhas','Unhas'],['skin','Skincare'],['barba','Barbearia']
  ],

  carteiraLinhas:[
    ['São Paulo/SP','10248','Bella Hair Cosméticos','Marina Reis','A',
      [['R','28/08'],['R','26/08'],['R','28/08'],['P','12/05'],['R','19/08'],['N','']]],
    ['Campinas/SP','10312','Grupo Essenza Beauty','Marina Reis','A',
      [['R','27/08'],['R','27/08'],['R','22/08'],['R','21/08'],['R','27/08'],['P','03/06']]],
    ['Santos/SP','10455','Hair Box Profissional','Bruna Lima','A',
      [['R','14/08'],['P','28/04'],['R','14/08'],['N',''],['P','15/05'],['N','']]],
    ['Curitiba/PR','10501','Perfumaria Bella','Rafael Souza','B',
      [['R','21/08'],['R','18/08'],['P','02/06'],['R','21/08'],['R','18/08'],['P','20/05']]],
    ['São Paulo/SP','10577','Salão Studio Vogue','Carlos Mendes','B',
      [['R','09/08'],['N',''],['R','09/08'],['P','11/05'],['N',''],['N','']]],
    ['Recife/PE','10604','Farmácia Estética Vida','Juliana Prado','B',
      [['P','27/07'],['P','19/06'],['R','12/08'],['N',''],['R','12/08'],['N','']]],
    ['Porto Alegre/RS','10688','Empório da Beleza','Rafael Souza','B',
      [['P','13/07'],['P','30/05'],['P','13/07'],['N',''],['N',''],['P','22/04']]],
    ['Manaus/AM','10712','Cosmétika Norte','Léo Farias','B',
      [['P','29/06'],['P','29/06'],['P','14/06'],['N',''],['N',''],['N','']]],
    ['Florianópolis/SC','10790','Studio Hair Center','Rafael Souza','B',
      [['P','30/06'],['N',''],['P','30/06'],['P','08/04'],['N',''],['N','']]],
    ['Goiânia/GO','10834','Distribuidora Charme','Tiago Alves','A',
      [['P','21/06'],['P','21/06'],['P','06/06'],['P','14/03'],['P','21/06'],['N','']]],
    ['São Paulo/SP','10901','Rede Beleza Total','Marina Reis','A',
      [['P','09/06'],['P','09/06'],['P','09/06'],['N',''],['P','28/05'],['N','']]],
    ['Belém/PA','10945','Beleza Já Express','Léo Farias','C',
      [['P','14/06'],['N',''],['N',''],['P','02/05'],['N',''],['N','']]],
    ['Salvador/BA','11002','Nail Concept','Juliana Prado','C',
      [['N',''],['N',''],['N',''],['P','29/05'],['N',''],['N','']]],
    ['Fortaleza/CE','11078','Studio 22 Beauty','Juliana Prado','C',
      [['P','06/05'],['N',''],['P','06/05'],['N',''],['N',''],['N','']]]
  ],

  /* detalhe operacional por cliente (modelo ADL) */
  clientesFaixa:[
    ['Bella Hair Cosméticos',42,'A',2,'0-30d'],
    ['Grupo Essenza Beauty',36,'A',3,'0-30d'],
    ['Hair Box Profissional',31,'A',15,'0-30d'],
    ['Perfumaria Bella',28,'B',9,'0-30d'],
    ['Salão Studio Vogue',24,'B',21,'0-30d'],
    ['Farmácia Estética Vida',19,'B',34,'31-60d'],
    ['Empório da Beleza',17,'B',48,'31-60d'],
    ['Cosmétika Norte',14,'B',62,'61-90d'],
    ['Studio Hair Center',12,'B',61,'61-90d'],
    ['Salão Vogue Premium',11,'B',66,'61-90d'],
    ['Distribuidora Charme',9,'A',71,'61-90d'],
    ['Beleza Já Express',7,'C',78,'61-90d'],
    ['Rede Beleza Total',6,'A',83,'61-90d'],
    ['Nail Concept',4,'C',94,'+90d'],
    ['Studio 22 Beauty',3,'C',118,'+90d'],
    ['Casa da Beleza Sul',2,'C',146,'+90d']
  ],

  positivacaoVendedor:[
    ['Marina Reis',214,246],['Carlos Mendes',186,212],['Juliana Prado',171,224],
    ['Bruna Lima',158,196],['Paula Antunes',142,164],['Rafael Souza',148,218],
    ['Tiago Alves',136,238],['Léo Farias',131,242]
  ],

  recuperacao:[
    ['Rede Beleza Total','A','83 dias','R$ 38.400','6 lojas · Capital',['red','Crítico']],
    ['Distribuidora Charme','A','71 dias','R$ 22.100','Atacado · Interior',['red','Crítico']],
    ['Salão Vogue Premium','B','66 dias','R$ 9.800','Salão · Sudeste',['warn','Alerta']],
    ['Cosmétika Norte','B','62 dias','R$ 8.240','Revenda · Norte',['warn','Alerta']],
    ['Studio Hair Center','B','61 dias','R$ 7.150','Salão · Sul',['warn','Alerta']],
    ['Beleza Já Express','C','78 dias','R$ 3.420','Varejo · Litoral',['mute','Monitorar']],
    ['Nail Concept','C','94 dias','R$ 2.870','Nail bar · Capital',['mute','Monitorar']]
  ],

  frequencia:[
    ['Semanal',386],['Quinzenal',442],['Mensal',458],['Bimestral',214],['Esporádico',640]
  ],

  /* ---------- clientes ---------- */
  curvaABC:[
    ['#5cf0a4','Curva A — 70% do faturamento',214],
    ['#6ea8ff','Curva B — 20% do faturamento',428],
    ['#b78cff','Curva C — 10% do faturamento',1498]
  ],

  topClientes:[
    ['Rede Beleza Total','A','Capital','R$ 38.400','R$ 128 mil','83 dias',['red','Em risco']],
    ['Bella Hair Cosméticos','A','Sudeste','R$ 34.200','—','Hoje',['good','Ativo']],
    ['Distribuidora Charme','A','Interior','R$ 22.100','R$ 96 mil','71 dias',['red','Em risco']],
    ['Hair Box Profissional','A','Litoral','R$ 19.600','—','Hoje',['good','Ativo']],
    ['Grupo Essenza Beauty','A','Sudeste','R$ 18.900','—','3 dias',['good','Ativo']],
    ['Empório da Beleza','B','Sul','R$ 14.300','R$ 74 mil','12 dias',['warn','Atenção']],
    ['Cosmétika Norte','B','Norte','R$ 8.240','R$ 52 mil','62 dias',['warn','Atenção']],
    ['Studio Hair Center','B','Sul','R$ 7.150','R$ 38 mil','61 dias',['warn','Atenção']]
  ],

  novosClientes:[
    ['Ago',74],['Jul',53],['Jun',61],['Mai',48],['Abr',56],['Mar',42]
  ],

  /* ---------- produtos / estoque ---------- */
  estoqueCategoria:[
    ['Cabelos',962,148],['Coloração',704,196],['Unhas',438,132],
    ['Skincare',386,118],['Perfumaria',298,104],['Barbearia',142,86]
  ],

  maisVendidos:[
    ['Progressiva Orgânica 1L','Tratamento','1.842 un.','R$ 312 mil',['red','Ruptura']],
    ['Oxidante 30 vol 900ml','Coloração','2.640 un.','R$ 186 mil',['red','Ruptura']],
    ['Máscara Reconstrutora 500g','Tratamento','1.408 un.','R$ 168 mil',['warn','Crítico']],
    ['Tintura 6.0 Louro Escuro','Coloração','3.180 un.','R$ 142 mil',['good','Saudável']],
    ['Shampoo Antirresíduo 1L','Tratamento','1.216 un.','R$ 118 mil',['warn','Atenção']],
    ['Esmalte Coleção Verão','Unhas','624 un.','R$ 41 mil',['mute','Excesso']]
  ],

  compras:[
    ['Progressiva Orgânica 1L','0','180','0 dias','420 un.',['red','Ruptura']],
    ['Oxidante 30 vol 900ml','0','240','0 dias','560 un.',['red','Ruptura']],
    ['Máscara Reconstrutora 500g','24','168','4 dias','380 un.',['warn','Crítico']],
    ['Shampoo Antirresíduo 1L','96','142','20 dias','260 un.',['warn','Atenção']],
    ['Tintura 6.0 Louro Escuro','410','198','62 dias','—',['good','Saudável']],
    ['Body Splash Frutas 250ml','1.412','62','286 dias','—',['mute','Excesso']],
    ['Esmalte Coleção Verão','1.842','52','318 dias','—',['mute','Excesso']]
  ],

  acaoEstoque:[
    ['Progressiva Orgânica 1L','Ruptura — demanda de 180/mês','REPOR',100,'red'],
    ['Oxidante 30 vol 900ml','Ruptura — demanda de 240/mês','REPOR',100,'red'],
    ['Máscara Reconstrutora 500g','4 dias de cobertura','4 DIAS',14,'warn'],
    ['Esmalte Coleção Verão','318 dias parado · R$ 96 mil','QUEIMAR',100,'warn'],
    ['Body Splash Frutas 250ml','286 dias parado · R$ 74 mil','QUEIMAR',96,'warn'],
    ['Pomada Modeladora 120g','Validade em 90 dias · 1.240 un.','PROMOVER',78,'warn']
  ],

  /* ---------- financeiro ---------- */
  aging:[
    ['A vencer',6112],['1-15 dias',214],['16-30 dias',168],
    ['31-60 dias',132],['61-90 dias',0],['90+ dias',214]
  ],

  recebimento:[
    ['Mar',312],['Abr',348],['Mai',364],['Jun',372],['Jul',381],['Ago',396]
  ],

  devedores:[
    ['Rede Beleza Total','6 títulos','94 dias','R$ 128 mil',100,'red'],
    ['Distribuidora Charme','4 títulos','71 dias','R$ 96 mil',75,'red'],
    ['Empório da Beleza','3 títulos','48 dias','R$ 74 mil',58,'warn'],
    ['Cosmétika Norte','2 títulos','32 dias','R$ 52 mil',41,'warn'],
    ['Studio Hair Center','2 títulos','21 dias','R$ 38 mil',30,'warn'],
    ['Salão Vogue Premium','1 título','12 dias','R$ 19 mil',15,'blue']
  ],

  regua:[
    ['Lembrete prévio','3 dias antes do vencimento','WhatsApp','84',['good','Ativa']],
    ['Aviso de vencimento','No dia','WhatsApp + e-mail','37',['good','Ativa']],
    ['1ª cobrança','3 dias depois','WhatsApp','29',['good','Ativa']],
    ['2ª cobrança','10 dias depois','WhatsApp + ligação','16',['warn','Ativa']],
    ['Escalonamento','30 dias depois','Gerente comercial','6',['red','Ativa']],
    ['Bloqueio de crédito','45 dias depois','Automático no ERP','3',['red','Ativa']]
  ],

  formasPagamento:[
    ['#5cf0a4','Boleto 28/35/42',2864],
    ['#6ea8ff','Boleto 30 dias',1912],
    ['#b78cff','PIX à vista',1204],
    ['#ffc45c','Cartão',548],
    ['rgba(255,255,255,.14)','Outros',312]
  ],

  /* ---------- campo ---------- */
  visitasSemana:[
    ['S1',298,320],['S2',312,320],['S3',326,330],
    ['S4',348,350],['S5',334,340],['S6',352,355]
  ],

  promotoras:[
    ['Aline Costa','Zona Sul','96 visitas · 0 pendências',98],
    ['Camila Duarte','Centro','88 visitas · 1 pendência',95],
    ['Renata Alves','Norte','92 visitas · 2 pendências',93],
    ['Patrícia Nunes','Oeste','84 visitas · 4 pendências',89],
    ['Sabrina Melo','Interior','76 visitas · 6 pendências',84],
    ['Débora Ramos','Litoral','68 visitas · 9 pendências',78]
  ],

  checkins:[
    ['Perfumaria Bella — Loja 4','Aline Costa','09:12','Foto + preço + ruptura',['good','Completo']],
    ['Rede Beleza Total — Centro','Camila Duarte','09:48','Foto + share de gôndola',['good','Completo']],
    ['Farmácia Estética Vida','Renata Alves','10:22','Ruptura em 3 SKUs',['warn','Ação aberta']],
    ['Salão Studio Vogue','Patrícia Nunes','10:55','Preço 12% acima da tabela',['warn','Ação aberta']],
    ['Empório da Beleza','Sabrina Melo','11:30','Sem material de PDV',['red','Pendente']],
    ['Nail Concept','—','—','Visita não realizada',['red','Não visitado']]
  ],

  /* ---------- IA ---------- */
  conversaIA:[
    ['me','Como estão as vendas hoje?'],
    ['bot','Hoje até agora: <b>R$ 184.200</b> em 79 pedidos.\nEstá <b>12% acima</b> da média das últimas 4 terças.\n\nSudeste puxando o resultado (+31%). Norte está 24% abaixo.'],
    ['me','Quem não bateu a meta esse mês?'],
    ['bot','5 vendedores abaixo de 100%:\n\n<b>Léo Farias</b> — 71,3% · gap R$ 158 mil\n<b>Tiago Alves</b> — 72,1% · gap R$ 156 mil\n<b>Rafael Souza</b> — 84,0% · gap R$ 99 mil\n<b>Juliana Prado</b> — 86,7% · gap R$ 92 mil\n<b>Bruna Lima</b> — 93,7% · gap R$ 33 mil\n\nO maior peso vem de <b>41 clientes curva A inativos</b> na carteira do Tiago.'],
    ['me','Cria uma tarefa pro Tiago recuperar esses clientes'],
    ['bot','Tarefa criada ✅\n<b>“Rota de recuperação — 41 clientes inativos”</b>\nResponsável: Tiago Alves\nPrazo: 14 dias\nLista priorizada por valor histórico anexada.\n\nEle já recebeu no WhatsApp.']
  ],

  alertasIA:[
    ['Ruptura crítica em 2 SKUs','R$ 210 mil de venda em risco','ALTA',100,'red'],
    ['Rede Beleza Total — 94 dias vencido','R$ 128 mil · cliente curva A','ALTA',100,'red'],
    ['Projeção de meta em 98,7%','faltam R$ 470 mil em 6 dias úteis','MÉDIA',70,'warn'],
    ['Baixo giro subiu para R$ 784 mil','22,9% do estoque total','MÉDIA',66,'warn'],
    ['6 lojas sem visita esta semana','supervisão de campo notificada','MÉDIA',55,'warn'],
    ['Positivação subiu 3,4 p.p.','melhor resultado do semestre','BOA',40,'good']
  ],

  perguntasIA:[
    ['“Vendas de hoje por região”','Comercial','Pedidos do ERP','3 s',['good','Consulta']],
    ['“Quais clientes pararam de comprar?”','Carteira','Positivação','4 s',['good','Consulta']],
    ['“Quanto tenho vencido acima de 60 dias?”','Financeiro','Contas a receber','3 s',['good','Consulta']],
    ['“O que está parado no estoque?”','Operação','Giro e cobertura','5 s',['good','Consulta']],
    ['“Qual o mix da Rede Beleza Total?”','Cliente','Histórico de compras','4 s',['good','Consulta']],
    ['“Cria tarefa para o time de compras”','Automação','Módulo de tarefas','2 s',['blue','Ação']],
    ['“Me manda o resumo toda manhã”','Gestão','Relatório automático','—',['blue','Agendamento']]
  ],

  /* ---------- eventos do ticker da capa ---------- */
  eventos:[
    ['Pedido #48210 faturado · Bella Hair — R$ 18.420','good'],
    ['Marina Reis bateu 106,8% da meta','good'],
    ['Ruptura: Oxidante 30 vol zerou no estoque','red'],
    ['Cobrança automática enviada para 37 clientes','blue'],
    ['Check-in registrado em Perfumaria Bella — Loja 4','good'],
    ['Rede Beleza Total — 94 dias em atraso · R$ 128 mil','red'],
    ['Resumo diário enviado para 12 gestores','blue'],
    ['Positivação do mês subiu para 60,1%','good'],
    ['Tarefa criada: repor ruptura de oxidante','warn'],
    ['Pedido #48208 em separação — R$ 42.760','warn'],
    ['Região Norte 24% abaixo da média da semana','warn'],
    ['Esmalte Coleção Verão parado há 318 dias — R$ 96 mil','warn'],
    ['Novo cliente cadastrado: Studio Hair Center','good'],
    ['Meta do mês em risco: projeção de 98,7%','warn'],
    ['R$ 396 mil recuperados pela régua de cobrança','good']
  ]
};

/* =========================================================
   MODELOS DE RELATÓRIO AUTOMÁTICO NO WHATSAPP
   ========================================================= */
const REPORTS = [
  { id:'diario', icon:'☀', name:'Resumo diário', when:'Todo dia 07:30', who:'Diretoria e gerência comercial',
    body:`*BELLARIA — RESUMO DE ONTEM*
_28/08 · 77 Gestão_

💰 *Faturamento:* R$ 184.200
📈 +12% vs. média das últimas 4 terças
🧾 *Pedidos:* 79 · ticket R$ 2.332
🎯 *Meta do mês:* 90,1% (R$ 4,28 mi de R$ 4,75 mi)

🥇 *Destaque:* Marina Reis — R$ 38.400
⚠️ *Atenção:* Norte 24% abaixo da média

📦 Ruptura: 46 SKUs
💳 Vencidos: R$ 728 mil

_Responda MENU para ver outros indicadores._` },

  { id:'semanal', icon:'📊', name:'Fechamento semanal', when:'Segunda 08:00', who:'Diretoria e gerentes de região',
    body:`*FECHAMENTO DA SEMANA 35*
_22/08 a 28/08 · Bellaria_

💰 *Faturamento:* R$ 1,04 mi (+8,6%)
🧾 *Pedidos:* 442 · ticket R$ 2.352
👥 *Clientes positivados:* 386
🆕 *Novos clientes:* 21

*POR REGIÃO*
Sudeste   R$ 312 mil ▲ 14%
Capital   R$ 248 mil ▲ 6%
Nordeste  R$ 196 mil ▼ 3%
Sul       R$ 158 mil ▼ 9%
Norte     R$ 126 mil ▼ 24%

*TOP 3 LINHAS*
1. Tratamento capilar — R$ 348 mil
2. Coloração — R$ 231 mil
3. Unhas e esmaltes — R$ 152 mil

⚠️ Norte é o que mais pesa no gap da meta.` },

  { id:'meta', icon:'🎯', name:'Meta em risco', when:'Gatilho: projeção < 95%', who:'Gerente comercial + vendedor',
    body:`🚨 *ALERTA DE META*

A projeção de fechamento caiu para *98,7%*.

🎯 Meta: R$ 4,75 mi
✅ Realizado: R$ 4,28 mi (90,1%)
📉 Projeção: R$ 4,69 mi
⏳ Faltam *6 dias úteis* e *R$ 470 mil*

*QUEM ESTÁ ABAIXO*
Léo Farias    71,3% — gap R$ 158 mil
Tiago Alves   72,1% — gap R$ 156 mil
Rafael Souza  84,0% — gap R$ 99 mil
Juliana Prado 86,7% — gap R$ 92 mil

💡 *Onde está o dinheiro:* R$ 284 mil do gap estão em 41 clientes curva A sem compra há mais de 45 dias.

_Responda CRIAR TAREFA para abrir a rota de recuperação._` },

  { id:'cobranca', icon:'💳', name:'Cobrança e aging', when:'Terça e sexta 09:00', who:'Financeiro e diretoria',
    body:`*POSIÇÃO DE RECEBÍVEIS*
_Atualizado hoje às 09:00_

📥 *A receber:* R$ 6,84 mi
🔴 *Vencido:* R$ 728 mil (10,6%)
✅ *Recuperado no mês:* R$ 396 mil (+31%)

*AGING*
1 a 15 dias   R$ 214 mil
16 a 30 dias  R$ 168 mil
31 a 60 dias  R$ 132 mil
90+ dias      R$ 214 mil

*MAIORES DEVEDORES*
1. Rede Beleza Total — R$ 128 mil (94d)
2. Distribuidora Charme — R$ 96 mil (71d)
3. Empório da Beleza — R$ 74 mil (48d)

🤖 A régua disparou *175 cobranças* nas últimas 24h.
🔒 3 clientes bloqueados por crédito.` },

  { id:'estoque', icon:'📦', name:'Estoque e ruptura', when:'Todo dia 06:45', who:'Compras e operação',
    body:`*ESTOQUE — POSIÇÃO DE HOJE*

📦 *Valor total:* R$ 3,42 mi · 2.980 SKUs
🐢 *Baixo giro:* R$ 784 mil (22,9%)
📅 *Cobertura média:* 62 dias _(ideal 35 a 45)_

🔴 *RUPTURA — 46 SKUs*
Progressiva Orgânica 1L — demanda 180/mês
Oxidante 30 vol 900ml — demanda 240/mês
Máscara Reconstrutora 500g — 4 dias

💸 *Venda em risco:* R$ 210 mil

🟡 *PARADO — queimar*
Esmalte Coleção Verão — 318 dias · R$ 96 mil
Body Splash Frutas — 286 dias · R$ 74 mil

_Responda COMPRA para a sugestão de pedido._` },

  { id:'positivacao', icon:'👥', name:'Positivação da carteira', when:'Dia 1 e dia 15, 08:00', who:'Gerência comercial e vendedores',
    body:`*POSITIVAÇÃO DA CARTEIRA*
_Fechamento da quinzena · Bellaria_

👥 *Base ativa:* 2.140 clientes
✅ *Positivados:* 1.286 (60,1%) ▲ 3,4 p.p.
🆕 *Novos:* 74
🔴 *Sem compra há 60+ dias:* 318

💰 *Potencial parado:* R$ 612 mil

*RECUPERAÇÃO PRIORITÁRIA*
Rede Beleza Total — A — 83d — R$ 38,4 mil/mês
Distribuidora Charme — A — 71d — R$ 22,1 mil/mês
Salão Vogue Premium — B — 66d — R$ 9,8 mil/mês

📌 Cada vendedor recebeu a própria lista, priorizada por valor histórico.` },

  { id:'ranking', icon:'🏆', name:'Ranking de vendedores', when:'Sexta 18:00', who:'Grupo do time comercial',
    body:`🏆 *RANKING DA SEMANA*

🥇 Marina Reis — 106,8% — R$ 812 mil
🥈 Carlos Mendes — 102,2% — R$ 664 mil
🥉 Paula Antunes — 100,5% — R$ 402 mil
4º Bruna Lima — 93,7%
5º Juliana Prado — 86,7%
6º Rafael Souza — 84,0%
7º Tiago Alves — 72,1%
8º Léo Farias — 71,3%

📈 *Time:* 90,1% da meta
🔥 *Maior evolução:* Paula Antunes (+14 p.p. na semana)

Boa semana, time! Segunda tem plano de ação com quem está abaixo de 90%.` },

  { id:'mensal', icon:'📅', name:'Fechamento mensal', when:'Dia 1 às 08:00', who:'Sócios e diretoria',
    body:`*FECHAMENTO DE AGOSTO*
_Bellaria Distribuidora_

💰 *Faturamento:* R$ 4,28 mi ▲ 12,4%
🧾 *Pedidos:* 1.842 · ticket R$ 2.324
📊 *Margem bruta:* 31,8% ▼ 0,6 p.p.
🎯 *Meta:* 90,1% atingida

👥 *Positivação:* 60,1% (1.286 clientes)
📦 *Estoque:* R$ 3,42 mi · 22,9% em baixo giro
💳 *Inadimplência:* 10,6% da carteira
🎯 *Execução no PDV:* 92%

*3 PONTOS DE ATENÇÃO*
1. Margem caindo por desconto em revenda
2. R$ 784 mil de capital parado no estoque
3. Norte 24% abaixo — carteira desassistida

_Relatório completo no painel 77 Gestão._` },

  { id:'alerta', icon:'⚡', name:'Alerta instantâneo', when:'No momento do evento', who:'Responsável pela área',
    body:`⚡ *ALERTA AUTOMÁTICO*
_há 2 minutos_

🔴 *RUPTURA CRÍTICA*
Oxidante 30 vol 900ml zerou no estoque.

📉 Demanda: 240 un./mês
💸 Venda em risco: R$ 84 mil
📅 Lead time do fornecedor: 12 dias
👥 18 clientes compram esse item toda semana

✅ *Tarefa criada automaticamente*
Responsável: Compras
Prazo: 24 horas

_Responda OK para confirmar ou ADIAR para reprogramar._` },

  { id:'pdv', icon:'📍', name:'Execução no PDV', when:'Todo dia 19:00', who:'Supervisão de campo e trade',
    body:`*EXECUÇÃO NO PDV — HOJE*

📍 *Visitas:* 62 de 66 planejadas (94%)
✅ *Checklist completo:* 92%
🖼 *Fotos de gôndola:* 58
📊 *Share de gôndola:* 34% ▲ 3 p.p.

🔴 *RUPTURA EM LOJA — 7,4%*
Farmácia Estética Vida — 3 SKUs
Empório da Beleza — sem material de PDV

⚠️ *PREÇO FORA DA TABELA*
Salão Studio Vogue — 12% acima

❌ *NÃO VISITADAS*
Nail Concept · Beleza Já · Studio 22 · Hair Box

_Fotos e evidências no painel de campo._` },

  { id:'cliente', icon:'💚', name:'Aniversário e retenção', when:'Todo dia 08:00', who:'Vendedor da carteira',
    body:`💚 *RELACIONAMENTO DE HOJE*

🎂 *Aniversário de cliente*
Bella Hair Cosméticos — 8 anos de parceria
Sugestão: brinde na próxima entrega

⏰ *No ponto de recompra*
Hair Box Profissional — costuma comprar a cada 14 dias, hoje é o 15º
Grupo Essenza Beauty — 12º dia sem pedido

🔁 *Mix incompleto*
Salão Studio Vogue não compra Coloração há 3 meses
Potencial estimado: R$ 4,2 mil/mês

_Responda CONTATO para registrar o retorno._` }
];
