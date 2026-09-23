/* =========================================================
   UI DE OBRAS — gráficos que só a construção civil usa.
   Complementa js/ui.js (mesmo canvas, mesmas animações).
   ========================================================= */

/* várias linhas no mesmo eixo, com valores nulos quebrando a série.
   series: [{n:'Planejado', c:'#b78cff', v:[...], dash:true}, ...] */
function chartLines(labels, series, opt){
  opt = opt || {};
  const W = 920, H = opt.height || 330;
  const padL = 54, padR = 16, padT = 20, padB = 30;
  const pw = W-padL-padR, ph = H-padT-padB;
  const all = series.flatMap(s => s.v.filter(v => v != null));
  const max = opt.max || Math.max(...all)*1.08 || 1;
  const X = i => padL + pw*i/Math.max(1,labels.length-1);
  const Y = v => padT + ph - ph*v/max;
  const suf = opt.suf || '';

  let grid='', ylab='', xlab='';
  for(let i=0;i<=4;i++){
    const y = padT + ph - ph*i/4;
    grid += `<line class="gl" x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}"/>`;
    ylab += `<text class="axis" x="${padL-9}" y="${y+4}" text-anchor="end">${nf(Math.round(max*i/4))}${suf}</text>`;
  }
  labels.forEach((l,i)=>{
    xlab += `<text class="axis" x="${X(i)}" y="${H-8}" text-anchor="middle">${esc(l)}</text>`;
  });

  /* linha vertical do "hoje" */
  let hoje = '';
  if(opt.hoje != null){
    const x = X(opt.hoje);
    hoje = `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT+ph}" stroke="var(--accent)" stroke-dasharray="4 5" stroke-width="1.5" opacity=".7"/>
      <text class="axis" x="${x+6}" y="${padT+12}" style="font-weight:800;fill:var(--accent)">HOJE</text>`;
  }

  const lines = series.map((s,si)=>{
    const pts = s.v.map((v,i)=> v==null ? null : `${X(i)},${Y(v)}`).filter(Boolean).join(' ');
    const last = s.v.reduce((a,v,i)=> v==null?a:i, 0);
    return `<polyline points="${pts}" fill="none" stroke="${s.c}" stroke-width="${s.w||3.2}" stroke-linecap="round"
        stroke-linejoin="round" ${s.dash?'stroke-dasharray="7 7"':''} opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.7s" begin="${0.1+si*0.25}s" fill="freeze"/></polyline>
      <circle cx="${X(last)}" cy="${Y(s.v[last])}" r="0" fill="${s.c}">
        <animate attributeName="r" from="0" to="5" dur="0.3s" begin="${0.7+si*0.25}s" fill="freeze"/></circle>
      ${s.label===false?'':`<text class="val" x="${X(last)+(last===labels.length-1?-8:8)}" y="${Y(s.v[last])+(s.below?20:-9)}"
        text-anchor="${last===labels.length-1?'end':'start'}" opacity="0" style="fill:${s.c}">${nf(s.v[last])}${suf}
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${0.9+si*0.25}s" fill="freeze"/></text>`}`;
  }).join('');

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${grid}${ylab}${hoje}${lines}${xlab}</svg>`;
}

/* legenda de linhas */
function legendLines(series){
  return series.map(s=>`<span><i style="background:${s.c};${s.dash?'opacity:.6':''}"></i>${esc(s.n)}</span>`).join('');
}

/* four box: avanço físico (x) × consumo do orçamento (y), por etapa.
   Acima da diagonal = gasta mais do que avança. */
function fourBox(points){
  const W = 520, H = 400, pad = 44;
  const pw = W-pad-16, ph = H-pad-16;
  const X = v => pad + pw*v/100, Y = v => 16 + ph - ph*v/100;
  let grid = '';
  for(let i=0;i<=4;i++){
    const v = i*25;
    grid += `<line class="gl" x1="${X(0)}" y1="${Y(v)}" x2="${X(100)}" y2="${Y(v)}"/>
      <text class="axis" x="${pad-8}" y="${Y(v)+4}" text-anchor="end">${v}%</text>
      <text class="axis" x="${X(v)}" y="${H-22}" text-anchor="middle">${v}%</text>`;
  }
  const quad = `
    <polygon points="${X(0)},${Y(0)} ${X(100)},${Y(100)} ${X(0)},${Y(100)}" fill="rgba(255,123,123,.08)"/>
    <polygon points="${X(0)},${Y(0)} ${X(100)},${Y(100)} ${X(100)},${Y(0)}" fill="rgba(69,229,148,.07)"/>
    <line x1="${X(0)}" y1="${Y(0)}" x2="${X(100)}" y2="${Y(100)}" stroke="rgba(255,255,255,.28)" stroke-dasharray="5 6"/>
    <text class="axis" x="${X(4)}" y="${Y(92)}" style="fill:#ffa8a8;font-weight:800">GASTA MAIS DO QUE AVANÇA</text>
    <text class="axis" x="${X(96)}" y="${Y(6)}" text-anchor="end" style="fill:#7dfab8;font-weight:800">AVANÇA MAIS DO QUE GASTA</text>
    <text class="axis" x="${X(50)}" y="${H-4}" text-anchor="middle">avanço físico →</text>
    <text class="axis" transform="translate(12 ${Y(50)}) rotate(-90)" text-anchor="middle">consumo do orçamento →</text>`;
  const dots = points.map(([l,x,y],i)=>{
    const ruim = y - x > 5, bom = x - y > 3;
    const c = ruim ? '#ff7b7b' : bom ? '#45e594' : '#ffc45c';
    return `<circle cx="${X(x)}" cy="${Y(y)}" r="0" fill="${c}" stroke="rgba(0,0,0,.35)" stroke-width="1.5">
        <animate attributeName="r" from="0" to="8" dur="0.35s" begin="${0.2+i*0.07}s" fill="freeze"/></circle>
      <text class="axis" x="${X(x)+(x>80?-11:11)}" y="${Y(y)+4}" text-anchor="${x>80?'end':'start'}" style="font-size:11.5px;font-weight:700" opacity="0">${esc(l)}
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="${0.5+i*0.07}s" fill="freeze"/></text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${quad}${grid}${dots}</svg>`;
}

/* funil de conversão: [[etapa, quantidade], ...] */
function funil(etapas){
  const topo = etapas[0][1];
  return `<div class="funil">` + etapas.map(([l,v],i)=>{
    const w = Math.max(18, v/topo*100);
    const conv = i ? pc(v, etapas[i-1][1]) : '100%';
    return `<div class="fn">
      <div class="fb" style="width:${w}%"><b>${nf(v)}</b></div>
      <div class="fl"><span>${esc(l)}</span><small>${i?conv+' da etapa anterior':'base'}</small></div>
    </div>`;
  }).join('') + `</div>`;
}

/* DRE em cascata: [[linha, valor, %rec, tipo], ...] */
function dreTable(linhas){
  return `<table class="dre">` + linhas.map(([l,v,p,t])=>{
    const neg = v.startsWith('−');
    return `<tr class="${t==='t'?'tot':t==='s'?'sub':''}">
      <td>${esc(l)}</td>
      <td class="num ${neg?'neg':''}">${esc(v)}</td>
      <td class="num pct">${esc(p)}</td></tr>`;
  }).join('') + `</table>`;
}

/* barra de avanço planejado × realizado por frente */
function frentesTable(rows){
  return `<div class="frentes">` + rows.map(([l,peso,plan,real,c])=>`
    <div class="fr">
      <div class="frh"><b>${esc(l)}</b><small>peso ${peso}%</small>
        <span class="pill ${c}">${plan-real>0?'−'+(plan-real)+' p.p.':'em dia'}</span></div>
      <div class="frbar"><i class="pl" style="width:${plan}%"></i><i class="rl2 ${c}" style="width:${real}%"></i></div>
    </div>`).join('') + `</div>`;
}
