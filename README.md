# Documentação do Projeto de API - MBA Mobile Development
## Introdução
Este projeto é uma aplicação de gerenciamento de usuários, clientes e informações financeiras, com um sistema de autenticação seguro.

O objetivo deste projeto é demonstrar o conteúdo aprendido de desenvolvimento de aplicativos web usando Node.js e MongoDB durante as aulas de API e Microsserviço do MBA Mobile Development.

## Requisitos do Sistema
Para executar o projeto em seu ambiente local, você deve atender aos seguintes requisitos:

- Node.js
- Docker
- Git
- Postman (ou outra ferramenta de teste de API)
  
## Configuração
Certifique-se de ter um arquivo .env na raiz do projeto para armazenar as variáveis de ambiente.

```
NODE_ENV=development

JWT_KEY=fiap

HOST_NAME=localhost

USER_API_PORT=4000
CLIENT_API_PORT=5533
FINANCE_API_PORT=5000

DB_PORT=27017
DB_DATA_DIR=./data
DB_DATABASE=projetoapi
DB_USER=projetoapi
DB_PASSWORD=projetoapipassword
```

## Instalação
Siga estas etapas para instalar e configurar o projeto em seu ambiente local:

1. Clone o repositório:
```
git clone https://github.com/nandabalassoni/projetoMBABackEnd.git
cd projetoapi
```

2. Certifique-se de ter o Docker instalado e execute:
   ``` docker-compose up ```

3. Navegue até o diretório do serviço desejado em `services`. Por exemplo:
   ```cd services/user/```

2. Instale as dependências:
   ```npm install```

3. Inicie o serviço:

```npm start```

## Uso

### Autenticação
A autenticação no sistema é realizada utilizando tokens JWT.
Para obter um token, é necessário realizar o processo de login, que retorna o token como parte da resposta.

Para obter um token JWT, utilize a rota de autenticação.

Utilização do Token:
Inclua o token JWT nas solicitações às rotas que requerem autenticação no cabeçalho da seguinte maneira:
```
token: seu_token_jwt
```

### Rotas

### Usuários
Cadastrar um novo usuário:
```POST /usuario/cadastrar```
Corpo da solicitação:
```
{
  "name": "Nome do Usuário",
  "email": "usuario@dominio.com",
  "username": "novousuario",
  "password": "novasenha",
  "cpf": "123.456.789-01",
  "telephone": "987654321",
  "age": 30
}
```

Listar usuários:
```GET /usuario/listar```

Logar em usuário e obter token JWT:
```POST /usuario/login```
Corpo da solicitação:
```
{
  "email": "usuario@dominio.com",
  "password": "novasenha"
}
```

Deslogar em usuário e obter token JWT:
```POST /usuario/logout```
Autenticação Necessária

Alterar senha do usuário:
```PUT /usuario/alterarsenha```
Corpo da solicitação:
```
{
  "currentPassword": "senhaatual",
  "newPassword": "novasenha"
}
```
Autenticação Necessária

Atualiza um usuário:
```PUT /usuario/atualizarusuario/:id```
Corpo da solicitação:
```
{
  "name": "Nome do Usuário",
  "email": "usuario@dominio.com",
  "username": "novousuario",
  "cpf": "123.456.789-01",
  "telephone": "987654321",
  "age": 30
}
```
Autenticação Necessária

Deletar um usuário:
```PUT /usuario/deletar/:id```
Autenticação Necessária

### Clientes
Cadastrar um novo cliente:
```POST /cliente/cadastrar```
Corpo da solicitação:
```
{
  "name": "Nome do Cliente",
  "email": "cliente@dominio.com",
  "cpf": "123.456.789-01",
  "telephone": "987654321",
  "address": "Rua ABC, 123",
  "age": 30
}
```
Autenticação Necessária

Listar clientes:
```GET /cliente/listar```
Autenticação Necessária

Atualizar informações do cliente:
```PUT /cliente/atualizar/:id```
Corpo da solicitação:
```
{
  "name": "Nome do Cliente",
  "email": "cliente@dominio.com",
  "cpf": "123.456.789-01",
  "telephone": "987654321",
  "address": "Rua ABC, 123",
  "age": 30
}
```
Autenticação Necessária

Deletar um cliente:
```PUT /cliente/deletar/:id```
Autenticação Necessária

### Informações Financeiras
Cadastrar informações financeiras:
```POST /financeiro/cadastrar```
Corpo da solicitação:
```
{
  "clientId": "id_do_cliente",
  "bankName": "Nome do Banco",
  "accountYype": "Tipo de Conta",
  "cardholderName": "Nome do Titular do Cartão",
  "cardLimit": 5000
}
```
Autenticação Necessária

Atualizar informações financeiras:
```PUT /financeiro/atualizar/:id```
Corpo da solicitação:
```
{
  "clientId": "id_do_cliente",
  "bank_name": "Novo Nome do Banco",
  "account_type": "Novo Tipo de Conta",
  "cardholder_name": "Novo Titular do Cartão",
  "card_limit": 7000
}
```
Autenticação Necessária

## Banco de Dados
O projeto utiliza o MongoDB como banco de dados.
A estrutura do banco de dados está definida nos modelos de dados.

## Segurança
As senhas dos usuários são criptografadas antes de serem armazenadas no banco de dados.

## Autores
- Maria Fernanda Balassoni RM348434
- Nayara Pereira Felix RM348253