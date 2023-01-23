const express = require('express')
const cors = require('cors');
const multer = require('multer')

const PORT = 4000;
const app = express();
const upload = multer({ dest: 'images/' });
const bodyparser = require('body-parser')

app.use(cors())
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
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

app.get('/redactor', (req, res) =>{
    res.render('redactor');
})

app.post('/api/save_image', upload.any(), async (req, res) => {
    
    console.log('Body- ' + JSON.stringify(req.body));
    console.log(req.files)
})  