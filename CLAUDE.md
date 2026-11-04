# Webinar UX e IA

Versão interactiva do deck do webinar "UX e IA: da análise de necessidades à criação de soluções", da TIS, publicada
em https://tis-experience.github.io/webinar-ux-e-ia/. O deck de referência é o "Webinar UX e IA (Versão Final)" nos
artefactos do Claude; esta versão não o substitui. Por ser um site, não tem notas do orador: essas ficam só no deck. O motor (palco 1920×1080, cursor, `fx.tsx`, navegação) veio da
apresentação do Núcleo de Experiência, no repositório `nucleo-de-experiencia-nos-projectos`.

## Regras de escrita

Valem para qualquer texto: textos dos slides, documentação, commits e comentários de código.

- Português de Portugal na grafia usada na TIS (pré-Acordo: "projecto", "actual", "equipa", "ecrã", "utilizador").
- Nunca usar travessão (nem "—" nem "–"). Usar ponto, vírgula, dois-pontos ou parênteses.
- Prosa contínua, com vírgulas e orações subordinadas. Evitar frases curtas justapostas, que soam a slogan.
- Sem floreio, sem anunciar o que se vai dizer e sem a construção "isto e não aquilo".

## Estrutura

- `src/content.ts`: todos os textos e dados e a ordem dos ecrãs em `STEPS` (cada passo diz a cena que o mostra). Passos seguidos com a mesma cena não trocam de ecrã: a cena evolui (processo, harness, perguntas).
- `src/scenes.tsx`: as cenas. `src/App.tsx`: palco, navegação, teclado, cursor e ecrã inteiro.
- `src/fx.tsx`: ajudantes de animação. Todos os atrasos passam por `PACE` (0,5), por isso um atraso escrito como 2
  dura 1 s. As durações não são escaladas.
- `src/styles.css`: todos os estilos, com o prefixo `w-`.
- `src/assets`: fontes Bronkoh, fotos dos oradores e a captura da documentação do Design System, já em WebP e na
  dimensão em que aparecem. `src/assets/sara` tem as imagens do Tema 2 (casos Somos TIS, Jardim da Luma e Cleo),
  tiradas do deck do bloco da Sara.
- `public/videos`: os vídeos dos casos, em H.264. Ficam fora do `index.html` (seriam dezenas de MB embutidos) e são
  copiados para `dist/videos`; ao publicar o artefacto, enviam-se com o mesmo caminho. Os três sem som passam sozinhos
  e em ciclo; o da Cleo tem som e começa com um clique.

## Tema 2

O bloco da Sara Guerreiro ("Da prototipagem ao produto") vai do passo `tema-2` a `para-levar`. As perguntas do
moderador são ecrãs de título do assunto (cena `topico`, textos em `TOPICS`): fundo azul-escuro `#143b8b`, aspas azuis
antes da pergunta e o logótipo branco no rodapé, sem o símbolo grande das capas. Os textos seguem o deck que
a Sara enviou, passados para a grafia pré-Acordo e para as regras de escrita acima.

## Direcção visual e animação

- Capa minimalista: fundo azul liso `#0b2aa8` e o símbolo da TIS em `#4f9cf9`, sem imagem de fundo. Nas capas
  internas o símbolo é sólido, num tom mais escuro do próprio fundo, nunca um claro translúcido.
- Os movimentos contínuos (marcadores do processo, órbita, ficheiros do zero handoff) são lentos e arrancam logo que
  o ecrã aparece. Evitar SMIL com `begin` muito negativo, que no Chrome fica parado vários segundos: nesses casos as
  posições são calculadas em JavaScript (`OrbitDots`, `SolidArrow`).
- Entradas que crescem para os lados abrem sempre da esquerda para a direita, e duas peças paralelas entram da mesma
  forma.
- Traços que se desenham usam `draw` (em `fx.tsx`), que os mantém invisíveis até começarem: com pontas redondas, um
  traço de comprimento zero aparece como um ponto. Pontas de seta, pontos finais e anéis só aparecem quando o traço
  que os leva acaba de se desenhar.
- Ao mudar de ecrã, nada pode voltar para trás à vista: elementos que reiniciam são montados de novo (ver o `key` do
  marcador do processo).

## Verificação

`npm run build` e abrir `dist/index.html#<passo>` (ou `#<passo>-still`) no navegador. Para capturas, o Playwright
abre o ficheiro directamente, sem servidor.
