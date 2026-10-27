# Estrutura do site estático (HTML, CSS, JavaScript)

## Decisões
- Versão estática, sem Next.js/React/TypeScript. Funciona abrindo `index.html` diretamente ou via servidor HTTP local.
- Baseada na versão Next.js com identidade visual já padronizada.
- Logo copiada para `images/brand/logo-gestao-tech.svg` (mesma utilizada no cabeçalho/rodapé).
- Ilustrações copiadas de `public/images/site/*.webp`.
- Favicon copiado de `public/images/brand/favicon.png`.
- Fontes carregadas via Google Fonts (Manrope 600/700, Inter 400/500/600) com fallbacks de sistema.
- Formulário gera mensagem para `https://wa.me/5561998361296` e abre em nova aba, com proteção contra `opener`. Exibe link alternativo caso o pop-up seja bloqueado.
- Não exibe preço do GT Restaurantes; apresenta "Consulte valores".
- `prefers-reduced-motion` respeitado.
- Sem dependências de build.

## Arquitetura
```
site-gestao-tech/
├── index.html        # Página única com todas as seções
├── css/style.css     # Tokens, estilos e responsividade
├── js/script.js      # Menu, validação do formulário, WhatsApp, ano no rodapé
├── images/brand/     # Logos e favicon
├── images/site/      # Ilustrações
└── docs/             # Documentação
```

## Funcionalidades
- Navegação por âncoras
- Menu móvel acessível (aria-expanded, Escape, foco restaurado)
- Formulário com validação nativa, mensagens de erro acessíveis
- Máscara simples de telefone brasileiro
- Atualização automática do ano no rodapé
- Link "Pular para o conteúdo"
- Foco visível
