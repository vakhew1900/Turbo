

function convertLinkToBlob(element) {

  const fileData = element.src;
  console.log(element)
  let parts, type, base64Data;
  console.log(fileData)
  parts = fileData.split(',');
  type = parts[0];
  base64Data = parts[1];
  type = type.split(';')[0].split(':')[1];
  console.log(base64Data + ' ' + type);
  let blob = b64toBlob(base64Data, type);

  return blob;
}


function createFormData() {

  let form = new FormData();


  const contentUnits = document.querySelectorAll('.content-unit');

  let textArray = [];
  let multiContentNumber = [];
  let cur = 0;
  let images = []
  for (let contentUnit of contentUnits) {
    console.log(contentUnit.nodeType)
    if (contentUnit.nodeName == 'TEXTAREA') {
      const content = {
        text: contentUnit.value,
        number: cur
      }
      textArray.push(content)
    }

    else {
      const content = {
        number: cur
      }

      images.push(convertLinkToBlob(contentUnit));
      multiContentNumber.push(content);
    }

    cur++;
  }


  form.append('text', JSON.stringify(textArray));
  form.append('multiContentNumber', JSON.stringify(multiContentNumber));
  images.map(x => { form.append('image', x); })
  console.log(form.get('image'));

  return form;
}

async function sendDraft() {

  const form = createFormData();
  const url = pref + '/api/drafts'

  let headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: form
  })

  const filenames = await res.json();
  console.log(filenames)
}


async function sendNews() {

  const form = createFormData();
  const url = pref + '/api/news'

  let headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: form
  })

  const news = await res.json();

  if (res.status == 200){
    window.location.replace(pref + '/news' + '/' + news.news_id);
  }
  else if (res.status == 403){
     console.log('sdfdsfddfsdsfds');
    window.location.href = '/login';
  }
  else {
     alert('Произошла ошибка. Извините');
  }

  console.log(filenames)
}




function createSendHtml(filenames) {

  const redactorBlock = document.querySelector('.redactor-block').cloneNode(true);
  const images = redactorBlock.querySelectorAll('.main-image-container>img')
  for (let i = 0; i < filenames.length; i++) {

    images[i].src = pref + filenames[i].path + "/" + filenames[i].name;
    console.log(filenames[i].content_id);
    images[i].setAttribute("image-id", filenames[i].content_id)
  }

  console.log(redactorBlock)

  return redactorBlock;
}



// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
