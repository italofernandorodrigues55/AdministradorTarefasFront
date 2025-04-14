# 🗕️ Administrador de Tarefas FrontEnd

Interface web para gerenciamento de tarefas, desenvolvida em **Angular**. Este projeto consome uma API .NET Core e permite criar, editar, excluir e listar tarefas.

---

## 💪 Como executar o projeto localmente

### ✅ Requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/pt)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Git](https://git-scm.com/)

---

### 📆 Clonando o projeto

```bash
git clone https://github.com/italofernandorodrigues55/AdministradorTarefasFront.git
cd AdministradorTarefasFront
```

---

### 🔧 Configurando a API

Edite o arquivo `src/app/environments/environment.ts` com a URL da sua API:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7053/api'
};
```

---

### 🚀 Executando o projeto

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
ng serve
```

Abra o navegador e acesse:

```
http://localhost:4200
```

> ⚠️ A porta pode variar dependendo do ambiente. Verifique o terminal após o `ng serve`.

---

## 🩹 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes de interface (Home, Modais, etc)
│   ├── services/            # Serviços de integração com a API
│   ├── environments/        # Configurações de ambiente
│   ├── app.component.*      # Componente principal
│   ├── app.routes.ts        # Rotas da aplicação
│   └── app.config.ts        # Configuração da aplicação
├── assets/                  # Imagens e arquivos estáticos
├── styles.css               # Estilo global
├── index.html               # HTML principal
└── main.ts                  # Bootstrap da aplicação
```

---

## 🌐 Endpoints Consumidos

| Método | Rota                          | Descrição                 |
|--------|-------------------------------|---------------------------|
| POST   | `/api/Tarefa`                 | Criar uma nova tarefa     |
| GET    | `/api/Tarefa/status/{status}` | Listar tarefas por status |
| GET    | `/api/Tarefa/{id}`            | Buscar tarefa por ID      |
| PUT    | `/api/Tarefa`                 | Atualizar tarefa          |
| DELETE | `/api/Tarefa/{id}`            | Excluir tarefa            |

> Todos os endpoints estão disponíveis via Swagger na API:
> [AdministradorTarefas.Api](https://github.com/italofernandorodrigues55/AdministradorTarefas.Api)

---

## 💡 Funcionalidades

- ✅ CRUD completo de tarefas
- ✅ Filtros por status
- ✅ Design responsivo com visualização em cards no mobile
- ✅ Validação de formulário
- ✅ Tela de carregamento global
