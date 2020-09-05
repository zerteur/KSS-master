const express = require('express')
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config()

const routes = require('./routes')
const adminRoutes = require('./routes/admin')
const apiRoutes = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000;

// const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@Cluster0-rmp3c.mongodb.net/test?retryWrites=true&w=majority`
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dnmds.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')

    app.set("views", path.resolve(__dirname, 'views'))
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({
      extended: true
    }))
    app.use(cookieParser());
    app.use(express.json())
    app.use('/api', apiRoutes);

    app.use('/pm', adminRoutes);

    app.use('/', routes);



    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).render(res.render('error', {
        title: 'Error'
      }));
    });

    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
    })

  })
  .catch(error => {
    console.error(error)
  })