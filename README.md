# Hub 77 — Protótipos para feira

Conjunto de protótipos navegáveis da plataforma **77 Gestão**, feito para
apresentação presencial em feira de negócios de beleza.

**Funciona 100% offline.** Sem CDN, sem fonte externa, sem servidor.
Basta abrir `index.html` (duplo clique) — inclusive no tablet.

## Como apresentar

### Opção A — Copiar a pasta (mais simples)
1. Copie a pasta inteira para o tablet/notebook.
2. Abra `index.html`.
3. Navegue pelos hiperlinks da capa ou pela barra superior.

### Opção B — Instalar como app (PWA), pra abrir com um toque
O site também é um **PWA instalável**: cacheia tudo no primeiro acesso e depois
abre com ícone próprio, em tela cheia, **sem internet nenhuma**.

1. Publique este repositório no GitHub Pages (uma vez, com internet).
2. No celular/tablet, abra o link publicado **uma vez, com internet** —
   isso baixa e cacheia todos os arquivos.
3. Android/Chrome: toque em "Adicionar à tela inicial" (aparece sozinho).
   iPhone/Safari: Compartilhar → Adicionar à Tela de Início.
4. Depois de instalado, abre pelo ícone e funciona **sem internet**, inclusive
   em modo avião — ideal pra feira.

> Se trocar qualquer arquivo, suba a versão do cache em
> `service-worker.js` (`CACHE = 'hub77-v2'`, etc.) pra forçar atualização.

Cada tela é um **canvas fixo de 1280 × 720** (a mesma proporção de uma página
de relatório do Power BI), que escala sozinho para caber na tela — sem rolagem.

Botão 🌙 / ☀️ no canto superior direito alterna tema escuro e claro.
A escolha fica salva no aparelho.

## Telas

| Tela | Arquivo | O que mostra |
|---|---|---|
| Capa | `index.html` | Visão do ecossistema e acesso aos protótipos |
| Vendas | `paginas/vendas.html` | Faturamento, mix por categoria, top vendedores |
| Metas & Ranking | `paginas/metas.html` | Meta × realizado, projeção, ranking |
| Positivação I | `paginas/positivacao.html` | Faixas de dias sem compra e curva ABC |
| Positivação II | `paginas/positivacao2.html` | Matriz cliente × linha, com semáforo de recompra |
| Clientes | `paginas/clientes.html` | Curva ABC, maiores contas e risco de perda |
| Produtos & Estoque | `paginas/produtos.html` | Ruptura, giro, capital parado, sugestão de compra |
| Financeiro | `paginas/financeiro.html` | Aging, inadimplência e régua de cobrança |
| Sistema de Cobrança | `paginas/cobranca.html` | Régua automática no WhatsApp com boleto, PIX e acordo |
| App I — Promotoras | `paginas/app1.html` | Agenda, check-in GPS, checklist, leitor de código |
| App II — Representante | `paginas/app2.html` | Carteira, pedido offline, crédito e comissão |
| Relatório WhatsApp | `paginas/relatorios.html` | 11 modelos de relatório automático |

## Construção Civil (`construcao/`)

Segunda vertical do hub, para **construtoras**, montada no modelo dos painéis
de obras do Dash TMK — com os principais indicadores de cada grupo. Abra
`construcao/index.html` (ou o cartão *Construção Civil* na capa do hub).

| Tela | Arquivo | Modelo no Dash TMK | O que mostra |
|---|---|---|---|
| Capa | `construcao/index.html` | — | Carteira, resultado e acesso às telas |
| Resultado de Obras | `construcao/paginas/obras.html` | Obras · Resultado Financeiro | Contrato + aditivo, recebido, a executar, resultado por cidade e obra |
| Saúde da Obra | `construcao/paginas/saude.html` | Cronograma · Saúde / Avanço | Curva S físico-financeira, frentes críticas, previsão de término |
| Orçado × Realizado | `construcao/paginas/orcado.html` | Cronograma · Four Box / Orç. × Real. | Four box de eficiência e desvio insumo a insumo |
| DRE Gerencial | `construcao/paginas/dre.html` | Contábil · DRE | DRE em cascata, margem mensal e receita × custo por empresa |
| Fluxo de Caixa | `construcao/paginas/caixa.html` | Fluxo de Caixa · DFC / E/S | DFC por grupo, entradas × saídas e saldo acumulado |
| Faturamento | `construcao/paginas/faturamento.html` | Faturamento | Mês a mês, público × privado, executado a faturar |
| Aging | `construcao/paginas/aging.html` | Aging | Recebíveis por faixa, por obra e maiores atrasos |
| Frota | `construcao/paginas/frota.html` | Frota | Horas produtivas × meta, manutenção e OS abertas |
| Compras | `construcao/paginas/compras.html` | Compras | Gasto por categoria e altas de preço |
| Comercial | `construcao/paginas/comercial.html` | Comercial · Funil / Contratos | Funil de licitações (leads), conversão e contratos a vencer |

Reaproveita `css/base.css` e `js/ui.js`; o que é próprio de obra fica em
`construcao/css/obra.css` e `construcao/js/obra-ui.js` (curva S, four box,
funil, DRE). Todos os números estão em `construcao/js/data.js`.

**Vértice Engenharia é uma empresa fictícia.** Obras, clientes e valores são
ilustrativos — nenhum dado real da TMK ou de outro cliente.

## Estrutura

```
index.html            capa
paginas/              uma tela por arquivo
css/base.css          design system + tema claro
js/data.js            TODOS os números de demonstração (distribuidora)
construcao/           vertical de construção civil (mesma estrutura)
js/ui.js              gráficos SVG, tabelas, animações
assets/               logo 77
```

## Trocar os dados

Todo número, nome e texto de demonstração está em **`js/data.js`**.
Alterando lá, todas as telas se redesenham sozinhas.

## Aviso

**Bellaria Distribuidora é uma empresa fictícia**, criada apenas para esta
apresentação. Clientes, vendedores, valores e indicadores são ilustrativos e
não representam dados reais de nenhum cliente da 77 Indicadores.
