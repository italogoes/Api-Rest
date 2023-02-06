# Api-Rest
Desenvolvimento de api-rest e geração de token com jwt para consumir a api

## Endpoints
### GET /games
Esse enpoint é responsável por retornar todos os games cadastrados no banco de dados
#### Parâmentros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games
Exemplo:
```
{
  {
    "id": 1,
    "title": "Titulo",
    "year": 2023,
    "price": 150,00
  },
  {
    "id": 2,
    "title": "Titulo",
    "year": 2021,
    "price": 110,00
  }
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação
Exemplo:
```
{
  "err": "Token inválido"
}
```
### POST /auth
Esse enpoint é responsável por fazer o processo de login
#### Parâmentros
Email: E-mail do ususario cadastrado no sistema
Password: Senha do usuario cadastrado no sistema
Exemplo:
```
{
  "email": "italo@gmail.com",
  "password": "1234"
}
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT para conseguir acessar endpoints na API
Exemplo de resposta:
```
{
  {
    "token": "dfsdfiomdfngljgçosifjgiosdfjgdgjdkljfdglkfg"
  }
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação
Exemplo:
```
{
  "err": "Token inválido"
}
```
