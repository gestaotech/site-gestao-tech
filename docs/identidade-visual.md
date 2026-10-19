# Identidade visual — Gestão Tech

**Assinatura:** "Tecnologia que gera resultados."

**Status:** proposta para aprovação. A logo, a paleta e as ilustrações foram aplicadas ao site, mas ainda não constituem um manual de marca aprovado pela Gestão Tech.

## 1. Logo

### Conceito

Um **G geométrico** construído a partir de um arco de 320° (espessura 14 em uma caixa de 100 × 100), uma barra horizontal que encerra o arco à direita e um **nó** no ponto em que o arco começa. O nó é o elemento tecnológico: lembra um terminal de conexão, reforçando a ideia de sistemas integrados.

Construção (caixa 100 × 100):
- Arco: centro (50, 50), raio 37, traço 14, de −45° a 0°, sentido anti-horário.
- Barra: retângulo x 50, y 43, largura 37, altura 14.
- Nó: círculo em (76,16; 23,84), raio 8.

O nome "Gestão Tech" foi convertido em curvas (contornos) com a fonte Archivo ExtraBold, para que a logo não dependa de fontes instaladas no computador de quem a usa.

### Arquivos (`public/images/brand/`)

| Arquivo | Uso |
| --- | --- |
| `logo-gestao-tech-dark.svg` | Horizontal, fundo escuro (rodapé) |
| `logo-gestao-tech-mono.svg` | Horizontal, uma cor (impressão, carimbos, fax) |
| `logo-gestao-tech-vertical.svg` | Símbolo acima do nome, com assinatura, fundo claro |
| `logo-gestao-tech-vertical-dark.svg` | Versão vertical para fundo escuro |
| `logo-gestao-tech-icon.svg` | Símbolo isolado, fundo claro (compacta) |
| `logo-gestao-tech-icon-dark.svg` | Símbolo isolado, fundo escuro |
| `logo-gestao-tech-icon.png` | Símbolo 512 × 512, fundo transparente |
| `favicon.png` | 48 × 48, fundo transparente |

Ícones de aplicação gerados a partir do símbolo:
- `src/app/icon.png` (512 × 512, transparente) — ícone do site.
- `src/app/apple-icon.png` (180 × 180, fundo branco) — ícone de tela inicial no iOS.

**Cabeçalho:** usa `logo-horizontal.svg`, enviada pela Gestão Tech (origem: `brand/logo-horizontal.svg`). Este arquivo **não foi gerado pelo gerador da marca** e tem pontos pendentes:
- O nome está como texto vivo, com fonte Inter/Arial, que não está embutida. Sem essa fonte, a aparência muda entre dispositivos. Recomenda-se converter para curvas.
- O símbolo usa azul e degradê (`#53B1FD` a `#175CD3`), fora da paleta proposta neste documento. Se a identidade azul for a oficial, a paleta do site precisa ser revista.
- O arquivo se descreve como "conceitual". Confirmar se é a versão final.

### Regras de uso

- Área de respiro mínima igual à altura do "G" em todos os lados.
- Altura mínima recomendada: 28 px na tela; 12 mm na impressão.
- Não distorcer, girar, aplicar sombra ou contorno.
- Em fundos com fotos ou cores intermediárias, usar a versão mono ou a versão escura sobre área sólida.
- A versão original em JPEG (`brand/logo.jpeg`) é mantida como referência histórica e não é mais usada no site.

## 2. Paleta

| Token | Cor | Uso | Contraste sobre branco |
| --- | --- | --- | --- |
| `--color-brand` | `#115C6B` | Cor principal, botões, destaques | 7,59 : 1 |
| `--color-brand-strong` | `#0C4A56` | Hover e estados de destaque | 9,86 : 1 |
| `--color-brand-teal` | `#3BB7A7` | Acentos e detalhes decorativos | 2,47 : 1 (somente decorativo) |
| `--color-brand-orange` | `#E87C3B` | Nó da logo e destaques pontuais | 2,85 : 1 (somente decorativo ou texto grande) |
| `--color-brand-orange-text` | `#B4531B` | Textos acentuados curtos | 5,01 : 1 |
| `--color-ink` | `#13232A` | Texto principal | 16,13 : 1 |
| `--color-muted` | `#4A5B63` | Texto secundário | 7,08 : 1 |
| `--color-surface-deep` | `#0F2F37` | Fundos escuros | — |

