// 77 Gestão — Protótipo Bellaria — cache offline completo
// Sobe a versão (v2, v3...) sempre que trocar algum arquivo, pra forçar atualização do cache.
const CACHE = 'hub77-v2';

const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'css/base.css',
  'js/data.js',
  'js/ui.js',
  'assets/logo-77-horizontal-color.png',
  'assets/logo-77-horizontal-white.png',
  'assets/logo-77-symbol-color.png',
  'paginas/app1.html',
  'paginas/app2.html',
  'paginas/clientes.html',
  'paginas/cobranca.html',
  'paginas/financeiro.html',
  'paginas/metas.html',
  'paginas/positivacao.html',
  'paginas/positivacao2.html',
  'paginas/produtos.html',
  'paginas/relatorios.html',
  'paginas/vendas.html',
  'construcao/index.html',
  'construcao/css/obra.css',
  'construcao/js/data.js',
  'construcao/js/obra-ui.js',
  'construcao/paginas/obras.html',
  'construcao/paginas/saude.html',
  'construcao/paginas/orcado.html',
  'construcao/paginas/dre.html',
  'construcao/paginas/caixa.html',
  'construcao/paginas/faturamento.html',
  'construcao/paginas/aging.html',
  'construcao/paginas/frota.html',
  'construcao/paginas/compras.html',
  'construcao/paginas/comercial.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first: serve do cache; se não tiver, busca na rede e guarda pra próxima vez.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return res;
      }).catch(() => cached);
    })
  );
});
