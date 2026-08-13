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
```

## Executando localmente

```bash
git clone https://github.com/lucassouzast/api-poupamais.git
cd api-poupamais
npm install
```

Crie um arquivo `.env`:

```env
MONGODB_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta
PORT=3000
```

Execute:

```bash
npm run dev
```

ou:

```bash
npm start
```

## Front-end

https://github.com/lucassouzast/front-poupamais

Aplicação publicada:

https://front-poupamais.onrender.com/

## Sobre o projeto

O Poupa+ foi desenvolvido como um projeto Full Stack para aplicar conceitos de autenticação, APIs REST, organização de código back-end, persistência de dados e integração entre front-end e back-end.

## Autor

**Lucas Pereira de Souza**

GitHub: https://github.com/lucassouzast  
LinkedIn: https://www.linkedin.com/in/lucassouza-js/
