# Desenvolvendo uma API com Node + TypeScript utilizando JWT

Após concluir a Formação Node.js com Express da Alura, resolvi por em prática os conceitos aprendidos. Então, resolvi desenvolver uma API usando Node + TypeScript. O código foi desenvolvido inteiramente do zero, tendo usado como base apenas a autênticação jwt aprendida, e então, adaptada para atender as necessidades da minha API.

------------


### 🚀 Tecnologias Usadas
- NodeJS
- Typescript
- MySQL
- Redis
- JWT

### :tw-26a1: Padrões de Projeto Usados
- MVC (Model, View, Controller)
- Repository (Arquivos que contém as querys de requisição ao banco)

### :tw-2757: Nomenclatura além dos Padrões de Projeto
- Infraestracute (Database e Redis)
- Typed (Tipos das variáveis do banco)
- Middlewares (Contendo a autenticação dos tokens)
- Routes (Rotas da api)

------------

### Instalando Dependências
```javascript
npm install
```
```javascript
Criar um arquivo .env na raiz do projeto passando a chave token para a seguinte variável: CHAVE_JWT=" "
```
```javascript
Comando para criar a chave: node -e "console.log( require('crypto').randomBytes(256).toString('base64'))"
```
```javascript
npm run dev
```
