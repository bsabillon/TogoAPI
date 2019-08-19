const express = require('express')
const app = express()
const port = 3000
var cors = require('cors');
const bodyParser = require('body-parser');
var pgp = require("pg-promise")();
var database = pgp("postgres://ofsoasjazfznro:8422453c66450cd02fe7a41a3fa1d20882e038ab1345b76bb7ee8cb64102146e@ec2-54-235-246-201.compute-1.amazonaws.com:5432/ddqto13jodnbe6?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory")
//var database = pgp("postgres://postgres:gaballu@localhost:5432/postgres")

app.use(cors());
app.use(bodyParser.json());

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

//get all user object
app.get('/user/', (request, response) =>  {
    database.any(`SELECT * FROM "user" `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get store object by store 
app.get('/store/:storeId', (request, response) =>  {
    database.one(`SELECT * FROM "store" WHERE "storeId" = '${request.params.storeId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get store object by sellerId 
app.get('/storeSeller/:sellerId', (request, response) =>  {
    database.any(`SELECT * FROM "store" WHERE "sellerId" = '${request.params.sellerId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get all store object 
app.get('/store/', (request, response) =>  {
    database.any(`SELECT * FROM "store" `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get all category object 
app.get('/productCategory/', (request, response) =>  {
    database.any(`SELECT * FROM "productCategory" `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get product object by id
app.get('/product/:productId', (request, response) =>  {
    database.one(`SELECT * FROM "product" WHERE "productId" = '${request.params.productId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get product object by id
app.get('/productCategoryId/:productCategoryId', (request, response) =>  {
    database.any(`SELECT * FROM "product" WHERE "productCategoryId" = '${request.params.productCategoryId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get all product objects 
app.get('/product/', (request, response) =>  {9
    database.any(`SELECT * FROM "product" `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//create new user
app.post('/newuser', (request, response) => { 
      
    database.query('INSERT INTO "user" (${this:name}) VALUES (${this:csv})',
    request.body)
    .then((data) => {
        response
        .status(200)
        .send('{"response" : "user added succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//create new store
app.post('/newstore', (request, response) => { 
        
      database.query('INSERT INTO "store" (${this:name}) VALUES (${this:csv})',
      request.body)
      .then((data) => {
          response
          .status(200)
          .json('{"response" : "store added succesfully!"}');
      })
      .catch( (error) => {
          response.send(error);
      });
  });

//create new product
app.post('/newproduct', (request, response) => { 
        
      database.query('INSERT INTO "product" (${this:name}) VALUES (${this:csv})',
      request.body)
      .then((data) => {
          response
          .status(200)
          .json('{"response" : "product added succesfully!"}');
      })
      .catch( (error) => {
          response.send(error);
      });
  });


  

app.listen(process.env.PORT || port, () => console.log(`ToGo app listening on port ${port}!`))