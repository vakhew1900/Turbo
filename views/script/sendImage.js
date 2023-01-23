
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

const url = 'http://localhost:4000/api/save_image'

async function sendImage() {

  blobArray = findAllImg();

  let form = new FormData();

  let cur = 0;
  for (let blob of blobArray) {
    form.append('image', blob);
    console.log('1111')
  }


  console.log(form.get('image'));
  form.append('hui', 1);
  
  console.log(form.get('image'))
  const res = await fetch(url, {
    method: 'POST',
    // headers: {
    //   'Content-Type': "multipart/form-data; charset",
    // },
    body: form
  })

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
