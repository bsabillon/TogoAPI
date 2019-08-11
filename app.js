const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
var pgp = require("pg-promise")();
var database = pgp("postgres://ofsoasjazfznro:8422453c66450cd02fe7a41a3fa1d20882e038ab1345b76bb7ee8cb64102146e@ec2-54-235-246-201.compute-1.amazonaws.com:5432/ddqto13jodnbe6?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory")

//var database = pgp("postgres://postgres:gaballu@localhost:5432/postgres")
app.use(cors());

//endpoint test
app.get('/', (req, res) => res.send('{"status":"correct"}'))

//get user object by e-mail 
app.get('/user/:email', (request, response) =>  {
    database.one(`SELECT * FROM "user" WHERE "userEmail" = '${request.params.email}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get store object by sellerId 
app.get('/store/:sellerId', (request, response) =>  {
    database.one(`SELECT * FROM "store" WHERE "sellerId" = '${request.params.sellerId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

app.listen(process.env.PORT || port, () => console.log(`ToGo app listening on port ${port}!`))