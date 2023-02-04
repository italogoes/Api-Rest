const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./db')
const game = require('./games')
const cors = require("cors")
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// token de acesso
const jwtSecret = 'dfjskjflksjdlfksjd'

function auth(req, res, next){

    const authToken = req.headers['authorization']

    if(authToken != undefined){

        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401)
                res.json({err: 'Token invalido'})
            } else{

                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                console.log(data)
                next()
            }
        })

    }else{
        res.status(401)
        res.json({err: 'Token inválido'})
    }

    
}

connection.authenticate().then(() => {
    console.log('Conexao com o banco efetuada com sucesso')
}).catch((err) => {
    console.log(err)
})

var DB = {
    games: [
        {
            id: 23,
            title: "Call of duty",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Valorant",
            year: 2020,
            price: 15
        },
        {
            id: 12,
            title: "Need for speed",
            year: 2010,
            price: 20
        }
    ],
    users: [
        {
            id: 1,
            name: 'italo',
            email: 'italo@gmail.com',
            password: '1234'
        },
        {
            id: 2,
            name: 'joao',
            email: 'joao@gmail.com',
            password: '1234'
        }
    ]
}

app.get('/', (req, res) => {
    res.send('ola')
})

app.get('/games', auth, (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/game/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})

//CADASTRAR UM GAME
app.post('/game', (req, res) => {
    var {title, price, year} = req.body

    DB.games.push({
        id: 4234234,
        title,
        price,
        year
    })

    res.sendStatus(200)

})

app.delete('/game/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})

app.put('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined) {

            var {title, price, year} = req.body;

            if(title != undefined){ game.title = title }

            if(price != undefined){ game.price = price }

            if(year != undefined){ game.year = year }

            res.sendStatus(200)

        } else {
            res.sendStatus(404)
        }
    }
})


// autenticação
app.post('/auth', (req, res) => {
    var {email, password} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email)

        if(user != undefined){

            if(user.password == password){

                jwt.sign({id: user.id, email: user.email}, jwtSecret,{expiresIn: '1h'},(err, token) => {
                    if(err){
                        res.status(400)
                        res.json({err:'Falha interna'})
                    }else{
                        res.status(200)
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401)
                res.json({err: 'credenciais inválidas'})
            }

        }else{
            res.status(400)
            res.json({err: 'Email não existe na base de dados'})
        }

    } else {
        res.status(400)
        res.json({err: 'Email inválido'})
    }
})


app.listen(5000, () => {
    console.log('API RODANDO')
})