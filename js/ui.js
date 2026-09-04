/* =========================================================
   UI — componentes dos protótipos
   Canvas fixo 1280x720 (proporção da página do Power BI),
   escalado para caber na tela. Sem dependência externa.
   ========================================================= */

const ROOT = () => document.body.dataset.root || '';
const PAGE_ID = () => document.body.dataset.page || 'capa';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const nf = n => Number(n).toLocaleString('pt-BR');
const pc = (n,d) => (n/d*100).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'%';

/* ---------- degradê da página ---------- */
function applyAccent(){
  const id = PAGE_ID();
  const page = PAGES.find(p => p.id === id);
  const cs = getComputedStyle(document.documentElement);
  if(page){
    const g = cs.getPropertyValue(page.grad).trim();
    if(g) document.documentElement.style.setProperty('--g-accent', g);
  }
  const a = ACCENTS[id] || ACCENTS.capa;
  document.documentElement.style.setProperty('--accent', a[0]);
  document.documentElement.style.setProperty('--accent-2', a[1]);
}

/* ---------- escala do canvas ---------- */
function fitCanvas(){
  const c = document.querySelector('.canvas');
  if(!c) return;
  const k = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  c.style.transform = 'scale(' + k + ')';
}

/* ---------- topo ---------- */
function topbarInner(){
  const root = ROOT();
  return `<div class="brand">
      <div class="marca77"><img src="${root}assets/logo-77-horizontal-white.png" alt="77 Indicadores"></div>
      <div class="wordmark">
        <b>77 INDICADORES</b>
        <small>${esc(BRAND.plataforma)}</small>
      </div>
      <div class="sep"></div>
      <div class="mark">${logoSVG(32)}</div>
      <div class="txt">
        <strong>${esc(BRAND.full)}</strong>
        <em>${esc(BRAND.sub)} · ${esc(BRAND.periodo)}</em>
      </div>
    </div>
    <div class="top-actions">
      <span class="tagline"><i class="dot"></i> <b>AO VIVO</b> <span id="relogio">--:--</span></span>
      <span class="tagline">DEMONSTRAÇÃO DE FEIRA</span>
      <button class="tema" id="btnTema" title="Alternar tema claro / escuro" onclick="trocarTema()">🌙</button>
    </div>`;
}

/* ---------- tema claro / escuro ---------- */
function aplicarTema(claro){
  document.body.classList.toggle('claro', claro);
  const b = document.getElementById('btnTema');
  if(b) b.textContent = claro ? '☀️' : '🌙';
  try{ localStorage.setItem('tema77', claro ? 'claro' : 'escuro'); }catch(e){}
}
function trocarTema(){ aplicarTema(!document.body.classList.contains('claro')); }
function temaInicial(){
  let salvo = null;
  try{ salvo = localStorage.getItem('tema77'); }catch(e){}
  aplicarTema(salvo === 'claro');
}

function navInner(){
  const id = PAGE_ID(), root = ROOT();
  return PAGES.map(p =>
    `<a href="${root}${p.file}" class="${p.id===id?'on':''}"><i></i>${esc(p.nav)}</a>`
  ).join('');
}

/* ---------- faixa de título ---------- */
function titleband(eyebrow, title, titleEm, text, chips){
  return `<section class="titleband">
    <div class="tb">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h1>${esc(title)} <em>${esc(titleEm)}</em></h1>
      <p>${esc(text)}</p>
    </div>
    <div class="chips">${(chips||[]).map(c=>`<span class="chip">${esc(c)}</span>`).join('')}</div>
  </section>`;
}

/* ---------- KPIs ---------- */
function kpis(list, five){
  return `<section class="kpis ${five?'five':''}">` + list.map(k => `
    <div class="kbox ${k.c||''}">
      <small>${esc(k.t)}</small>
      <div class="kval"><strong>${esc(k.v)}</strong>${k.d?`<span class="delta ${k.dir||'up'}">${esc(k.d)}</span>`:''}</div>
      <span>${esc(k.s)}</span>
    </div>`).join('') + `</section>`;
}

/* ---------- painel ---------- */
function panel(title, sub, content, opt){
  opt = opt || {};
  return `<section class="panel ${opt.accent?'accent':''} ${opt.cls||''}">
    <div class="phead">
      <div><h2>${esc(title)}</h2>${sub?`<small>${esc(sub)}</small>`:''}</div>
      ${opt.legend?`<div class="legend">${opt.legend}</div>`:''}
    </div>
    <div class="pbody ${opt.center?'center':''}">${content}</div>
  </section>`;
}

