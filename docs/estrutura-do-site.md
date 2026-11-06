# Estrutura do site estático (HTML, CSS, JavaScript)

## Contexto

- Branch de trabalho: `feat/site-estatico-html-css-js`.
- Stack: **HTML5, CSS3 e JavaScript puro (Vanilla JS)**.
- Sem React, Next.js, Vue, Angular, TypeScript, bundlers ou dependências de interface.
- A branch `main` não é alterada por este trabalho.

## Decisões de redesign

- **Posicionamento institucional:** layout e textos orientados a credibilidade, clareza, organização e maturidade tecnológica.
- **Sem protagonismo de fotografias:** a composição usa cores, tipografia, espaçamento, cards, ícones SVG/elementos CSS e formas abstratas. Imagens de serviço/banner não são usadas como elementos centrais do layout.
- **Identidade visual:** tokens centralizados em `:root` no `css/style.css`, com paleta institucional (`#115C6B`, `#0C4A56`, `#3BB7A7`, `#E87C3B`, `#FFFFFF`, `#F4F7F8`, `#263238`) e tipografia Manrope (títulos) + Inter (texto), com fallbacks.
- **Conteúdo responsável:** nenhum cliente, parceiro, número, certificação, depoimento, resultado comercial ou dado institucional não confirmado foi inventado. GT Restaurantes é apresentado como solução existente com link válido e **"Consulte valores"**.
- **Contato:** canais válidos preservados. O formulário prepara a mensagem e redireciona ao WhatsApp; o site informa que os dados não são armazenados em banco de dados.

## Arquitetura

```text
site-gestao-tech/
├── index.html        # Página única com estrutura semântica e metadados
├── css/style.css     # Design tokens, componentes, layout e responsividade
├── js/script.js      # Comportamentos acessíveis e integração WhatsApp
├── images/
│   ├── brand/        # Logo e favicon
│   └── site/         # Arquivos preservados no repositório
├── docs/
│   ├── estrutura-do-site.md
│   └── identidade-visual.md
└── README.md
```

## Seções da página

1. **Cabeçalho:** logo, navegação por âncoras (Início, Sobre nós, Serviços, Soluções, Contato), CTA "Fale com a empresa", menu móvel acessível e efeito discreto ao rolar.
2. **Hero:** título institucional, texto complementar, CTAs, fundo azul-petróleo com grid/formas abstratas em CSS e painel gráfico abstrato.
3. **Sobre nós:** apresentação institucional sem métricas ou histórico inventado.
4. **Serviços:** 5 cards com ícone, descrição objetiva e benefício.
5. **Soluções:** GT Restaurantes com categoria, descrição, funcionalidades, benefícios, CTA externo e "Consulte valores".
6. **Diferenciais:** 6 itens objetivos, sem dados numéricos fictícios.
7. **Contato:** formulário (nome, telefone, serviço de interesse, mensagem), validação acessível, transparência sobre tratamento de dados, fallback do WhatsApp e canais válidos.
8. **Rodapé:** navegação, marca e ano automático.

## Comportamentos em `js/script.js`

- Atualização do ano no rodapé.
- Estado visual do cabeçalho ao rolar.
- Menu móvel: abre/fecha por botão, fecha ao clicar em links (mobile), fecha com `Escape` e restaura atributos ARIA.
- **Seção ativa:** links com `data-section` recebem estado ativo por `IntersectionObserver` (com `aria-current="location"`).
- **Revelação ao rolar:** elementos `.reveal` recebem `.is-visible` quando entram na viewport; desativado quando `prefers-reduced-motion: reduce` ou sem suporte a `IntersectionObserver`.
- **Formulário:** validação (nome, telefone 10–11 dígitos, mensagem), máscara de telefone, mensagens de erro com `aria-live`/`aria-invalid`, foco no primeiro campo inválido, geração de URL `wa.me` com `encodeURIComponent`, abertura em nova aba e fallback quando o pop-up é bloqueado.

## Acessibilidade e desempenho

- HTML semântico, `lang="pt-BR"`, hierarquia de headings e labels associados.
- Skip link para conteúdo principal.
- Navegação por teclado e `:focus-visible` consistente.
- Menu com `aria-expanded`/`aria-controls`; erros do formulário anunciáveis.
- `prefers-reduced-motion` respeitado em CSS e JS.
- Fontes carregadas via Google Fonts com `display=swap` e fallbacks do sistema.
- Sem dependências externas de JS/CSS além das fontes.

## SEO

- `title` e `meta description` definidos.
- `meta theme-color` e metadados Open Graph básicos (`og:title`, `og:description`, `og:type`, `og:locale`, `og:site_name`).
- Favicon configurado.
- Canonical/URL absoluta e imagem OG dependem do domínio definitivo (não inventados).

## Prévia local

```bash
npx --yes serve . -l 4173
```

Abrir `http://localhost:4173`.

## Limitações / pendências

- Sem backend/CRM: o contato é concluído no WhatsApp.
- Domínio definitivo pendente para canonical/sitemap/OG absoluto.
- Validação visual e de acessibilidade em dispositivos reais ainda recomendada antes da publicação.
- Arquivos de imagem legados podem permanecer em `images/site/` sem uso central no layout atual.
