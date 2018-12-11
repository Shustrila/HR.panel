const express        = require('express');
const app            = express();
const session        = require('express-session');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const methodOverride = require('method-override');
const SQLiteStore    = require('connect-sqlite3')(session);
const http           = require('http').Server(app);
const io             = require('socket.io')(http);
const env            = process.env;

let config    = require('./app/config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());

app.use(session({
    store: new SQLiteStore({
        table: 'sessions',
        db: `${config.SQLITE.FILE}`,
        dir: config.SQLITE.DIR
    }),
    secret: config.SECRET_KEY,
    cookie: {
        maxAge: (7 * 24 * 60 * 60 * 1000)
    }
}));

app.use('/api', require('./app/router.js'));
app.use(express.static('dist'));

app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen((env.PORT || 3000), function () {
    console.log(`http://localhost:${env.PORT}`)
});
