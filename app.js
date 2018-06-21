const express = require('express');


const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const base64 = require('base-64');

var utf8 = require('utf8');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var decoded;
var encoded;

app.get('/', function(req, res) {
    res.render('app');
})
app.post('/post', function(req,res){
    decoded = req.body.value;


    var encodedData = base64.encode(decoded)
    res.render('posted', {
        encodedData:encodedData
    });
});



app.get('/encode', function(req,res){
    res.render('encode')
});
app.post('/encode', function(req, res){
    encoded = req.body.value2;
    var decoded1 = base64.decode(encoded);
   
    res.render('encode', {
        decoded1:decoded1
    })
});



const port = 8000 || process.env.PORT;

app.listen(port, function(){
    console.log(`app running on port ${port}`)
})