function legend(items){
  return items.map(([c,l])=>`<span><i style="background:${c}"></i>${esc(l)}</span>`).join('');
}

/* =========================================================
   GRÁFICOS SVG (SMIL — animam sozinhos, sem biblioteca)
   ========================================================= */
let _uid = 0;
const nextUid = () => 'c' + (++_uid) + '_';

function gradDefs(uid){
  const cs = getComputedStyle(document.documentElement);
  const a = cs.getPropertyValue('--accent').trim() || '#45e594';
  const b = cs.getPropertyValue('--accent-2').trim() || '#12a45f';
  return `<defs>
    <linearGradient id="${uid}bar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/></linearGradient>
    <linearGradient id="${uid}line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${b}"/><stop offset="100%" stop-color="${a}"/></linearGradient>
    <linearGradient id="${uid}area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${a}" stop-opacity=".34"/>
      <stop offset="100%" stop-color="${a}" stop-opacity="0"/></linearGradient>
  </defs>`;
}

/* barras agrupadas: [[label, a, b?], ...] */
function chartBars(data, opt){
  opt = opt || {};
  const uid = nextUid();
  const W = 920, H = opt.height || 330;
  const padL = 54, padR = 14, padT = 24, padB = 30;
  const pw = W-padL-padR, ph = H-padT-padB;
  const dual = data.some(d => d.length > 2 && d[2] != null);
  const max = Math.max(...data.flatMap(d => dual?[d[1],d[2]]:[d[1]])) * 1.14 || 1;
  const gw = pw/data.length;
  const bw = dual ? Math.min(22, gw*0.27) : Math.min(38, gw*0.5);
  const gap = dual ? 5 : 0;

  let grid='', ylab='';
  for(let i=0;i<=4;i++){
    const y = padT + ph - (ph*i/4);
    grid += `<line class="gl" x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}"/>`;
    ylab += `<text class="axis" x="${padL-9}" y="${y+4}" text-anchor="end">${nf(Math.round(max*i/4))}</text>`;
  }

  let bars='';
  data.forEach((d,i)=>{
    const cx = padL + gw*i + gw/2;
    const hA = Math.max(2, ph*d[1]/max), yA = padT+ph-hA;
    const xA = dual ? cx-bw-gap/2 : cx-bw/2;
    bars += `<rect x="${xA}" y="${padT+ph}" width="${bw}" height="0" rx="5" fill="url(#${uid}bar)">
      <animate attributeName="y" from="${padT+ph}" to="${yA}" dur="0.8s" begin="0.15s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/>
      <animate attributeName="height" from="0" to="${hA}" dur="0.8s" begin="0.15s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/></rect>`;
    if(opt.values !== false){
      bars += `<text class="val" x="${xA+bw/2}" y="${yA-7}" text-anchor="middle" opacity="0">${esc(opt.fmt?opt.fmt(d[1]):nf(d[1]))}
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="0.85s" fill="freeze"/></text>`;
    }
    if(dual){
      const hB = Math.max(2, ph*d[2]/max), yB = padT+ph-hB;
      bars += `<rect x="${cx+gap/2}" y="${padT+ph}" width="${bw}" height="0" rx="5" fill="rgba(255,255,255,.14)">
        <animate attributeName="y" from="${padT+ph}" to="${yB}" dur="0.8s" begin="0.28s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/>
        <animate attributeName="height" from="0" to="${hB}" dur="0.8s" begin="0.28s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/></rect>`;
    }
    bars += `<text class="axis" x="${cx}" y="${H-8}" text-anchor="middle">${esc(d[0])}</text>`;
  });

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${gradDefs(uid)}${grid}${ylab}${bars}</svg>`;
}

/* barras horizontais: [[label, valor, sub?], ...] */
function chartHBars(data, opt){
  opt = opt || {};
  const uid = nextUid();
  const W = 920, rowH = opt.rowH || 46, padL = opt.padL || 230, padR = 100;
  const H = data.length*rowH + 10;
  const pw = W-padL-padR;
  const max = Math.max(...data.map(d=>d[1])) || 1;

  let rows='';
  data.forEach((d,i)=>{
    const y = i*rowH + 8;
    const w = Math.max(3, pw*d[1]/max);
    rows += `
    <text class="axis" x="${padL-13}" y="${y+16}" text-anchor="end" style="fill:#dbeee4;font-size:13px;font-weight:600">${esc(d[0])}</text>
    ${d[2]?`<text class="axis" x="${padL-13}" y="${y+30}" text-anchor="end" style="font-size:11px">${esc(d[2])}</text>`:''}
    <rect x="${padL}" y="${y+3}" width="${pw}" height="20" rx="10" fill="rgba(255,255,255,.05)"/>
    <rect x="${padL}" y="${y+3}" width="0" height="20" rx="10" fill="url(#${uid}line)">
      <animate attributeName="width" from="0" to="${w}" dur="0.85s" begin="${0.1+i*0.06}s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/></rect>
    <text class="val" x="${W-padR+12}" y="${y+18}" opacity="0">${esc(opt.fmt?opt.fmt(d[1]):nf(d[1]))}
      <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${0.65+i*0.06}s" fill="freeze"/></text>`;
  });

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${gradDefs(uid)}${rows}</svg>`;
}

/* linha com área: [[label, valor], ...] */
function chartLine(data, opt){
  opt = opt || {};
  const uid = nextUid();
  const W = 920, H = opt.height || 330;
  const padL = 54, padR = 16, padT = 24, padB = 30;
  const pw = W-padL-padR, ph = H-padT-padB;
  const vals = data.map(d=>d[1]);
  const max = Math.max(...vals)*1.1, min = opt.zero===false ? Math.min(...vals)*0.86 : 0;
  const span = (max-min)||1;
  const X = i => padL + (pw*i/Math.max(1,data.length-1));
  const Y = v => padT + ph - (ph*(v-min)/span);

  let grid='', ylab='';
  for(let i=0;i<=4;i++){
    const y = padT + ph - (ph*i/4);
    grid += `<line class="gl" x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}"/>`;
    ylab += `<text class="axis" x="${padL-9}" y="${y+4}" text-anchor="end">${nf(Math.round(min+span*i/4))}</text>`;
  }

  const pts = data.map((d,i)=>`${X(i)},${Y(d[1])}`).join(' ');
  const area = `${padL},${padT+ph} ${pts} ${X(data.length-1)},${padT+ph}`;

  let dots='', xlab='';
  data.forEach((d,i)=>{
    dots += `<circle class="pt" cx="${X(i)}" cy="${Y(d[1])}" r="0">
      <animate attributeName="r" from="0" to="5" dur="0.3s" begin="${0.75+i*0.04}s" fill="freeze"/></circle>`;
    if(i % (opt.every||1) === 0)
      xlab += `<text class="axis" x="${X(i)}" y="${H-8}" text-anchor="middle">${esc(d[0])}</text>`;
  });

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${gradDefs(uid)}${grid}${ylab}
    <polygon points="${area}" fill="url(#${uid}area)" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.45s" fill="freeze"/></polygon>
    <polyline points="${pts}" fill="none" stroke="url(#${uid}line)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"
      stroke-dasharray="3000" stroke-dashoffset="3000">
      <animate attributeName="stroke-dashoffset" from="3000" to="0" dur="1.2s" begin="0.12s" fill="freeze"/></polyline>
    ${dots}${xlab}</svg>`;
}

/* rosca */
function donut(slices, big, small){
  const total = slices.reduce((s,x)=>s+x[2],0) || 1;
  let acc = 0;
  const stops = slices.map(([c,,v])=>{
    const a = acc/total*360, b = (acc+v)/total*360; acc += v;
    return `${c} ${a.toFixed(2)}deg ${b.toFixed(2)}deg`;
  }).join(',');
  const leg = slices.map(([c,l,v])=>`<div><i style="background:${c}"></i>${esc(l)}<b>${nf(v)}</b></div>`).join('');
  return `<div class="donutrow">
    <div class="donut" style="background:conic-gradient(${stops})">
      <div class="mid"><b>${esc(big)}</b><small>${esc(small)}</small></div>
    </div>
    <div class="dleg">${leg}</div></div>`;
}

/* medidor */
function gauge(pct, label, sub){
  const uid = nextUid();
  const len = Math.PI*86;
  const off = len*(1-Math.min(1,pct/100));
  return `<div class="gauge">
    <svg viewBox="0 0 200 116">${gradDefs(uid)}
      <path d="M14 106 A86 86 0 0 1 186 106" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="16" stroke-linecap="round"/>
      <path d="M14 106 A86 86 0 0 1 186 106" fill="none" stroke="url(#${uid}line)" stroke-width="16" stroke-linecap="round"
        stroke-dasharray="${len}" stroke-dashoffset="${len}">
        <animate attributeName="stroke-dashoffset" from="${len}" to="${off}" dur="1.1s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.2 1" keyTimes="0;1"/>
      </path></svg>
    <div class="big">${esc(label)}</div>
    <div class="lbl">${esc(sub)}</div></div>`;
}

/* ---------- listas ---------- */
function rankList(items, compact){
  return `<div class="rank">` + items.map((it,i)=>`
    <div class="rk">
      <div class="pos">${it.n!=null?esc(it.n):(i+1)}</div>
      <div style="min-width:0">
        <b>${esc(it.l)}</b>
        ${it.s?`<small>${esc(it.s)}</small>`:''}
        ${(!compact && it.p!=null)?`<div class="track"><i class="${it.c||''}" style="width:${it.p}%"></i></div>`:''}
      </div>
      <div class="v ${it.c||'good'}">${esc(it.v)}</div>
    </div>`).join('') + `</div>`;
}

/* ---------- positivação: modelo ADL ---------- */
/* card de clientes ativos + 4 faixas de dias sem compra */
function faixasCard(){
  const base = DB.ativos;
  const cards = DB.faixas.map(([,rot,tag,qtd,tom])=>`
    <div class="fx t-${tom}">
      <div class="hd"><b>${esc(rot)}</b><span class="tag">${esc(tag)}</span></div>
      <strong>${nf(qtd)}</strong>
      <span class="p">${pc(qtd,base)}</span>
      <div class="bar"><i style="width:${Math.max(4,qtd/base*100)}%"></i></div>
    </div>`).join('');
  return `<div class="faixas v">${cards}</div>`;
}

/* barra empilhada por curva ABC × faixa de dias sem compra */
function curvaStack(){
  const cores = ['#45e594','#6ea8ff','#ffc45c','#ff7b7b'];
  const rot = DB.faixas.map(f=>f[1].replace(' dias','d').replace('Acima de ','+'));
  return `<div class="curvas">` + DB.curvaFaixa.map(([curva,...b])=>{
    const total = b.reduce((s,x)=>s+x,0);
    const segs = b.map((v,i)=>{
      const w = v/total*100;
      return `<div style="width:${w}%;background:${cores[i]}" title="${esc(rot[i])}: ${nf(v)}">${w>=9?pc(v,total):''}</div>`;
    }).join('');
    const foot = b.map((v,i)=>`<div><b>${esc(rot[i])}</b>${nf(v)} · ${pc(v,total)}</div>`).join('');
    return `<div class="cv">
      <div class="hd"><b>Curva ${esc(curva)}</b><span>${nf(total)} clientes</span></div>
      <div class="cvstack">${segs}</div>
      <div class="cvfoot">${foot}</div>
    </div>`;
  }).join('') + `</div>`;
}

function insights(list){
  return `<div class="insights">` + list.map(x=>`
    <div class="ins ${x.tone||''}">
      <div class="ic">${x.ic||'•'}</div>
      <div><b>${esc(x.t)}</b><p>${esc(x.txt)}</p>${x.act?`<span class="act">${esc(x.act)} →</span>`:''}</div>
    </div>`).join('') + `</div>`;
}

function table(cols, rows, numCols){
  numCols = numCols || [];
  const head = cols.map((c,i)=>`<th class="${numCols.includes(i)?'num':''}">${esc(c)}</th>`).join('');
  const body = rows.map(r=>'<tr>'+r.map((c,i)=>
    Array.isArray(c) ? `<td><span class="pill ${c[0]}">${esc(c[1])}</span></td>`
                     : `<td class="${numCols.includes(i)?'num':''}">${esc(c)}</td>`
  ).join('')+'</tr>').join('');
  return `<table class="tbl"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

