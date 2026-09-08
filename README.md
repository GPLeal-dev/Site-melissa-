# Melissa Yumi Okuno — Método Massoterapia

Landing page estática, responsiva e bilíngue (português/japonês) para apresentar atendimentos domiciliares de bem-estar e converter visitantes em contatos pelo WhatsApp.

O projeto não usa React, Vue, Angular, bundler ou framework. Basta publicar os arquivos como estão em qualquer hospedagem estática, inclusive o GitHub Pages.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 responsivo, com animações discretas e suporte a `prefers-reduced-motion`
- JavaScript puro
- `localStorage` para preferência de idioma, tema visual e identificador anônimo do navegador
- Supabase opcional para visualizações e cliques no WhatsApp
- Imagens WebP otimizadas

## Estrutura das pastas

```text
melissa-yumi-okuno-site/
├── index.html
├── README.md
├── IMAGE-PROMPTS.md
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       ├── logo-melissa.jpeg
│       ├── hero-melissa.webp
│       ├── massagem-relaxante.webp
│       ├── drenagem-linfatica.webp
│       ├── massagem-modeladora.webp
│       ├── massagem-desportiva.webp
│       ├── massagem-terapeutica.webp
│       ├── cone-hindu.webp
│       ├── massagem-velas.webp
│       ├── alivio-tensoes.webp
│       └── relaxamento-facial.webp
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── translations.js
│   ├── analytics.js
│   └── main.js
└── supabase/
    └── schema.sql
```

## Personalização rápida

Estes são os pontos que provavelmente serão alterados primeiro:

| O que alterar | Arquivo | Onde procurar |
|---|---|---|
| WhatsApp | `js/config.js` | `whatsapp` e `whatsappDisplay` |
| Dias e horários | `js/config.js` | `schedule` |
| Instagram futuro | `js/config.js` | `instagram` e `instagramEnabled` |
| Supabase | `js/config.js` | `supabase.projectUrl` e `supabase.anonKey` |
| Exibir/ocultar contador | `js/config.js` | `showVisitorCounter` |
| Textos em português e japonês | `js/translations.js` | blocos `pt` e `ja` |
| Texto provisório sobre Melissa | `js/translations.js` | `about.lead`, `about.text` e `about.quote` |
| Formas de pagamento | `js/translations.js` | `faq.q6.a` nos dois idiomas |
| Cores e fontes | `css/style.css` | variáveis no início de `:root` |
| Logo oficial | `assets/images/logo-melissa.jpeg` | header, seção sobre e rodapé |
| SEO, canonical e Open Graph | `index.html` | conteúdo de `<head>` |
| Domínio do sitemap | `sitemap.xml` e `robots.txt` | `seu-dominio.com.br` |

## Identidade visual

A identidade do site parte da logo oficial **Melissa Okuno — Método Massoterapia**. O tema claro combina creme quente, rosa salmão, dourado e marrom; o tema escuro usa carvão, ameixa, rosa queimado, dourado e off-white. As cores estão centralizadas nos blocos `:root` e `[data-theme="dark"]`, no início de `css/style.css`.

## Tema claro e escuro

O botão circular no header alterna entre os temas claro e escuro e atualiza também a cor da interface do navegador em dispositivos compatíveis. A escolha é salva no `localStorage` com a chave `melissa_theme`.

No primeiro acesso, quando ainda não existe uma escolha salva, o site respeita `prefers-color-scheme`. Para mudar a paleta, edite somente os design tokens no início de `css/style.css`. A lógica reutilizável do seletor está em `js/main.js`, nas funções `getPreferredTheme()`, `applyTheme()`, `toggleTheme()`, `updateThemeButton()` e `updateMetaThemeColor()`.

## Logo

A logo oficial está em `assets/images/logo-melissa.jpeg` e aparece no header, como selo discreto na seção sobre Melissa e no rodapé. Para substituí-la futuramente, mantenha o mesmo nome de arquivo e uma imagem quadrada. O CSS preserva a proporção com `object-fit: contain` e mantém um fundo creme próprio para a logo continuar legível no tema escuro.

## Como abrir o site localmente

### Opção simples

Dê dois cliques em `index.html`. A página, o menu, os modais, a tradução e o WhatsApp funcionam diretamente como arquivo local.

