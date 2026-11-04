# Webinar UX e IA

Versão interactiva e animada da apresentação do webinar "UX e IA: da análise de necessidades à criação de soluções",
da TIS, publicada em https://tis-experience.github.io/webinar-ux-e-ia/. Segue o mesmo motor de animação e navegação da
apresentação do Núcleo de Experiência (`tis-experience/nucleo-de-experiencia-nos-projectos`).

A versão de referência continua a ser o deck "Webinar UX e IA (Versão Final)" nos artefactos do Claude; esta é uma
leitura animada do mesmo conteúdo.

## Navegação

- Clique na metade direita do ecrã para avançar e na metade esquerda para recuar. As setas, Page Up/Down e a barra de
  espaço também navegam, e no telemóvel basta deslizar para o lado.
- `F` alterna o ecrã inteiro, `R` ou `Home` volta à capa e `End` vai para o fim.
- `#<passo>` abre um ecrã directamente (por exemplo `#harness`) e `#<passo>-still` mostra-o no estado final, sem
  animações. Os identificadores dos passos estão em `STEPS`, em `src/content.ts`.

## Execução local

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

O resultado é um `dist/index.html` com as fontes e as imagens embutidas, mais a pasta `dist/videos` com os vídeos dos
casos do Tema 2, e funciona aberto directamente no navegador, sem servidor. A publicação no GitHub Pages é feita pelo workflow `.github/workflows/deploy.yml` a cada push
para `main`.

Para ter a apresentação inteira num só ficheiro, com os vídeos embutidos (cerca de 18 MB), para abrir sem internet:

```bash
npm run build:single
```

O resultado fica em `dist/webinar-ux-e-ia.html`.
