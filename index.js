const express = require('express')
const app = express();

app.set('view-engine','ejs');
app.use(express.urlencoded({extended: false}));

const user_db = [];

app.get('/api/:name', (req,res) => {

    res.render('index.ejs',{name:req.params.name});
});

app.get('/login', (req,res) => {

    res.render('login.ejs');
});

app.get('/register', (req,res) => {

    res.render('register.ejs');
});

app.post('/register', (req,res) => {

    const details = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    
    user_db.push(details);
    console.log(user_db);
    res.redirect('/login');

});

app.post('/login', (req,res) => {

    const user = user_db.find( u => u.name === req.body.name);
    if(!user || (user.password != req.body.password))   return res.status(404).send('Invalid login details');
    else    res.redirect(`/api/${user.name}`);
});

app.listen(3000);