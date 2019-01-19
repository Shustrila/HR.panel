const express        = require("express");
const app            = express();
const http           = require("http").Server(app);
const io             = require("socket.io")(http);
const session        = require("express-session");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");
const SQLiteStore    = require("connect-sqlite3")(session);
const cookiParser    = require("cookie-parser");
const env            = process.env;
const cors           = require("cors");


app.use(bodyParser.urlencoded({ extended: false, }));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cors());
app.use(cookiParser());

// app.use(session({
//     store: new SQLiteStore({
//         table: "sessions",
//         db: `${config.SQLITE.FILE}`,
//         dir: config.SQLITE.DIR,
//     }),
//     secret: config.SECRET_KEY,
//     cookie: {
//         maxAge: (7 * 24 * 60 * 60 * 1000),
//     },
// }));

app.use("/api", require("./app/routes.js").app);
app.use(express.static("dist"));
app.get("/", (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

http.listen((env.PORT || 3000), function () {
    console.log(`http://localhost:${env.PORT}`);
});

io.on("connection", require("./app/User/controller").stateOnlineUser);
