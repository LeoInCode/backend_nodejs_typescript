# Desenvolvendo uma API com Node + TypeScript utilizando JWT e MySQL

Após concluir a Formação Node.js com Express da Alura, resolvi por em prática os conceitos aprendidos. Então, resolvi desenvolver uma API usando Node + TypeScript. O código foi desenvolvido inteiramente do zero, tendo usado como base apenas a autênticação jwt aprendida, e então, adaptada para atender as necessidades da minha API.

------------

### 📌 Requisitos de Máquina
- NodeJS
- MySQL
- Redis
- Postman | | Insomnia

### ⭐️ Tecnologias Usadas
- NodeJS
- Typescript
- MySQL
- Redis
- JWT

### ⚡️ Padrões de Projeto Usados
- MVC (Model, View, Controller)
- Repository (Arquivos que contém as querys de requisição ao banco)

### ⭐️ Nomenclatura das demais pastas
- Infraestracute (Database e Redis)
- Typed (Tipos das variáveis do banco)
- Middlewares (Contendo a autenticação dos tokens)
- Routes (Rotas da api)

------------

### 🚀 Instalando Dependências e Executando
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
Criar uma database no MySQL com o nome "backend_api"
```
```javascript
Executar o redis server
```
```javascript
npm run dev
```
###  Como Testar ❓
Após realizar os passos acima, siga os seguintes passos:

1. Crie um novo usuário usando um dos clientes para requisições ( Postman | Insomnia ).

1. Após ter feito isso, é necessário fazer login com email e senha usados para criar.

1. Ao fazer login, irá gerar um token no "Authorization" do Header da response. Também irá gerar um resfresh token como resposta no Body.

1. O token gerado no "Authorization" do Header é usado para deletar um usuário, fazer logout, e criar um post. Deve ser passado no Barear na aba de auth da chamada que executar.
1. Para fazer logout é necessário passar esse além desse token, o refresh token gerado ao fazer login. Este deve ser passado no body.

Este token gerado no "Authorization" deverá ser passado para todas as rotas que possuírem um barear, essa verificação pode ser vista nos arquivos da pasta routes/.
