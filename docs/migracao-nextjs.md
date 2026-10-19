# Migração para Next.js — auditoria, decisões e pendências

## 1. Auditoria (antes da migração)

**Repositório**
- Branch `main`, sincronizada com `origin/main` (commit `f423532`, "atualização visual").
- Não havia `package.json`, lockfile, CI, `vercel.json`, configuração de domínio, analytics nem SEO além de `title` e `description`.
- Arquivos versionados: `index.html`, `css/style.css`, `js/script.js`, `logo.jpeg` e `desktop.ini` (metadado do Windows, não deveria estar no repositório — **não removido**, fora do escopo).

**Conteúdo atual identificado**
- WhatsApp: `(61) 99836-1296` (confirmado pelo cliente).
- Horário: Seg — Sex, 09:00 — 18:00 (mantido).
- E-mail: `contato@gestaotech.com` no HTML atual, `contato@gestaotech.com.br` em versão anterior. **Oculto por decisão do cliente** (todo contato é feito por telefone).
- Produtos: GT Restaurantes (publicado, com preço R$ 99,00 e link `gest-o-de-restaurantes.vercel.app`); GT Gestor, GT Commerce e GT Agenda estavam comentados. **GT Restaurantes mantido; os demais excluídos** por decisão do cliente.
- Métricas sem comprovação encontradas e removidas: "120 projetos ativos" (e, em versões intermediárias, "40 projetos", "98%", "+30 clientes", "+300 projetos", "6 anos").

**Identidade**
- O logo (`logo.jpeg`) usa teal (`#3BB7A7`), azul-petróleo (`#115C6B`), laranja (`#E87C3B`) e âmbar. O CSS anterior usava azul (`#2563EB`), que não correspondia ao logo.
- Símbolo: "G" geométrico, já presente no logo. Reutilizado sem redesenho.

## 2. Decisões de implementação

| Tema | Decisão |
| --- | --- |
| Stack | Next.js 16.4.2 (App Router), React 19.3, TypeScript 5.9 estrito, ESLint 10 |
| Gerenciador | npm (nenhum gerenciador havia sido adotado no repositório) |
| Testes | Vitest 4 + Testing Library + jsdom |
| Renderização | Estática (`○ Static`); sem servidor necessário |
| Fontes | `next/font/google`: Archivo (títulos), Space Grotesk (texto), JetBrains Mono (rótulos) — as mesmas famílias do site anterior |
| Marca | Logo original recortado sem alteração (`public/images/logo-gestao-tech.png`); ícone gerado do símbolo "G" (`src/app/icon.png`) |
| Hero | Título "Tecnologia que gera resultados."; painel "Como podemos ajudar" com links reais. O painel de dados simulado foi removido |
| Produtos | Catálogo tipado; apenas itens com `published: true` aparecem |
| Preços | Oculto enquanto `price.confirmed` for `false` |
| Animações | Revelação ao rolar, desativada com `prefers-reduced-motion`. Faixa animada removida |
| Formulário | Validação controlada, erros associados (`aria-invalid`, `aria-describedby`), foco no primeiro erro, bloqueio de pop-up tratado |
| SEO | Título, descrição, `lang="pt-BR"`, Open Graph e Twitter (sem URL canônica e sem imagem — ver pendências) |

**Itens que o prompt pedia e que não foram implementados:**
- **Sitemap e URL canônica:** dependem do domínio definitivo.
- **Imagem de compartilhamento (Open Graph):** sem domínio, o Next usaria `localhost:3000` nas meta tags de produção. A imagem está em `brand/og-image-1200x630.png` para ativação posterior.

## 3. Verificações executadas (resultados reais)

| Verificação | Comando | Resultado |
| --- | --- | --- |
| Tipos | `npm run typecheck` | Sem erros |
| Lint | `npm run lint` | Sem erros |
| Testes | `npm test` | 5 arquivos, **40 testes aprovados** |
| Build | `npm run build` | Concluído sem avisos; rotas `/`, `/_not-found`, `/icon.png`, `/robots.txt` estáticas |
| Lighthouse (produção) | ferramenta de navegador | Acessibilidade 100, Boas práticas 100, SEO 100 |
| Estrutura da página | verificação no navegador | `lang="pt-BR"`, H1 correto, 5 seções, 23 âncoras internas sem nenhuma quebrada, fontes carregadas, sem rolagem horizontal |
| Responsivo | página de teste com moldura de 390px e 1280px | Menu hambúrguer no celular; duas colunas no desktop |
| Formulário (navegador) | envio pelo próprio formulário | Mensagem de confirmação exibida; WhatsApp aberto com número `5561998361296` e texto codificado corretamente |

**Limitações:**
- O clique feito pela ferramenta de automação no botão não disparou o envio; o envio pelo próprio formulário funcionou. A causa não foi identificada. **Recomenda-se um teste manual de clique** antes da publicação.
- A abertura do menu móvel foi verificada por testes automatizados, não visualmente no navegador.
- Desempenho (Lighthouse) não foi medido nesta execução.

## 4. Pendências (decisão da Gestão Tech)

1. **Domínio definitivo** — necessário para sitemap, URL canônica e imagem de compartilhamento.
2. **Hospedagem** — nenhuma configuração encontrada. Confirmar provedor (ex.: Vercel) e domínio de produção.
3. **GT Restaurantes** — confirmar preço (R$ 99,00) e link. Enquanto não confirmado, o site exibe "Consulte valores".
4. **Lista de itens de Gestão de TI** — a versão mais recente do site não listava itens; mantido assim.
5. **Horário de atendimento** — Seg — Sex, 09:00 — 18:00: confirmar antes de publicar.
6. **Aviso de privacidade** — o formulário mostra um texto curto sobre o uso dos dados. Revisão jurídica necessária; não há página de política no site.
7. **Cores** — extraídas do logo, ainda sem guia de marca aprovado.
8. **Serviços** — "Sistemas de gestão empresarial", "Desenvolvimento de produtos SaaS" e "Consultoria/RPA" foram omitidos da lista por falta de confirmação de oferta.
9. **Arquivo `desktop.ini`** versionado — remover do repositório.
10. **Publicação** — branch `feat/migracao-nextjs` criado localmente. Push e publicação dependem de autorização.

## 5. Como reverter

A versão anterior está preservada em `main` (commit `f423532`). O branch `feat/migracao-nextjs` não altera `main`.