### Opção recomendada para testar o Supabase

Abra um terminal dentro da pasta do projeto e execute:

```bash
python -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. Se Python não estiver instalado, a extensão Live Server do VS Code também funciona.

## WhatsApp

O telefone atual é **(41) 9684-1738** e está centralizado em `js/config.js`:

```js
whatsapp: "554196841738",
whatsappDisplay: "(41) 9684-1738"
```

Para trocar o telefone, altere somente esses dois valores. O formato interno precisa ser:

```text
código do país + DDD + telefone
```

Não use `+`, espaços, parênteses ou hífens no campo `whatsapp`.

Todos os botões usam a mesma função `openWhatsApp(serviceId, source)` em `js/main.js`. A mensagem é montada com `encodeURIComponent()` e muda automaticamente quando o botão pertence a um procedimento específico. Os textos das mensagens ficam em `js/translations.js`, dentro de `whatsapp.general` e `whatsapp.service`.

## Como alterar horários

Edite o bloco `schedule` em `js/config.js`. Atualize as versões `pt` e `ja` para que hero, seção de horários, FAQ, contato e rodapé permaneçam consistentes.

## Como alterar textos

Os principais textos visíveis estão em `js/translations.js`. Cada elemento do HTML aponta para uma chave por meio de `data-i18n`, por exemplo:

```html
<h2 data-i18n="procedures.title">...</h2>
```

```js
procedures: {
  title: "Encontre o cuidado ideal para o seu momento."
}
```

Mantenha a mesma estrutura de chaves em `pt` e `ja`.

### Texto sobre Melissa

As informações de formação, cursos, certificações e experiência não foram fornecidas; por isso nada foi inventado. O texto atual é propositalmente institucional e provisório. Edite:

- `about.lead`
- `about.text`
- `about.quote`

nos dois idiomas em `js/translations.js`.

### Formas de pagamento

A resposta do FAQ é um placeholder. Quando as formas oficiais forem definidas, procure por `faq.q6.a` em português e japonês.

## Como alterar procedimentos

Cada card fica na seção `<!-- PROCEDIMENTOS -->` de `index.html`. O conteúdo detalhado do modal fica em `services` dentro de `js/translations.js`.

Os nomes internos usados atualmente são:

- `relaxing`
- `drainage`
- `shaping`
- `sports`
- `therapies`
- `cone`
- `candle`
- `facial` (mensagem de WhatsApp da seção complementar)

O mapa entre procedimento e imagem fica em `serviceImages`, no início de `js/main.js`.

## Como adicionar um novo procedimento

1. Copie um `<article class="procedure-card">` existente em `index.html`.
2. Escolha uma chave interna sem espaços, como `quickMassage`.
3. Use essa chave em `data-service="quickMassage"` nos dois botões.
4. Adicione o texto completo em `services.quickMassage` nos blocos `pt` e `ja` de `js/translations.js`.
5. Adicione a imagem correspondente no objeto `serviceImages` de `js/main.js`.
6. Use um `data-source` curto no link de WhatsApp, como `massagem_rapida`, para facilitar as métricas.
7. Confirme que a imagem possui `width`, `height`, `loading="lazy"` e texto alternativo nos dois idiomas.

## Como substituir imagens

Coloque a nova imagem em `assets/images/` e mantenha o nome usado no HTML ou atualize o caminho correspondente.

Recomendações:

- use WebP;
- hero com aproximadamente 1600 a 2000 px de largura;
- cards com aproximadamente 1200 × 900 px;
- evite arquivos maiores que 300 KB quando possível;
- mantenha o ponto principal da foto afastado das bordas;
- não aplique `loading="lazy"` à imagem do hero;
- mantenha `width` e `height` nas imagens para reduzir mudanças de layout.

Os prompts usados para as imagens originais estão documentados em `IMAGE-PROMPTS.md`.

## Tradução japonesa

O idioma é trocado em JavaScript e a escolha é salva como `language` no `localStorage`. Quando não há preferência salva e o navegador está configurado em japonês, a página abre em japonês; nos demais casos, abre em português.

Para editar o japonês, altere somente o bloco `ja` de `js/translations.js`. Não apague chaves existentes. Os textos de horário também possuem versões japonesas no bloco `schedule.ja` de `js/config.js`.

## Como adicionar outro idioma

1. Copie todo o objeto `pt` dentro de `window.TRANSLATIONS`.
2. Renomeie a chave, por exemplo, para `en`.
3. Traduza todos os valores sem alterar a estrutura.
4. Adicione os formatos de horário em `SITE_CONFIG.schedule.en`.
5. Adicione um botão com `data-language="en"` nos seletores de idioma de `index.html`.
6. Em `getInitialLanguage()` de `js/main.js`, inclua a nova regra de detecção se desejar.
7. Em `setLanguage()`, ajuste o código aplicado a `document.documentElement.lang` e o locale do Open Graph.

## Como ativar o Instagram futuramente

Não há link falso no site. Quando Melissa criar o perfil, edite `js/config.js`:

```js
instagram: "https://www.instagram.com/perfil-oficial/",
instagramEnabled: true,
```

O link preparado no rodapé será exibido automaticamente.

## Como trocar cores

Altere as variáveis no topo de `css/style.css`:

```css
:root {
  --bg-primary: #fff9f4;
  --surface: #fffdf9;
  --salmon: #d88f7b;
  --gold: #886422;
  --text-primary: #342925;
}

