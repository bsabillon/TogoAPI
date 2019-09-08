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

//get store object by storeId 
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

//get product object by categoryId
app.get('/productCategoryId/:productCategoryId', (request, response) =>  {
    database.any(`SELECT * FROM "product" WHERE "productCategoryId" = '${request.params.productCategoryId}'`)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//get product object by storeId
app.get('/productStoreId/:storeId', (request, response) =>  {
    database.any(`SELECT * FROM "product" WHERE "storeId" = '${request.params.storeId}'`)
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

//Delete product by productId
app.delete('/deleteProduct/:productId', (request, response) =>  {
    database.query(`DELETE FROM "product"
    WHERE "productId" = '${request.params.productId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "product deleted succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});


//get cartDetails object by userId
app.get('/cartDetailsByUser/:email', (request, response) =>  {
    database.any(`SELECT "cartDetailsId", "cartQuantity", product."productId", product."productName", product."price", product."productPictureURL" FROM "cartDetails"
    INNER JOIN "product" ON product."productId" = "cartDetails"."productId"
	INNER JOIN "cart" ON cart."cartId" = "cartDetails"."cartId"
	WHERE cart."userEmail" = '${request.params.email}' AND "cartStatusId" = 1
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//update cartDetails quantity by cartDetailsId
app.put('/updateCartDetailsQuantity/:cartDetailsId/:cartQuantity', (request, response) =>  {
    database.query(`UPDATE "cartDetails" SET "cartQuantity" = '${request.params.cartQuantity}'
    WHERE "cartDetailsId" = '${request.params.cartDetailsId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "quantity updated succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//Delete cartDetails from cart by cartDetailsId
app.delete('/deleteCartDetails/:cartDetailsId', (request, response) =>  {
    database.query(`DELETE FROM "cartDetails"
    WHERE "cartDetailsId" = '${request.params.cartDetailsId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "quantity deleted succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//get cartId by userEmail
app.get('/cartIdByUser/:email', (request, response) =>  {
    database.one(`SELECT "cartId" FROM "cart"
	WHERE "userEmail" = '${request.params.email}' AND "cartStatusId" = 1
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//create new cart
app.post('/newCart', (request, response) => { 
    database.query('INSERT INTO "cart" (${this:name}) VALUES (${this:csv})',
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "cart created succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});


//get productCount by cartId
app.get('/productCountByCartId/:cartId', (request, response) =>  {
    database.one(`SELECT COUNT(*)
    FROM public."cartDetails"
    WHERE "cartId"=  '${request.params.cartId}'
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//Add product to cart
app.post('/addProductToCart', (request, response) => { 
        
    database.query('INSERT INTO "cartDetails" (${this:name}) VALUES (${this:csv})',
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

//get card by userEmail
app.get('/cardByUser/:userEmail', (request, response) =>  {
    database.any(`SELECT * FROM "card"
	WHERE "userEmail" = '${request.params.userEmail}'
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//Add card
app.post('/addCard', (request, response) => { 
        
    database.query('INSERT INTO "card" (${this:name}) VALUES (${this:csv})',
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "card added succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//Delete card by cartDetailsId
app.delete('/deleteCard/:cardId', (request, response) =>  {
    database.query(`DELETE FROM "card"
    WHERE "cardId" = '${request.params.cardId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "Card deleted succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//Add address
app.post('/addAddress', (request, response) => { 
        
    database.query('INSERT INTO "address" (${this:name}) VALUES (${this:csv})',
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "address added succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//get address by userEmail
app.get('/addressByUser/:userEmail', (request, response) =>  {
    database.any(`SELECT * FROM "address"
	WHERE "userEmail" = '${request.params.userEmail}'
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }) 

});

//Delete card by cartDetailsId
app.delete('/deleteAddress/:addressId', (request, response) =>  {
    database.query(`DELETE FROM "address"
    WHERE "addressId" = '${request.params.addressId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "address deleted succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//get cartDetailsTotal object by userId
app.get('/cartDetailsTotalByUser/:email', (request, response) =>  {
    database.any(`SELECT 
    SUM ("cartQuantity"*product."price") AS total
    FROM "cartDetails"
        INNER JOIN "product" ON product."productId" = "cartDetails"."productId"
        INNER JOIN "cart" ON cart."cartId" = "cartDetails"."cartId"
        WHERE cart."userEmail" ='${request.params.email}'
        GROUP BY cart."userEmail" 
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }); 
    

});

//get cartDetailsTotal and Count  by userId
//pending TODO
app.get('/cartTotalCountByUser/:email', (request, response) =>  {
    database.any(`SELECT 
    SUM ("cartQuantity"*product."price") AS total,
	SUM ("cartQuantity") AS NoProductos,
	cart."cartId"
    FROM "cartDetails"
        INNER JOIN "product" ON product."productId" = "cartDetails"."productId"
        INNER JOIN "cart" ON cart."cartId" = "cartDetails"."cartId"
        WHERE cart."userEmail" = '${request.params.email}' AND "cartStatusId"=2
        GROUP BY cart."cartId" 
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }); 
    

});

//get receivedOrdersByUser by userId
//pending TODO
app.get('/receivedOrdersByUser/:email', (request, response) =>  {
    database.any(`SELECT 
    SUM ("cartQuantity"*product."price") AS total,
	SUM ("cartQuantity") AS NoProductos,
	cart."cartId"
    FROM "cartDetails"
        INNER JOIN "product" ON product."productId" = "cartDetails"."productId"
        INNER JOIN "cart" ON cart."cartId" = "cartDetails"."cartId"
        WHERE cart."userEmail" = '${request.params.email}' AND "cartStatusId"=5
        GROUP BY cart."cartId" 
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    }); 
    

});


app.get('/orderDetailsByUser/:email/:cartStatusId', (request, response) =>  {
    database.any(`SELECT "cartDetailsId", "cartQuantity",
    product."productId", product."productName", product."price", product."productPictureURL",
    "address"."addressAlias", "address"."addressDescription","address"."addressPhone","address"."addressReference",
    "card"."cardDescription",
    "cartStatus"."statusDescription"
    FROM "cartDetails"
        INNER JOIN "product" ON product."productId" = "cartDetails"."productId"
        INNER JOIN "cart" ON cart."cartId" = "cartDetails"."cartId"
        INNER Join "cartStatus" ON "cartStatus"."cartStatusId" = "cart"."cartStatusId" 
        INNER JOIN "card" ON card."cardId"  = "cart"."cardId"
        INNER JOIN "address" ON address."addressId"  = "cart"."addressId"
        WHERE cart."userEmail" = '${request.params.email}'
        AND cart."cartStatusId" = '${request.params.cartStatusId}'
    `)
    .then((data) => {
        response.json(data);
    })
    .catch((error) => {
        response.send("ERROR" + error);
    });     

});

//update cart status
app.put('/updateCartStatus/:cartId/:cartStatusId', (request, response) =>  {
    database.query(`UPDATE "cart" SET "cartStatusId" = '${request.params.cartStatusId}'
    WHERE "cartId" = '${request.params.cartId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "cartStatus updated succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});

//update cart status
app.put('/updateCart/:cartId/:addressId/:cardId', (request, response) =>  {
    database.query(`UPDATE "cart" SET
    "addressId"= '${request.params.addressId}', 
    "cardId" ='${request.params.cardId}'
    WHERE "cartId" = '${request.params.cartId}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "cartStatus updated succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});


//Create new seller
app.put('/createSeller/:userEmail', (request, response) =>  {
    database.query(`UPDATE public."user"
    SET "sellerId" = (SELECT MAX("user"."sellerId")+1 FROM public."user")
    WHERE "userEmail" = '${request.params.userEmail}'
    `,
    request.body)
    .then((data) => {
        response
        .status(200)
        .json('{"response" : "user updated succesfully!"}');
    })
    .catch( (error) => {
        response.send(error);
    });
});


app.listen(process.env.PORT || port, () => console.log(`ToGo app listening on port ${port}!`))