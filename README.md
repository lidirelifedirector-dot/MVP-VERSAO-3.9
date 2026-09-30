# LiDire MVP 3.5 — versão funcional para GitHub/Cloudflare

Esta versão foi preparada para o upload dos arquivos **diretamente na raiz do repositório GitHub**, pelo celular.

## Arquivos na raiz

- `index.html`
- `styles.css`
- `app.js`
- `index.js`
- `logo-lidire-oficial.png`
- `wrangler.toml`
- `schema.sql`
- `README.md`
- `PROMPT_PARA_DESENVOLVER_MVP.md`
- `REFERENCIAS_VISUAIS.md`

## O que está funcional

Os principais botões e módulos agora têm ações reais no navegador:

- Home / Meu Dia
- Agenda e compromissos
- Tarefas com conclusão e exclusão
- Assistente com sugestões básicas
- Compras com itens e marcação de comprado
- Estudos com atividades
- Treinos com exercícios, cargas/repetições meta e efetivadas, distância, pace, duração e gráfico de rendimento
- Hidratação com meta e registros
- Finanças com receitas, despesas, tetos por categoria, gráfico por categoria e suporte a R$ / US$
- Objetivos com prazo, metas internas em checklist, progresso, dinheiro e observações
- Família com membros
- Ciclo Menstrual com registro de ciclos, fases e sintomas
- Perfil editável, incluindo endereço e foto

Os dados desta etapa são salvos no `localStorage` do dispositivo/navegador.

## Importante sobre D1

Esta versão **não usa um `database_id` fictício** no `wrangler.toml`, porque isso poderia impedir o deployment.

A próxima etapa é criar o banco D1 real no Cloudflare e conectar autenticação + dados por usuário. O `schema.sql` já serve como base dessa etapa.

## Deploy pelo Cloudflare

No Build configuration:

- Build command: deixe vazio
- Deploy command: `npx wrangler deploy`
- O repositório deve apontar para esta raiz


## Autenticação do MVP 3.9

O MVP 3.9 agora possui telas de **Entrar** e **Criar conta**, integradas às rotas `/api/register`, `/api/login`, `/api/me` e `/api/logout`.

- Senhas são transformadas em hash PBKDF2 no Cloudflare Worker.
- A sessão usa cookie `HttpOnly`, `Secure` e `SameSite=Lax`.
- O usuário é associado às tabelas `users` e `profiles`.
- As configurações iniciais de `app_settings`, `ai_settings` e `app_security_settings` são criadas no cadastro.
- O Worker cria `user_sessions` automaticamente com `CREATE TABLE IF NOT EXISTS`; o arquivo `auth-schema.sql` também documenta a estrutura.
