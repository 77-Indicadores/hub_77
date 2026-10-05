# Task77 — Documentação da API

> Base URL: `/api`  
> Todas as rotas protegidas exigem o header: `Authorization: Bearer <token>`

## Como autenticar

1. `POST /api/auth/login` com `{ email, password }`
2. Copie o `token` da resposta
3. Envie em toda requisição: `Authorization: Bearer TOKEN`

---

## Autenticação

### `POST /api/auth/login`

🌐 **Público**

Realiza login e retorna um token JWT.

**Body (JSON):**
```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta:**
```json
{
  "token": "string",
  "user": "{ id, name, email, avatarColor }"
}
```

---

### `GET /api/auth/me`

🔒 **Requer autenticação**

Retorna os dados do usuário autenticado.

**Resposta:**
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "avatarColor": "string"
}
```

---

### `POST /api/auth/logout`

🔒 **Requer autenticação**

Invalida a sessão atual.

**Resposta:**
```json
{
  "message": "ok"
}
```

---

## Usuários

### `GET /api/users`

🔒 **Requer autenticação**

Lista todos os usuários.

**Resposta:**
```json
[{ id, name, email, avatarColor, createdAt }]
```

---

### `POST /api/users`

🔒 **Requer autenticação**

Cria um novo usuário.

