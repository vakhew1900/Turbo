const express = require('express')
const PORT = 4000;




const app = express();
app.use(express.json());
app.use(express.static('views'));

const startUp = () => {

    app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}

startUp();

