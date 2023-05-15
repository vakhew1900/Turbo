import {makeAdaptiveTextArea} from './adaptive-textarea.js'

// обработчик события вставки привязан ко все странице
let x = false;

document.onpaste = function (pasteEvent) {

    // получаем первый элемент содержимого буфера обмена
    let item = pasteEvent.clipboardData.items[0];

    console.log(pasteEvent.clipboardData.items[1]);

    if (pasteEvent.clipboardData.items.length >= 2){
        const tmp_item = pasteEvent.clipboardData.items[1];

        if (tmp_item.type.indexOf("image") === 0){
            item = tmp_item;
        }
    }


    const element = pasteEvent.target;

    if (element.nodeName != 'TEXTAREA') {
        return;
    }

    


    console.log('ffff');
    console.log(element.value);
    
    // смотрим, является ли элемент изображением
    if (item.type.indexOf("image") === 0) {

        // преобразуем содержимое первого элемента буфера обмена в файл
        const blob = item.getAsFile();

        // создаем объект, считывающий файлы
        const reader = new FileReader();

        // когда файл загрузится
        reader.onload = function (event) {
            // вставляем его на страницу
            const src = event.target.result;
            console.log(src)
            const mainImageContainer = createImageContainerByScr(src);
            element.after(mainImageContainer);
            const textarea = createTextArea();
            mainImageContainer.after(textarea);
            makeAdaptiveTextArea(textarea)
            // makeTabulation(textarea)

        };

        reader.readAsDataURL(blob);
    }
    else {
        const str = item.getAsString();
        console.log(str)
    }
}

const createTextArea = () => {
    const textarea = document.createElement('textarea');
    textarea.placeholder = "Написать";
    textarea.classList.add('content-unit');
    textarea.classList.add('text-container');
    return textarea;
}

const createMainImageContainer = (image) => {
    // console.log('1111')
    let mainImageContainer = document.createElement('div');
    console.log(mainImageContainer);
    mainImageContainer.classList.add('main-image-container');
    mainImageContainer.appendChild(image);
    console.log(mainImageContainer);
    return mainImageContainer;
}

const createImg = (src) => {
    let img = document.createElement('img');
    console.log(img)
    img.src = src;
    img.classList.add('content-unit');
    return img;
}

const createImageContainerByScr = (src) => {
    let img = createImg(src);
    let mainImageContainer = createMainImageContainer(img);
    return mainImageContainer;
}


var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for (var i = 0; i < count; i++) {

    // makeTabulation(textareas[i]);
    makeAdaptiveTextArea(textareas[i])

}

// function makeTabulation(textarea) {

//     textarea.onkeydown = function (e) {
//         if (e.keyCode == 9 || e.which == 9) {
//             e.preventDefault();
//             var s = this.selectionStart;
//             this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
//             this.selectionEnd = s + 1;
//         }
//     }
// }





