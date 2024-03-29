const express = require('express');
const cors = require('cors');
const userRouter = require('./router/UserRouter');
const draftRouter = require('./router/DraftRouter');
const newsRouter = require('./router/NewsRouter');
const authMiddlewaree = require('./middleware/authMiddlewaree')
const upload = require('./file_onloader')
const ContentService = require('./service/ContentService');

const PORT = 4000;
const app = express();

const bodyparser = require('body-parser');
const renderRouter = require('./router/RenderRouter');
const commentRouter = require('./router/CommentRouter');




const startUp = () => {

    app.use(cors())

    app.use(express.json());
    app.use(bodyparser.urlencoded({ extended: false }));

    app.use(express.static(__dirname + '/views'));
    app.use('/script', express.static(__dirname + '/views/script'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/default', express.static(__dirname + '/default'));

    app.set('view engine', 'ejs');

    app.use('/api', userRouter)
    app.use('/api', draftRouter)
    app.use('/api', newsRouter)
    app.use('/api', commentRouter)
    app.use('/', renderRouter)

    app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}


startUp();


//  render страниц


//  загрузка изобржаний

app.post('/api/save_image', authMiddlewaree, upload.any(), async (req, res) => {

    console.log('Body- ' + JSON.stringify(req.body));
    console.log(req.body.text);
    console.log(req.files)
    let path = "/images";
    let filenameArray = new Array()
    for (let file of req.files) {
        const image = await ContentService.create(path, file.filename);

        filenameArray.push(image);
    }

    res.json(filenameArray);
})  