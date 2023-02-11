const draftService = require('../service/DraftService')


class DraftController{

    async create(req, res){
        console.log(req.body)
        try{
            const {multiContentNumber, text} = req.body;
            const user = req.user;
            
            const multiContentArr = JSON.parse(multiContentNumber);
            const textArr = JSON.parse(text);
            
            let multiContentArray = []
            let cur = 0;
            
            let path = "/images";
            let filenameArray = new Array()
            for (let file of req.files) {
                
                const obj = {
                    path : path,
                    name : file.filename,
                    number : multiContentArr[cur].number
                }

                multiContentArray.push(obj);
                cur++;
            }
            
            console.log(JSON.stringify(multiContentArray))
            const draft = await draftService.create(user, multiContentArray, textArr);
            res.send(draft);
        }
        catch(e){
            res.status(400).json(e.message);
        }
    }
}

module.exports = new DraftController();