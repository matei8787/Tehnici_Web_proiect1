const PRIVATE_STRIPE_KEY = 'sk_test_51KPDshJoqxHUT3I8St2pQpUsMchpmrla8BKa285bFN64IX12uBvDyAdWUOcOIrt8L5cqQ9dU91yu9uP2lwBPjKic00lAJTaaXG' ///ilegal :))
const stripe = require('stripe')(PRIVATE_STRIPE_KEY)
const express = require('express')
var app = express()
const PORT = 5000
const session = require('express-session')
const fs = require('fs')
const DIR_BAZA = './baza_useri'
var bodyParser = require('body-parser')




function pre()
{
    app.use(express.static('public'))
    app.set('view engine','ejs');
    app.set('views', 'pagini');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'tablou', ///voiam sa injur, dar am zis lasa
        resave: true,
        saveUninitialized: false,
    }));
}


async function baga_rute_get()
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
    this.password = parola
}

function exista(username)
{
    let director = DIR_BAZA + '/' + username + '.txt'
    console.log(director)
    if ( !fs.existsSync(director) )
    {
        return false;
    }
    return true;
}

function verifica(username, parola)
{
    if ( !exista(username) )
        return null;
    return new User(username, parola);
}

function baga_rute_post()
{
    app.post('/login', function(req, res){
        const {username, password} = req.body
        console.log(username)
        console.log(password)
        var user = verifica(username, password)
        if ( user == null )
            req.session.user = false;
        else
            req.session.user = user;
        res.redirect('/')
    })

    app.post('/create_user', function(req, res){
        const {username, password} = req.body
        console.log(username)
        console.log(password)
        var user = verifica(username, password)
        if ( user == null )
        {
            let director = DIR_BAZA + '/' + username + '.txt'
            fs.writeFileSync(director, req.body.password)
        }
        else
        {
            req.session.user = user;
        }
        res.redirect('/')
        
    })


    app.post('/cumpara', async function(req, res){
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: [
                {
                    ///aici bag chestii de vandut
                    price: 'price_1KrlElJoqxHUT3I81LBkeT4B',
                    quantity: 10,
                },
            ],
            mode: 'payment',
            return_url: 'http://localhost:5000?session_id={CHECKOUT_SESSION_ID}'
        });
        res.send({clientSecret: session.client_secret});
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