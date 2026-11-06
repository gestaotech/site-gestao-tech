# Gestão Tech — site institucional

Site institucional da Gestão Tech, publicado como arquivos estáticos com HTML5, CSS3 e JavaScript puro.

## Publicação na Vercel

A configuração versionada em `vercel.json` define:

- **Framework Preset:** Other (`framework: null`).
- **Build Command:** desativado (`buildCommand: null`).
- **Install Command:** vazio para não instalar dependências npm.
- **Output Directory:** raiz do repositório (`.`).

O ponto de entrada é `index.html`. CSS, JavaScript e recursos são servidos diretamente a partir da raiz.

## Estrutura principal

```text
site-gestao-tech/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── brand/
│   └── site/
├── docs/
└── vercel.json
```

## Visualização local

É possível abrir `index.html` diretamente ou iniciar um servidor HTTP local:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Identidade visual

- Azul-petróleo: `#115C6B`
- Azul profundo: `#0C4A56`
- Verde-água: `#3BB7A7`
- Laranja: `#E87C3B`
- Tipografia: Manrope (títulos) e Inter (textos).

O layout prioriza cores, tipografia, conteúdo, ícones e elementos gráficos abstratos, sem depender de fotografias.

## Funcionalidades

- Navegação responsiva e menu móvel acessível.
- Navegação por âncoras e link para pular ao conteúdo.
- Animações discretas com respeito a `prefers-reduced-motion`.
- Formulário com validação no navegador e preparação de mensagem para WhatsApp.
- Ano automático no rodapé.

## Contato

O formulário prepara uma mensagem para o WhatsApp. O site não possui backend nem armazena os dados enviados.

## Observações de publicação

Esta alteração prepara o repositório para publicação estática na Vercel. A confirmação final depende do novo deploy e da inspeção dos respectivos logs e da URL publicada.
