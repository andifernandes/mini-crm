# MiniCRM - Organization Lead
## Controle de pessoas Física/Jurídica com Endereço

Este repositório contém a solução completa, com o backend, frontend, testes automatizados e banco de dados.

---

## Estrutura do Repositório
- `/frontend/src/main.ts` — Frontend em Angular (configurado para consumir o backend).
- `/backend/src/MiniCRM.API` — Backend em ASP.NET Core 8.0 com autenticação JWT.
- `/backend/MiniCRM.API.Tests` — Testes unitários e de integração para o backend.
dotnet ef migrations add InitialCreate
---

# Tecnologias Utilizadas
```bash
Arquitetura Completa Angular 19, Dot.Net Core V8, Jwt e PostgreSQL 13 - Projeto Completo com Docker
```

## Como rodar

### Banco de Dados PostgreSQL
```bash
docker run -d   --name mini-crm-postgres   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=suaSenhaSegura123   -e POSTGRES_DB=mini_crm_db   -p 5432:5432   postgres
```
```bash
docker exec -it mini-crm-postgres bash -c "echo \"listen_addresses='*'\" >> /var/lib/postgresql/data/postgresql.conf"
```
Acessar o banco pelo terminal
   ```bash
   psql -h localhost -U postgres -d mini_crm_db
   ```
Entrar no bash do docker
   ```bash
   docker exec -it mini-crm-postgres bash
   ```
### Backend

1. Acesse a pasta do backend:

   ```bash
   cd /backend/src/MiniCRM.API
    ```
Configure a string de conexão e as variáveis no appsettings.json/appsettings.Development.json (exemplo: conexão com PostgreSQL, JWT, etc).

Execute o backend:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```
O backend estará disponível em http://localhost:5000 (ou a porta configurada).

Para acessar a documentação Swagger, acesse: http://localhost:5000/swagger

ou docker
   ```bash
   docker build -t mini-crm-api .
   ```
   ```bash
   docker run -p 5000:5000 mini-crm-api
   ```

### Migrações do Banco de Dados(inicializar banco de dados)
   ```bash
   dotnet ef migrations add InitialCreate
   ```
   ```bash
   dotnet ef database update
   ```

### Swagger API:
   ```bash
   http://localhost:5000/swagger/index.html
   ```

### Frontend
Acesse a pasta do frontend:

   ```bash
   cd frontend
   ```

Instale as dependências:
   ```bash
   npm install
   ```

Execute o frontend:
   ```bash
   npm start
   ```
ou
   ```bash
   ng serve
   ```
ou
   ```bash
   npx ng serve --open
   ```

O frontend estará disponível em http://localhost:4200

### Testes
Acesse a pasta dos testes do backend:

   ```bash
   cd /backend/MiniCRM.API.Tests
   ```

Rode os testes:
   ```bash
   dotnet test
   ```

Tecnologias usadas
Backend: ASP.NET Core 8.0, Entity Framework Core, JWT Authentication

Frontend: Angular

Banco de Dados: PostgreSQL (configurável)

Testes: xUnit, Moq