/* =========================================================
   NÚMEROS VIVOS — todo valor sobe de 0 até o número real
   e volta a subir de tempos em tempos, para a tela nunca
   parecer parada durante a apresentação.
   ========================================================= */
const ALVOS_NUM = [
  '.kbox strong', '.rk .v', '.fx strong', '.fx .p', '.donut .mid b',
  '.cvstat b', '.rl .tri b', '.gauge .big', '.tbl td.num', '.kbox .delta'
].join(',');

/* separa "R$ 4,28 mi" em prefixo, número e sufixo */
function partesNum(txt){
  const m = String(txt).match(/^([^\d-]*)(-?[\d.]*\d(?:,\d+)?)(.*)$/s);
  if(!m) return null;
  const cru = m[2];
  const dec = cru.includes(',') ? cru.split(',')[1].length : 0;
  const val = parseFloat(cru.replace(/\./g,'').replace(',','.'));
  if(!isFinite(val)) return null;
  return {pre:m[1], val, dec, suf:m[3]};
}

function subirNumero(el, dur){
  const base = el.dataset.numAlvo || el.textContent;
  const p = partesNum(base);
  if(!p) return;
  el.dataset.numAlvo = base;
  const t0 = performance.now();
  dur = dur || 1100;
  const passo = agora => {
    const k = Math.min(1,(agora-t0)/dur), e = 1-Math.pow(1-k,3);
    el.textContent = p.pre +
      (p.val*e).toLocaleString('pt-BR',{minimumFractionDigits:p.dec,maximumFractionDigits:p.dec}) +
      p.suf;
    if(k<1) requestAnimationFrame(passo);
    else el.textContent = base;
  };
  requestAnimationFrame(passo);
}

