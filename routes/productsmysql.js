const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers'); 

// display books page
router.get('/', function(req, res, next) {
      
    database.query('SELECT categories.title AS category, products.title AS name, products.price AS price,products.quantity, products.description, products.image,products.id FROM products JOIN categories ON categories.id = products.cat_id',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('products',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('products',{data:rows});
        }
    });
});