Regras:
- Textos pequenos nunca usam teal ou laranja; esses tons são decorativos.
- Foco visível: contorno de 3 px em `--color-focus` (`#0C4A56`), com contraste de 9,86 : 1.
- Contorno de campos de formulário: `#5F7A80` (4,58 : 1, acima do mínimo de 3 : 1 para controles).
- Os valores estão centralizados em `src/app/globals.css`.

## 3. Ilustrações (`public/images/site/`)

Quatro ilustrações vetoriais originais, criadas para este projeto com formas geométricas e a paleta da marca. Os arquivos-fonte SVG estão em `brand/illustrations/`.

| Arquivo | Onde é usada | Conteúdo |
| --- | --- | --- |
| `banner-principal.webp` (1600 × 900) | Hero da página inicial | Mesa de trabalho com notebook |
| `desenvolvimento-web.webp` (1280 × 800) | Serviço "Desenvolvimento Web" | Monitor com janela de navegador genérica |
| `infraestrutura-integracao.webp` (1280 × 800) | Serviço "Gestão de TI" | Servidores em rack conectados a nós |
| `gestao-automacao.webp` (1280 × 800) | Serviço "Automação de Processos" | Painel com gráficos abstratos e fluxo de etapas |

Nenhuma ilustração exibe dados, números, textos legíveis, marcas de terceiros ou telas que se pareçam com produtos reais.

O cartão do GT Restaurantes não tem imagem por decisão da Gestão Tech.

**Limitação:** não foram produzidas fotografias. As ilustrações são vetoriais. Fotografias reais de equipe, escritório ou clientes exigem fotógrafo ou banco de imagens licenciado (ver pendências).

## 4. Ícones

Biblioteca: **lucide-react** (licença ISC, permite uso comercial). Traço 1,75 e tamanho 22 px, para manter estilo único.

Ícones em uso: `Code` (desenvolvimento), `Server` (gestão de TI), `Workflow` (automação), `MessageCircle` (WhatsApp), `Clock` (horário de atendimento).

Ícones de segurança, atendimento, SaaS e integração não foram adicionados porque ainda não são usados no site.

## 5. Tipografia

| Família | Uso | Licença |
| --- | --- | --- |
| Archivo (800 e 900) | Títulos e nome da marca | SIL Open Font License 1.1 |
| Space Grotesk | Texto corrido e interface | SIL Open Font License 1.1 |
| JetBrains Mono | Rótulos e etiquetas | SIL Open Font License 1.1 |

As fontes são carregadas pelo `next/font/google`, que as hospeda junto com o site no momento do build (nenhuma requisição ao Google pelo navegador do visitante).

## 6. Recursos de terceiros

| Recurso | Origem | Licença | Observação |
| --- | --- | --- | --- |
| lucide-react | npm | ISC | Ícones de linha |
| Archivo, Space Grotesk, JetBrains Mono | Google Fonts | OFL 1.1 | Fontes |
| opentype.js | npm | MIT | Somente no gerador da logo (`brand/tools/`) |
| sharp | npm | Apache-2.0 | Somente no gerador da logo (conversão de imagens) |

Nenhuma imagem de terceiros foi utilizada. Ilustrações e logo são originais deste projeto.

## 7. Como regenerar os recursos da marca

```bash
npm install --no-save opentype.js sharp @fontsource/archivo @fontsource/space-grotesk
node brand/tools/generate-brand.mjs
```

Os SVGs em `public/images/brand/` são a fonte de verdade. Ajustes manuais devem ser feitos neles, ou o gerador deve ser atualizado para que o resultado seja reproduzível.

## 8. Pendências que dependem de aprovação

1. Aprovação da nova logo (o site anterior usava o logo JPEG original). Se a marca original for mantida, basta trocar os arquivos em `public/images/brand/`.
2. Aprovação da paleta. Os valores são uma proposta com base no logo.
3. Fotografias reais, se a Gestão Tech quiser imagens fotográficas em vez de ilustrações.
4. Aprovação do uso das ilustrações nas seções do site.
5. Revisão jurídica do registro da marca (não verificada nesta execução; não há busca de anterioridade).
