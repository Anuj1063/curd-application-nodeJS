
require('dotenv').config();
const express = require('express');
const path = require('path');

const db = require('./config/db');
const app = express();
const session = require('express-session');
const flash = require("connect-flash");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'MyS3CR3T#@!@CGGmn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_message = req.flash("success");
    res.locals.error_message = req.flash("error");
    next();
});

app.use(require('./routes/student.routes'));

app.listen(process.env.PORT, async () => {
    await db.connectDb();
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`)
})