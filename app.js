const express = require('express')
const cors = require('cors');
const multer = require('multer')
const fs = require('fs');

const PORT = 4000;
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+ '/images/')
      },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})

const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

  

const upload = multer({storage : storage, fileFilter: fileFilter});
const bodyparser = require('body-parser')

app.use(cors())
app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/views'));
app.use('/images', express.static(__dirname + '/images'));
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
    let filenameArray = new Array()

    for(let file of req.files){
        filenameArray.push(file.filename)
    }

    res.send(filenameArray);
})  