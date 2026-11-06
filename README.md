# Gestão Tech — site institucional

Site institucional da Gestão Tech, desenvolvido na branch `feat/site-estatico-html-css-js`.

- **Versão estática (atual nesta branch):** HTML5, CSS3 e JavaScript puro (Vanilla JS). Sem build, sem framework e sem dependências de interface. Arquivos principais: `index.html`, `css/style.css`, `js/script.js`.
- **Versão Next.js (preservada):** mantida em `feat/migracao-nextjs` e no histórico do Git.

> Tecnologia que transforma a gestão da sua empresa.

## Como visualizar a prévia (versão estática)

Opção recomendada (servidor local):

```bash
npx --yes serve . -l 4173
```

Acesse `http://localhost:4173`.

Alternativas:

```bash
python -m http.server 8000
```

Também é possível abrir `index.html` diretamente no navegador, mas o servidor local é mais confiável para validação.

## Estrutura

```text
site-gestao-tech/
├── index.html              # Página única (seções institucionais)
├── css/style.css           # Tokens, layout, componentes e responsividade
├── js/script.js            # Navegação, acessibilidade, animações e formulário
├── images/
│   ├── brand/              # Logo e favicon
│   └── site/               # Ilustrações (preservadas no repositório)
├── docs/
│   ├── estrutura-do-site.md
│   └── identidade-visual.md
└── README.md
```

## Seções implementadas

1. **Cabeçalho/navegação:** logo, Início, Sobre nós, Serviços, Soluções, Contato, botão "Fale com a empresa", menu móvel acessível, efeito ao rolar e indicação visual da seção ativa.
2. **Hero:** mensagem principal "Tecnologia que transforma a gestão da sua empresa.", texto complementar, botões "Conheça nossas soluções" e "Fale com um especialista", fundo institucional escuro com elementos gráficos abstratos em CSS e animação de entrada discreta.
3. **Sobre nós:** "Tecnologia com propósito. Gestão com resultados.", com texto institucional sem dados inventados.
4. **Serviços:** 5 categorias em cards com ícones SVG/CSS — Desenvolvimento de sistemas; Sistemas de gestão empresarial; Automação de processos; Soluções personalizadas; Consultoria e suporte tecnológico.
5. **Soluções:** GT Restaurantes (produto existente/publicado no repositório), com link válido `https://gest-o-de-restaurantes.vercel.app/` e **"Consulte valores"** (sem preço não confirmado).
6. **Diferenciais:** "Mais controle. Mais eficiência. Mais resultados." com 6 diferenciais (sem números fictícios).
7. **Contato:** canais válidos preservados (WhatsApp/telefone e horário), formulário com nome, telefone, serviço de interesse e mensagem; integração com WhatsApp preservada e nota transparente sobre tratamento dos dados.

## Funcionalidades preservadas

- Validação do formulário (nome, telefone com DDD 10–11 dígitos, mensagem mínima).
- Máscara de telefone.
- Montagem de mensagem e abertura de `https://wa.me/5561998361296` com `encodeURIComponent`, `target="_blank"` e `rel="noopener noreferrer"`.
- Fallback com link manual quando o pop-up do WhatsApp é bloqueado.
- Menu móvel acessível (`aria-expanded`, `aria-controls`, fechar ao navegar, fechar com `Escape`, ajuste em redimensionamento).
- Ano automático no rodapé.
- Skip link "Pular para o conteúdo".
- Estados de foco visíveis e navegação por teclado.
- Respeito a `prefers-reduced-motion` (revelações/animações reduzidas).

## Identidade visual e design

- Paleta institucional centralizada em variáveis CSS (`:root`): `#115C6B`, `#0C4A56`, `#3BB7A7`, `#E87C3B`, `#FFFFFF`, `#F4F7F8`, `#263238`.
- Tipografia: **Manrope** (títulos) e **Inter** (textos), com fallbacks.
- Design sem protagonismo de fotografias; composição baseada em cores, tipografia, cards, ícones e elementos abstratos.
- Animações discretas: entrada por revelação ao rolar (IntersectionObserver), transições suaves em botões/cards e efeito sutil no cabeçalho.

## Como alterar conteúdo

- **Textos/seções:** editar `index.html`.
- **Cores, espaçamentos, sombras e tempos:** editar variáveis em `css/style.css`.
- **Comportamentos (menu, seção ativa, revelação, formulário/WhatsApp):** editar `js/script.js`.
- **Contato WhatsApp:** número `5561998361296` em `index.html` e `js/script.js`.
- **Soluções SaaS:** manter apenas produtos existentes/identificados; não exibir preços sem confirmação.

## Testes executados (nesta alteração)

Executados localmente com servidor estático (`npx --yes serve . -l 4173`) e verificação automatizada via navegador no ambiente de desenvolvimento:

| Teste | Resultado |
| --- | --- |
| Sintaxe JS (`node --check js/script.js`) | OK |
| Carregamento da página (`http://localhost:4173/`) | OK (HTTP 200) |
| Console do navegador (nível erro) | Sem erros observados na sessão testada |
| Estrutura/seções e links principais (âncoras, WhatsApp, GT Restaurantes, "Consulte valores") | OK |
| Menu móvel (abrir/fechar por clique e `Escape`, atributos ARIA) | OK |
| Indicação de seção ativa (atributos/estado na navegação) | OK (verificado por inspeção de estado no DOM) |
| Revelação de elementos (`.reveal` / `.is-visible`) | OK (elementos visíveis observados) |
| Formulário inválido (mensagens de erro e `aria-invalid`) | OK |
| Formulário válido (URL `wa.me` gerada com `encodeURIComponent` e fallback preparado) | OK |

**Não executados nesta etapa:** validação visual manual completa em múltiplos dispositivos reais, auditorias formais de Lighthouse/WCAG, e suíte automatizada da versão Next.js (esta branch é estática). A `prefers-reduced-motion` está implementada em CSS/JS; recomenda-se validação manual no navegador/sistema.

## Pendências conhecidas

- Domínio definitivo/canonical/OG image absoluta dependem de confirmação (não configurados para evitar URL inventada).
- Não há backend/CRM; envio de contato depende da confirmação do usuário no WhatsApp.
- Ilustrações em `images/site/` permanecem no repositório, mas não são protagonistas no layout redesenhado.
- Recomenda-se revisão visual humana (identidade, contraste percebido e responsividade em dispositivos reais) antes de publicação.

## Publicação

Esta branch **não deve ser mesclada para `main` nem publicada** sem autorização. Antes de qualquer publicação:

1. Confirmar hospedagem/domínio.
2. Validar prévia em ambiente de staging.
3. Revisar acessibilidade, SEO e conteúdo institucional final.
4. Obter autorização explícita para merge/publicação.

## Versão Next.js (preservada)

A migração Next.js permanece preservada fora desta branch. Para trabalhar nela, use `feat/migracao-nextjs` e siga as instruções do README/histórico daquela versão.
