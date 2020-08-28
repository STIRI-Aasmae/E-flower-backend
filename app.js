const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
//////
var bodyParser = require('body-parser')
//////
///////////////*-debut----ajouté le 16/08/2020------- */
const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title: "Shop API",
          description: "Backend Api",
          contact: {
              name: 'Amazing Developer'
          },
          servers: "http://localhost:3000"
      }
  },
  apis: ["app.js", ".routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
///////////////*-fin----ajouté le 16/08/2020------- */

//Import Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/order');
//const productsmysqlRoute = require('./routes/productsmysql');
//Use Routes

////
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
////
app.use('/api/order', usersRoute);
app.use('/api/products', productsRoute);
//app.use('/api/productsmysql', productsmysqlRoute);


/* CORS */
app.use(cors({
  origin: 'http://localhost:4200/',
  methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
  allowedHeaders: ' Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*--modifié le 16/08/2020 */
//app.use(logger('dev'));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
