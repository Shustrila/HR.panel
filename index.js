const express       = require('express');
const app           = express();
const http          = require('http').Server(app);
const bodyParser    = require('body-parser');
const io            = require('socket.io')(http);
const router        = require('./app/router.js');

let env       = process.env;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.use('/api', router);

app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen((env.PORT || 3000), function () {
    console.log(`*:${env.PORT}`)
});
