const express = require('express')
var app = express()
const ejs = require('ejs')
const PORT = 5000
const session = require('express-session')
const formidable = require('formidable')
function pre()
{
    app.use(express.static('public'))


    app.set('views', 'pagini');
    app.use(session({
        secret: 'tablou', ///voiam sa injur, dar am zis lasa
        resave: true,
        saveUninitialized: false,
    }));
}


function baga_rute_get()
{
    app.get('/', function(req, res){
        var anc_login, text;
        if ( req.session.user )
        {
            anc_login = '/logout'
            text = 'Logout'
        }
        else
        {
            anc_login = '/login'
            text = 'Login'
        }

        res.render('index.ejs', {referinta: anc_login, textul: text});
    });
    
    app.get('/login', function(req, res){
        res.render('login.ejs')
    })

    app.get('/logout', function(req,res){
        req.session.destroy()

        res.redirect('/')

    })

    app.get('/cumpara', function(req, res){
        res.render('cumpara.ejs')
    })

    app.get('/create_user', function(req, res){
        res.render('create_user.ejs')
    })

    app.get('/date_publice', function(req, res){
        res.render('date_publice.ejs')
    })

}

function User(username, parola)
{
    this.username = username
    this.parola = parola
}

function baga_rute_post()
{
    app.post('/login', function(req, res){
        var forma = new formidable.IncomingForm();
        forma.parse(req, function(err, fields, files)
        {
            user = new User(fields.username, fields.password)
            req.session.user = user;
            res.redirect('/')
        })
        
    })
}

function main()
{
    pre()
    baga_rute_get()
    baga_rute_post()
    app.listen(PORT)
}

main()