function animarNumeros(escalonar){
  const els = document.querySelectorAll(ALVOS_NUM);
  els.forEach((el,i)=>{
    if(escalonar) setTimeout(()=>subirNumero(el), Math.min(600, i*22));
    else subirNumero(el);
  });
}

/* barras e trilhas crescem junto */
function animarBarras(){
  document.querySelectorAll('.track i, .fx .bar i, .cvstack div').forEach(el=>{
    const w = el.style.width;
    if(!w) return;
    el.style.width = '0%';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ el.style.width = w; }));
  });
}

function vidaNaTela(){
  animarNumeros(true);
  animarBarras();
  /* a cada 14 s os números sobem de novo — a tela continua viva na feira */
  setInterval(()=>{ animarNumeros(true); animarBarras(); }, 14000);
}

/* =========================================================
   CONVERSA VIVA — mensagem chegando, "digitando..." e os
   dois tiquinhos passando de entregue para lido.
   ========================================================= */
function animarConversa(corpo, opt){
  opt = opt || {};
  const bolhas = [...corpo.querySelectorAll('.bubble')];
  if(!bolhas.length) return;

  const digitando = document.createElement('div');
  digitando.className = 'bubble digitando';
  digitando.innerHTML = '<i></i><i></i><i></i>';

  function rodada(){
    bolhas.forEach(b => b.classList.remove('entrou'));
    digitando.remove();
    let i = 0;

    const proxima = () => {
      if(i >= bolhas.length){
        if(opt.repetir !== false) setTimeout(rodada, 7000);
        return;
      }
      const b = bolhas[i++];
      const daCasa = !b.classList.contains('deles');

      const revelar = () => {
        digitando.remove();
        b.classList.add('entrou');
        corpo.scrollTop = corpo.scrollHeight;
        const ck = b.querySelector('.ck');
        if(ck){
          ck.textContent = '✓';
          ck.classList.remove('lido');
          setTimeout(()=>{ ck.textContent = '✓✓'; }, 650);
          setTimeout(()=>{ ck.classList.add('lido'); }, 1450);
        }
        setTimeout(proxima, daCasa ? 1900 : 1300);
      };

      if(daCasa){
        corpo.insertBefore(digitando, b);
        corpo.scrollTop = corpo.scrollHeight;
        setTimeout(revelar, 950);
      } else {
        revelar();
      }
    };
    proxima();
  }

  rodada();
}

function vidaNasConversas(){
  document.querySelectorAll('.scr-body.wa').forEach(c => animarConversa(c));
}

/* ---------- relógio ---------- */
function startClock(){
  const el = document.getElementById('relogio');
  if(!el) return;
  const p = n => String(n).padStart(2,'0');
  const tick = () => { const d = new Date();
    el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
  tick(); setInterval(tick,1000);
}

/* ---------- monta a página ---------- */
function mountShell(){
  applyAccent();
  const t = document.getElementById('topo'); if(t) t.innerHTML = topbarInner();
  const n = document.getElementById('nav');  if(n) n.innerHTML = navInner();
  temaInicial();
  fitCanvas();
  window.addEventListener('resize', fitCanvas);
  window.addEventListener('orientationchange', () => setTimeout(fitCanvas,150));
  startClock();
  /* roda depois que a página injeta o conteúdo */
  setTimeout(vidaNaTela, 0);
}
