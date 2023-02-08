const express = require('express');
const cors = require('cors');
const multer = require('multer');
const userRouter = require('./router/UserRouter');
const draftRouter = require('./router/DraftRouter')
const authMiddlewaree = require('./middleware/authMiddlewaree')

const PORT = 4000;
const app = express();

//  работа с файлами
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}



const upload = multer({ storage: storage, fileFilter: fileFilter });
const bodyparser = require('body-parser')




const startUp = () => {

    app.use(cors())
   
    app.use(express.json());
    app.use(bodyparser.urlencoded({ extended: false }));
    
    app.use(express.static(__dirname + '/views'));
    app.use('/script', express.static(__dirname + '/views/script'));
    app.use('/images', express.static(__dirname + '/images'));
    
    app.set('view engine', 'ejs');
   
    app.use('/api', userRouter)
    app.use('/api', draftRouter)

    app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}


startUp();


//  render страниц

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/redactor', (req, res) => {
    res.render('redactor');
})


//  загрузка изобржаний

const MultiContentService = require('./service/MultiContentService')
app.post('/api/save_image',authMiddlewaree, upload.any(), async (req, res) => {

    console.log('Body- ' + JSON.stringify(req.body));
    console.log(req.files)
    let path = "/images";
    let filenameArray = new Array()
    for (let file of req.files) {
        const image = await MultiContentService.create(path, file.filename);

        filenameArray.push(image);
    }

    res.json(filenameArray);
})  