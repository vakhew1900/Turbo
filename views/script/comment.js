
async function sendComment() {
    news_id = news_id = window.location.href.split('/').pop();

    const text_content = document.querySelector('.comment-textarea').value;

    if (text_content == ''){
        return;
    }

    console.log(': ' + text_content)
    const body = {
        news_id: news_id,
        text_content: text_content
    }


    if (text_content === '') {
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

    if (response.status == 200) {
        const comment = await response.json();
        console.log(JSON.stringify(comment, null, 2));
        addComment(comment);
        clearCommentTextArea();
    }

}


function  clearCommentTextArea(){
    const textarea = document.querySelector('.comment-textarea');
    textarea.value = '';
}

function addComment(comment) {

    const new_comment = document.createElement('div')
    new_comment.classList.add('comment');
    new_comment.innerHTML =
        `
        <div class="comment-meta-info-wrapper aligns-item-start">\
            <div class="comment-avatar height-100"></div>\
            <div class="meta-info">\
            <div class="comment-author height-100" comment_id= ${comment.comment_id} '>' ${comment.user.nickname}</div>\
            <div class="comment-time">Только что</div>\
            </div>\
        </div>\
        <div class="comment-text text-container">${comment.text_content}</div>\
            <div class="comments-button d-flex  content-between">\
        <button class="like">\
        <svg width = "25px" height = "25px" viewBox = "-102.5 -102.5 1230.00 1230.00" class="icon" version = "1.1" xmlns = "http://www.w3.org/2000/svg" fill = "#000000" transform = "rotate(0)matrix(1, 0, 0, 1, 0, 0)" >\
        <g id = "SVGRepo_bgCarrier" stroke-width="0" ></g >\
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.05"></g>\
        <g id = "SVGRepo_iconCarrier" >\
            <path d="M512.8 977.4c-26.1 0-50.1-7.3-71.5-21.7C323.5 897 0 675.3 0 400.5 0 212 153.4 58.6 341.9 58.6c60.5 0 119 15.8 170.9 45.9 51.9-30.1 110.5-45.9 170.9-45.9 188.5 0 341.9 153.4 341.9 341.9 0 274.8-323.5 496.6-441.3 555.2-21.4 14.4-45.4 21.7-71.5 21.7zM341.9 144.1c-141.4 0-256.4 115-256.4 256.4 0 117.2 80.6 225.2 148.2 295.1 86.1 89 187.5 155.2 248.1 184.8l6.1 3.7c15.1 10.8 34.6 10.8 49.7 0l6.1-3.7C604.4 850.7 705.8 784.6 791.8 695.6c67.6-69.9 148.2-177.8 148.2-295.1 0-141.4-115-256.4-256.4-256.4-52.6 0-103.2 16-146.5 46.1L512.8 207.3l-24.5-17.1c-43.2-30.2-93.9-46.1-146.4-46.1z" fill="#8c9097"></path> \
                </g > \
            </svg > \
                </button > \
                <button class="answer">Ответить</button>\
                <button class="other">...</button>\
            </div >`

    const commentList  = document.querySelector('.comment-list');
    commentList.prepend(new_comment);
}

const commentButton = document.querySelector('.comment-btn');

commentButton.onclick = (e) => {
    e.preventDefault();
    sendComment();
}


