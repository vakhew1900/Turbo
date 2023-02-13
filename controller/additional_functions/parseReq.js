
function reqToPageContent(req, res) {

    try {
        const { multiContentNumber, text } = req.body;
        const user = req.user;

        const multiContentArr = JSON.parse(multiContentNumber);
        const textArr = JSON.parse(text);

        let multiContentArray = []
        let cur = 0;

        let path = "/images";
        for (let file of req.files) {

            const obj = {
                path: path,
                name: file.filename,
                number: multiContentArr[cur].number
            }

            multiContentArray.push(obj);
            cur++;
        }

        return {user:user, multiContentArray: multiContentArray,textArr: textArr};

    }
    catch (e) {
        throw new Error(e.message);
    }

}

module.exports.reqToPageContent = reqToPageContent