const { response } = require("express");


function findAllImg() {
  let links = Array.from(document.querySelectorAll('.main-image-container > img')).map(x => { return x.src });
  //  console.log(links)

  console.log(links);


  blobArray = Array()
  for (let fileData of links) {
    let parts, type, base64Data;
    parts = fileData.split(',');
    type = parts[0];
    base64Data = parts[1];
    type = type.split(';')[0].split(':')[1];
    console.log(base64Data + ' ' + type);
    let blob = b64toBlob(base64Data, type)
    blobArray.push(blob)
  }


  return blobArray;
}

async function sendDraft() {

  blobArray = findAllImg();

  let form = new FormData();

  let cur = 0;
  for (let blob of blobArray) {
    form.append('image', blob);
    console.log('1111')
  }


  console.log(form.get('image'));
  form.append('hui', 1);
  // console.log(form.get('image'))

  const url = pref + '/api/save_image'

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
  const redactorBlock = createSendHtml(filenames)
  await fetchDraft(redactorBlock)
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


async function fetchDraft(redactorBlock) {
  const url = pref + "/api/drafts";
  const body = parseRedactorBlock(redactorBlock);
  console.log(body);

  
  let headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })

  const result = await response.json();
  console.log(result);
}

function parseRedactorBlock(redactorBlock) {

  const html_content = redactorBlock.outerHTML;
  const images = redactorBlock.querySelectorAll('.main-image-container>img');

  let multiContentArray = [];

  for (let image of images) {
    const image_id = image.getAttribute('image-id');
    console.log(image_id);
    const multi_content = {
      content_id: image_id
    }
    multiContentArray.push(multi_content);
  }

  return { html_content, multiContentArray };
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
