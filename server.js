const express = require('express');
const bodyParser = require('body-parser');
const Animal = require('./models/Animal');
<<<<<<< HEAD
=======
// const PORT = process.env.PORT || 3001;
>>>>>>> production-deploy
const graffiti = require('@risingstack/graffiti');
const schema = require('./models/schema');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
<<<<<<< HEAD
const config = require('./webpack.config');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const compiler = webpack(config);
=======
const webpackHotMiddleware = require('webpack-hot-middleware');

// const config = require('./webpack.config');
>>>>>>> production-deploy
require('dotenv').config();
const isDeveloping = process.env.NODE_ENV !== 'production';
const PORT = isDeveloping ? 3001 : process.env.PORT;
let config;
const fs = require('fs');

/*----------  MONGOOSE ORM SETUP   ----------*/
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT || process.env.DB_CONNECT);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
const path = require('path');

// //if(process.env === 'production'){
//   app.use(express.static('public'));
// //} else {
//  // app.use(express.static('public'));
//   app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
//     stats: {
//     colors: true,
//     }
//  }));

if(isDeveloping){
  config = require('./webpack.config.js');
  const compiler = webpack(config);
  app.use(express.static('public'));
  app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
    stats: {
    colors: true,
    }
  }));
} else {
  config = require('./webpack.production.config.js');
  app.use(express.static(path.resolve(__dirname, 'dist/')));
  app.get('*', function response(req, res) {
    res.sendFile(
      fs.readFileSync(
        path.join(__dirname, '../dist/index.html')
      )
    );
  });
}



db.on('error', console.error.bind(console, "connection error"));
db.once('open', _ => console.log("Mongo reporting for duty!"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => res.sendFile('public/index.html'));

app.use(graffiti.express({
  schema,
}));

<<<<<<< HEAD
app.get('/test', (req, res) => {
  Animal.find((err, animals) => {
    if (err) res.send(err);
    return res.json(animals);
  });
});

app.post('/test', (req, res) => {
  const animal = new Animal();
  animal.commonName = req.body.commonName;
  animal.save((err) => {
    if (err) return res.send(err);
    return res.send(animal);
  });
});
=======
>>>>>>> production-deploy

app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
