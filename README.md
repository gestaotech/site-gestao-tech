# Gestão Tech — site institucional

Site institucional da Gestão Tech. 

- **Versão estática (atual nesta branch):** HTML5, CSS3 e JavaScript puro (Vanilla JS). Arquivos em `index.html`, `css/style.css`, `js/script.js`. Não requer build ou Node.js para abrir.
- **Versão Next.js (preservada):** migração para **Next.js 16 (App Router), React 19 e TypeScript** (modo estrito), mantida em `feat/migracao-nextjs` e no histórico do Git.

> Tecnologia que gera resultados.

## Versão estática (HTML/CSS/JS)

**Como abrir:**
- Abrir `index.html` diretamente no navegador (funciona na maioria dos casos).
- Ou servir via servidor HTTP local (recomendado para alguns navegadores): `npx serve .` ou `python -m http.server 8000` e acessar `http://localhost:8000`.

**Arquivos:**
- `index.html` — página única com todas as seções
- `css/style.css` — estilos e tokens
- `js/script.js` — menu, formulário e integração com WhatsApp
- `images/` — logotipos e ilustrações
- `docs/estrutura-do-site.md` — estrutura técnica

**Alterar conteúdo:**
- Textos principais: editar diretamente em `index.html`.
- Cores/tokens: `css/style.css` (`:root`).
- Contato/WhatsApp: número `5561998361296` em `index.html` e `js/script.js`.
- Soluções SaaS: seção "Soluções" em `index.html` (seguir padrão existente). Não exibir preços não confirmados.

**Formulário de contato:**
1. Valida nome (>=2), telefone com DDD (10 ou 11 dígitos), mensagem (>=10).
2. Monta mensagem organizada e codifica para URL.
3. Abre `https://wa.me/5561998361296` em nova aba com proteção `noopener/noreferrer`.
4. Se o pop-up for bloqueado, exibe link alternativo.
5. Os dados não são armazenados neste site.

**Limitações da versão estática:**
- Sem sitemap/Open Graph canônico (domínio definitivo não definido).
- Sem envio para servidor/CRM (apenas redirecionamento ao WhatsApp).

## Versão Next.js (preservada)

**Requisitos**
- Node.js 20.9 ou superior
- npm 10 ou superior

**Instalação e execução**

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:3000
```

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui verificação de tipos) |
| `npm run start` | Serve o build de produção |
| `npm run typecheck` | `tsc --noEmit` (TypeScript estrito) |
| `npm run lint` | ESLint (regras do Next.js e de TypeScript) |
| `npm test` | Testes automatizados (Vitest + Testing Library) |
| `npm run test:watch` | Testes em modo interativo |

Para validar uma mudança antes de publicar, rode nesta ordem:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

## Estrutura

```
brand/                       Logo original, fontes das ilustrações e gerador da marca (não servido)
public/images/               Logos (brand/) e ilustrações (site/)
src/
  app/
    layout.tsx               Layout raiz, idioma pt-BR, fontes e metadados
    page.tsx                 Página inicial (compõe as seções)
    globals.css              Design tokens e estilos globais
    icon.png                 Ícone (símbolo "G")
    robots.ts                robots.txt
    not-found.tsx            Página 404
  components/
    layout/                  Header (cliente) e Footer
    sections/                Hero, About, Services, Solutions, Contact, ContactForm (cliente)
    ui/                      Button, SectionHeader, Reveal (cliente)
  data/
    site.ts                  Nome, navegação, contato e textos institucionais
    services.ts              Serviços oferecidos
    solutions.ts             Catálogo de soluções SaaS
    types.ts                 Tipos do conteúdo
  lib/
    contact.ts               Validação, máscara de telefone e mensagem do WhatsApp
tests/                       Testes automatizados
docs/migracao-nextjs.md      Auditoria, decisões e pendências da migração
```

Componentes são Server Components por padrão. Usam `"use client"` apenas quando precisam de estado ou APIs do navegador: cabeçalho (menu e seção ativa), formulário de contato e revelação de elementos ao rolar.

## Conteúdo

Textos e dados ficam em `src/data/`. Para alterar o conteúdo, não é preciso mexer nos componentes.

- **Contato:** `src/data/site.ts` (`contact`). O contato é feito somente por telefone/WhatsApp; não há e-mail exibido.
- **Soluções:** `src/data/solutions.ts`. Um produto aparece no site apenas com `published: true`. O preço só é exibido com `price.confirmed: true`; caso contrário aparece "Consulte valores".
- **Serviços:** `src/data/services.ts`.

## Identidade visual

Logo, ícones, ilustrações e licenças estão documentados em docs/identidade-visual.md. Os arquivos da marca estão em public/images/brand/ (SVG e PNG) e as ilustrações em public/images/site/ (WebP, com fontes em rand/illustrations/).


As cores foram extraídas do logo oficial e centralizadas em `src/app/globals.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-brand` | `#115C6B` | Cor principal, botões, títulos de destaque |
| `--color-brand-strong` | `#0C4A56` | Estado de hover |
| `--color-brand-teal` | `#3BB7A7` | Detalhes decorativos |
| `--color-brand-orange` | `#E87C3B` | Decorativo (contraste insuficiente para texto pequeno) |
| `--color-brand-orange-text` | `#B4531B` | Textos acentuados curtos |
| `--color-brand-amber` | `#F5A623` | Decorativo; cor de identificação de produtos |

Os códigos ainda não constam de um guia de marca aprovado. Para ajustar, altere apenas as variáveis em `globals.css`.

Todos os pares de texto e controles foram verificados contra o critério WCAG AA (texto ≥ 4,5:1; contornos de campos ≥ 3:1).

## Formulário de contato

1. Valida nome, telefone (DDD obrigatório, 10 ou 11 dígitos) e mensagem.
2. Monta a mensagem no formato do formulário original e codifica a URL com `encodeURIComponent`.
3. Abre `https://wa.me/5561998361296` em nova aba, sem `noopener` durante a chamada, e remove `opener` logo em seguida. Isso permite detectar bloqueio de pop-up.
4. Se o navegador bloquear a janela, exibe um link manual para o WhatsApp.

A página não envia nem armazena os dados. O envio só se completa quando o visitante confirma no WhatsApp.

## Testes

```bash
npm test
```

Cobrem: validação e formatação do telefone, mensagem e URL do WhatsApp, abertura e fechamento do menu (incluindo Escape e foco), comportamento do formulário (erros, envio, bloqueio de pop-up), regras do catálogo, renderização da página, links internos e a ausência de métricas ou e-mail não confirmados.

## Publicação

O projeto gera um build de produção com `npm run build`. Ainda não há configuração de hospedagem no repositório. Antes de publicar:

1. Confirmar o provedor de hospedagem e o domínio definitivo.
2. Rodar a sequência de validação acima.
3. Validar em um ambiente de preview.
4. Só então apontar o domínio de produção.

Para voltar à versão anterior, o HTML/CSS/JS original permanece no histórico do Git (commit `f423532`, branch `main`).

Enquanto o domínio não estiver confirmado, não há sitemap nem imagem de compartilhamento (Open Graph). Ambos dependem da URL definitiva. A pendência está detalhada em `docs/migracao-nextjs.md`.