[data-theme="dark"] {
  --bg-primary: #181519;
  --surface: #2a242c;
  --salmon: #bd777e;
  --gold: #c6a45f;
  --text-primary: #f5eeea;
}
```

Depois, verifique contraste de textos, botões, foco de teclado e legibilidade sobre as imagens.

## Como alterar fontes

As fontes atuais são Cormorant Garamond para títulos e Inter para textos, carregadas no `<head>` de `index.html`. Para trocar:

1. altere o link do Google Fonts em `index.html`;
2. altere `--font-display` e `--font-body` em `css/style.css`;
3. mantenha as fontes de sistema como fallback, especialmente para o japonês.

Sem conexão, o site continua legível usando as fontes de sistema.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o endereço informado pelo GitHub.
7. Atualize `canonical`, `og:url`, `robots.txt` e `sitemap.xml` com a URL real.

Todos os caminhos do projeto são relativos, portanto funcionam em páginas de projeto como `usuario.github.io/nome-do-repositorio/`.

## Como conectar um domínio próprio

1. Cadastre o domínio no painel do GitHub Pages.
2. Siga os registros DNS indicados pelo GitHub.
3. Marque **Enforce HTTPS** quando estiver disponível.
4. Troque `https://seu-dominio.com.br/` pelo domínio real em:
   - `index.html` (`canonical` e `og:url`);
   - `robots.txt`;
   - `sitemap.xml`.
5. Opcionalmente, adicione um arquivo `CNAME` na raiz com o domínio, conforme a documentação atual do GitHub Pages.

## SEO

O site já contém:

- `<title>` e meta description;
- canonical preparado;
- Open Graph e Twitter Card básicos;
- favicon;
- HTML semântico e hierarquia de títulos;
- dados estruturados `ProfessionalService` criados em JavaScript com o telefone centralizado;
- `robots.txt`;
- `sitemap.xml`.

Antes da publicação definitiva, substitua todas as ocorrências de `seu-dominio.com.br`. Como nenhuma imagem social específica foi fornecida, o projeto não inventa um `og:image`; ele pode ser adicionado futuramente quando houver uma arte oficial.

## Estatísticas de acesso

O Supabase é opcional. Sem configuração, `analytics.js` registra apenas um aviso no console, mantém o contador oculto e não interfere no restante do site.

Quando configurado, o site registra:

- visualizações totais (`page_view`), incluindo recarregamentos;
- visitantes aproximados por navegador/dispositivo;
- cliques em botões do WhatsApp;
- origem do botão;
- procedimento relacionado, quando houver.

### Visualizações x visitantes

Cada carregamento conta como uma visualização. Para visitantes, o navegador recebe um UUID aleatório salvo em `localStorage` como `melissa_visitor_id`. Isso é apenas uma estimativa de navegadores/dispositivos diferentes, não de pessoas únicas:

