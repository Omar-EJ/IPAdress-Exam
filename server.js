const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//User Api
const api = require('./routes/user-routes')
const ipApi = require('./routes/adress-ip-routes')
const path = require('path')

//DB CONN
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://mongoauth:mongoauth.1@cluster0.vpmek.mongodb.net/Test?retryWrites=true&w=majority'
,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
    console.log('Connected to DB')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remove MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express/CORS settings
const app = express();
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false

}));


app.use('/public', express.static('public'));

app.use('/user', api)
app.use('/ip', ipApi)

app.use('/',express.static(path.join(__dirname,'angular')))

app.get('',(req,res)=>{
  res.sendFile(path.join(__dirname,'angular','index.html'))
})

// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
