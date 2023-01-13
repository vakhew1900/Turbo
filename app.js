const express = require('express')
const PORT = 4000;




const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

const startUp = () => {

    app.listen(PORT, () => console.log(`server start on ${PORT} port`));
    // console.log(__dirname)
}


startUp();

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) =>{
    res.render('login');
})

app.get('/register', (req, res) =>{
    res.render('register');
})