**Body (JSON):**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "avatarColor": "string?"
}
```

**Resposta:**
```json
{ id, name, email, avatarColor }
```

---

### `GET /api/users/:id`

🔒 **Requer autenticação**

Retorna um usuário pelo ID.

**Resposta:**
```json
{ id, name, email, avatarColor, createdAt }
```

---

### `PUT /api/users/:id`

🔒 **Requer autenticação**

Atualiza nome, email ou avatarColor do usuário.

**Body (JSON):**
```json
{
  "name": "string?",
  "email": "string?",
  "avatarColor": "string?"
}
```

**Resposta:**
```json
{ id, name, email, avatarColor }
```

---

### `PUT /api/users/:id/password`

🔒 **Requer autenticação**

Altera a senha do usuário.

**Body (JSON):**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Resposta:**
```json
{ message: "ok" }
```

---

### `DELETE /api/users/:id`

🔒 **Requer autenticação**

Remove um usuário.

**Resposta:**
```json
{ message: "ok" }
```

---

## Projetos

### `GET /api/projects`

🔒 **Requer autenticação**

Lista projetos do usuário autenticado.

**Resposta:**
```json
[{ id, name, color, isFavorite, role, groups }]
```

---

### `POST /api/projects`

🔒 **Requer autenticação**

Cria um novo projeto.

**Body (JSON):**
```json
{
  "name": "string",
  "color": "string?"
}
```

**Resposta:**
```json
{ id, name, color }
```

---

### `GET /api/projects/:id`

🔒 **Requer autenticação**

Retorna um projeto pelo ID.

**Resposta:**
```json
{ id, name, color, groups, members }
```

---

### `PUT /api/projects/:id`

🔒 **Requer autenticação**

Atualiza nome ou cor do projeto.

**Body (JSON):**
```json
{
  "name": "string?",
  "color": "string?"
}
```

**Resposta:**
```json
{ id, name, color }
```

---

### `DELETE /api/projects/:id`

🔒 **Requer autenticação**

Exclui projeto e todas as tarefas associadas.

**Resposta:**
```json
{ message: "ok" }
```

---

### `PUT /api/projects/:id/favorite`

🔒 **Requer autenticação**

Alterna favorito do projeto.

**Resposta:**
```json
{ isFavorite: boolean }
```

---

## Membros do Projeto

### `GET /api/projects/:id/members`

🔒 **Requer autenticação**

Lista membros do projeto.

**Resposta:**
```json
[{ id, name, email, avatarColor, role }]
```

---

### `POST /api/projects/:id/members`

🔒 **Requer autenticação**

Adiciona um membro ao projeto.

**Body (JSON):**
```json
{
  "userId": "number"
}
```

**Resposta:**
```json
{ message: "ok" }
```

---

### `DELETE /api/projects/:id/members/:userId`

🔒 **Requer autenticação**

Remove um membro do projeto.

**Resposta:**
```json
{ message: "ok" }
```

---

## Grupos

### `GET /api/projects/:id/groups`

🔒 **Requer autenticação**

Lista grupos do projeto.

**Resposta:**
```json
[{ id, name, order }]
```

---

### `POST /api/projects/:id/groups`

🔒 **Requer autenticação**

Cria um novo grupo.

**Body (JSON):**
```json
{
  "name": "string"
}
```

**Resposta:**
```json
{ id, name }
```

---

### `PUT /api/projects/:id/groups/:groupId`

🔒 **Requer autenticação**

Renomeia um grupo.

**Body (JSON):**
```json
{
  "name": "string"
}
```

**Resposta:**
```json
{ id, name }
```

---

### `PUT /api/projects/:id/groups/reorder`

🔒 **Requer autenticação**

Reordena grupos do projeto.

**Body (JSON):**
```json
{
  "order": "number[]"
}
```

**Resposta:**
```json
[{ id, name, order }]
```

---

### `DELETE /api/projects/:id/groups/:groupId`

🔒 **Requer autenticação**

Exclui grupo (tarefas ficam sem grupo).

**Resposta:**
```json
{ message: "ok" }
```

---

## Tarefas

### `GET /api/projects/:id/tasks`

🔒 **Requer autenticação**

Lista tarefas do projeto.

**Query Params:**
```json
{
  "limit": "number?",
  "offset": "number?",
  "groupId": "number?",
  "status": "string?"
}
```

**Resposta:**
```json
{ data: Task[], meta: { total, limit, offset } }
```

---

### `POST /api/projects/:id/tasks`

🔒 **Requer autenticação**

Cria uma nova tarefa no projeto.

**Body (JSON):**
```json
{
  "title": "string",
  "groupId": "number?",
  "dueDate": "string?",
  "description": "string?"
}
```

**Resposta:**
```json
Task
```

---

### `GET /api/tasks/:id`

🔒 **Requer autenticação**

Retorna uma tarefa pelo ID.

**Resposta:**
```json
Task completo (com assignees, observers, subtasks, files)
```

---

### `PUT /api/tasks/:id`

🔒 **Requer autenticação**

Atualiza campos da tarefa (título, descrição, prazo, prioridade).

**Body (JSON):**
```json
{
  "title": "string?",
  "description": "string?",
  "dueDate": "string?",
  "priority": "none|low|medium|high|urgent"
}
```

**Resposta:**
```json
Task
```

---

### `DELETE /api/tasks/:id`

🔒 **Requer autenticação**

Exclui a tarefa permanentemente.

**Resposta:**
```json
{ message: "ok" }
```

---

### `PUT /api/tasks/:id/status`

🔒 **Requer autenticação**

Altera status da tarefa.

**Body (JSON):**
```json
{
  "status": "todo|in_progress|done"
}
```

**Resposta:**
```json
{ status, progress }
```

---

### `PUT /api/tasks/:id/progress`

🔒 **Requer autenticação**

Atualiza progresso (0–100).

**Body (JSON):**
```json
{
  "progress": "number"
}
```

**Resposta:**
```json
{ progress }
```

---

### `PUT /api/tasks/:id/assignees`

🔒 **Requer autenticação**

Define responsáveis da tarefa (substitui lista).

**Body (JSON):**
```json
{
  "assigneeIds": "number[]"
}
```

**Resposta:**
```json
{ assignees }
```

---

### `PUT /api/tasks/:id/observers`

🔒 **Requer autenticação**

Define observadores da tarefa (substitui lista).

**Body (JSON):**
```json
{
  "observerIds": "number[]"
}
```

**Resposta:**
```json
{ observers }
```

---

### `PUT /api/tasks/:id/group`

🔒 **Requer autenticação**

Move tarefa para outro grupo.

**Body (JSON):**
```json
{
  "groupId": "number|null"
}
```

**Resposta:**
```json
{ groupId }
```

---

## Subtarefas

### `GET /api/tasks/:id/subtasks`

🔒 **Requer autenticação**

Lista subtarefas de uma tarefa.

**Resposta:**
```json
[{ id, title, done }]
```

---

### `POST /api/tasks/:id/subtasks`

🔒 **Requer autenticação**

Cria uma subtarefa.

**Body (JSON):**
```json
{
  "title": "string"
}
```

**Resposta:**
```json
{ id, title, done }
```

---

### `PUT /api/tasks/:id/subtasks/:subtaskId`

🔒 **Requer autenticação**

Atualiza título ou status da subtarefa.

**Body (JSON):**
```json
{
  "title": "string?",
  "done": "boolean?"
}
```

**Resposta:**
```json
{ id, title, done }
```

---

### `DELETE /api/tasks/:id/subtasks/:subtaskId`

🔒 **Requer autenticação**

Exclui uma subtarefa.

**Resposta:**
```json
{ message: "ok" }
```

---

## Comentários

### `GET /api/tasks/:id/comments`

🔒 **Requer autenticação**

Lista comentários de uma tarefa.

**Query Params:**
```json
{
  "sort": "asc|desc?"
}
```

**Resposta:**
```json
[{ id, content, createdAt, user }]
```

---

### `POST /api/tasks/:id/comments`

🔒 **Requer autenticação**

Adiciona um comentário.

**Body (JSON):**
```json
{
  "content": "string"
}
```

**Resposta:**
```json
{ id, content, createdAt, user }
```

---

### `PUT /api/tasks/:id/comments/:commentId`

🔒 **Requer autenticação**

Edita um comentário (apenas autor).

**Body (JSON):**
```json
{
  "content": "string"
}
```

**Resposta:**
```json
{ id, content, createdAt, user }
```

---

### `DELETE /api/tasks/:id/comments/:commentId`

🔒 **Requer autenticação**

Exclui um comentário.

**Resposta:**
```json
{ message: "ok" }
```

---

## Arquivos

### `POST /api/tasks/:id/files`

🔒 **Requer autenticação**

Faz upload de arquivos (multipart/form-data). Campo: files (múltiplos, máx 10).

**Body (JSON):**
```json
{
  "files": "File[] (multipart)"
}
```

**Resposta:**
```json
[{ id, originalName, sizeBytes, mimeType }]
```

---

### `GET /api/tasks/:id/files/:fileId`

🔒 **Requer autenticação**

Faz download de um arquivo.

**Resposta:**
```json
Binário do arquivo
```

---

### `DELETE /api/tasks/:id/files/:fileId`

🔒 **Requer autenticação**

Remove um arquivo.

**Resposta:**
```json
{ message: "ok" }
```

---

## Histórico (Timeline)

### `GET /api/tasks/:id/timeline`

🔒 **Requer autenticação**

Retorna eventos da tarefa em ordem cronológica.

**Resposta:**
```json
[{ id, action, metadata, createdAt, user }]
```

---

## Painel & Minhas Tarefas

### `GET /api/dashboard`

🔒 **Requer autenticação**

Retorna tarefas agrupadas por urgência para o painel.

**Query Params:**
```json
{
  "scope": "mine|all?",
  "urgency": "overdue|today|week|upcoming|all?"
}
```

**Resposta:**
```json
[{ task com project info }]
```

---

### `GET /api/my-tasks`

🔒 **Requer autenticação**

Lista tarefas do usuário logado com filtros.

**Query Params:**
```json
{
  "status": "string?",
  "limit": "number?",
  "offset": "number?"
}
```

**Resposta:**
```json
{ data: Task[], meta }
```

---

### `GET /api/search`

🔒 **Requer autenticação**

Busca tarefas e projetos por texto.

**Query Params:**
```json
{
  "q": "string",
  "limit": "number?"
}
```

**Resposta:**
```json
{ tasks: [], projects: [] }
```

---

## Setup

### `GET /api/setup/status`

🌐 **Público**

Verifica se o sistema precisa de configuração inicial.

**Resposta:**
```json
{ needsSetup: boolean }
```

---

### `POST /api/setup/register`

🌐 **Público**

Cria o primeiro usuário administrador.

**Body (JSON):**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "avatarColor": "string?"
}
```

**Resposta:**
```json
{ token: string, user }
```

---