- celular e computador podem contar como dois visitantes;
- ao apagar os dados do navegador, a pessoa poderá ser contabilizada novamente;
- não há fingerprinting.

### Privacidade

O contador não coleta nome, telefone, CPF, localização precisa, mensagens, cookies invasivos ou impressão digital do dispositivo. São registrados apenas UUID aleatório, página, data/hora, origem do clique e procedimento relacionado.

### Configuração do Supabase

1. Crie uma conta gratuita no Supabase.
2. Crie um projeto.
3. Abra **SQL Editor**.
4. Copie e execute todo o conteúdo de `supabase/schema.sql`.
5. Abra **Project Settings → API** (a localização pode variar no painel).
6. Copie o **Project URL**.
7. Copie a chave pública **anon** ou **publishable**.
8. Preencha `js/config.js`:

```js
supabase: {
  projectUrl: "https://SEU-PROJETO.supabase.co",
  anonKey: "SUA_CHAVE_PUBLICA"
}
```

9. Teste por um servidor local e confirme as chamadas no console/rede do navegador.
10. Publique no GitHub Pages e faça um novo teste.

**Nunca coloque a `service_role key` no JavaScript público.** Somente a chave pública anon/publishable deve aparecer no frontend.

### Segurança e Row Level Security

O script SQL mantém RLS ativado e remove acesso direto às tabelas para `anon` e `authenticated`. O navegador recebe permissão apenas para executar duas funções limitadas:

- `record_page_view`;
- `record_whatsapp_click`.

Essas funções validam e limitam o tamanho dos campos e não permitem excluir registros, listar dados administrativos ou alterar a estrutura do banco.

### Consultar os dados

Use o SQL Editor do Supabase.

Visualizações totais:

```sql
select count(*) as visualizacoes
from public.site_events
where event_type = 'page_view';
```

Visitantes aproximados:

```sql
select count(*) as visitantes_aproximados
from public.site_visitors;
```

Cliques no WhatsApp:

```sql
select count(*) as cliques_whatsapp
from public.site_events
where event_type = 'whatsapp_click';
```

Procedimentos com mais interesse:

```sql
select service, count(*) as cliques
from public.site_events
where event_type = 'whatsapp_click'
  and service is not null
group by service
order by cliques desc;
```

Origem dos cliques:

```sql
select source, count(*) as cliques
from public.site_events
where event_type = 'whatsapp_click'
group by source
order by cliques desc;
```

Taxa aproximada de conversão:

```sql
select round(
  100.0 * count(*) filter (where event_type = 'whatsapp_click')
  / nullif(count(*) filter (where event_type = 'page_view'), 0),
  2
) as taxa_percentual
from public.site_events;
```

### Como zerar as estatísticas

No SQL Editor, execute conscientemente:

```sql
truncate table public.site_events, public.site_visitors restart identity;
```

Essa ação apaga definitivamente as estatísticas armazenadas.

### Como esconder o contador público

Em `js/config.js`, altere:

```js
showVisitorCounter: false
```

Os registros continuam funcionando; apenas o total deixa de aparecer no rodapé.

## Como testar responsividade

1. Abra o site no Chrome, Edge, Firefox ou Safari.
2. Abra as ferramentas do desenvolvedor.
3. Ative o modo responsivo.
4. Teste aproximadamente: 320, 375, 425, 768, 1024, 1440 e 1920 px.
5. Verifique menu, modais, FAQ, botões, idioma, foco por teclado e ausência de rolagem horizontal.
6. Teste também zoom de texto em 200% e a opção de reduzir movimento do sistema.

## Checklist antes da publicação

- [ ] Confirmar textos oficiais sobre Melissa.
- [ ] Confirmar formas de pagamento.
- [ ] Revisar o japonês com uma pessoa fluente, se possível.
- [ ] Trocar todos os placeholders de domínio.
- [ ] Configurar e testar o Supabase, se as métricas forem desejadas.
- [ ] Testar todos os botões de WhatsApp no celular.
- [ ] Revisar imagens e textos alternativos.
- [ ] Validar HTML, CSS e JavaScript.
- [ ] Testar teclado, menu móvel, modais e FAQ.
- [ ] Publicar e reenviar o sitemap aos mecanismos de busca quando houver domínio definitivo.
