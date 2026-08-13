# Poupa+ API

API REST responsável pelo back-end do **Poupa+**, uma aplicação de controle financeiro pessoal.

O projeto concentra autenticação, gerenciamento de usuários, categorias e lançamentos financeiros, fornecendo os dados consumidos pelo front-end da aplicação.

## Funcionalidades

- Cadastro e autenticação de usuários
- Autenticação utilizando JWT
- Hash de senhas com bcrypt
- Gerenciamento de usuários
- Gerenciamento de categorias
- Gerenciamento de lançamentos financeiros
- Persistência de dados com MongoDB
- API REST estruturada em controllers, models, routes e middlewares

## Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- CORS
- dotenv
- Nodemon

## Estrutura do projeto

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── app.js
├── database.js
└── server.js
