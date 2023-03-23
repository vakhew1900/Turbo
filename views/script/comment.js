
async function  sendComment(){
    news_id = news_id = window.location.href.split('/').pop(); 

    const text_content = document.querySelector('.comment-textarea').value;

    console.log(': ' + text_content)
    const body = {
        news_id : news_id,
        text_content: text_content
    }


    if(text_content ===''){
        return;
    }

    let headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8'
      }

    const url = pref + '/api/comment';
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }
    )
    
}


function addComment(){

}

const commentButton = document.querySelector('.comment-btn');

commentButton.onclick = (e) => {
    e.preventDefault();
    sendComment();
}


