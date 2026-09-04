# Hub 77 — Protótipos para feira

Conjunto de protótipos navegáveis da plataforma **77 Gestão**, feito para
apresentação presencial em feira de negócios de beleza.

**Funciona 100% offline.** Sem CDN, sem fonte externa, sem servidor.
Basta abrir `index.html` (duplo clique) — inclusive no tablet.

## Como apresentar

1. Copie a pasta inteira para o tablet/notebook.
2. Abra `index.html`.
3. Navegue pelos hiperlinks da capa ou pela barra superior.

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

## Estrutura

```
index.html            capa
paginas/              uma tela por arquivo
css/base.css          design system + tema claro
js/data.js            TODOS os números de demonstração
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
