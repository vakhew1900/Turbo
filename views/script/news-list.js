const news_array = document.querySelectorAll('.news-block');

for(news of news_array){
    news.onclick = fetchNews;
}

function fetchNews(e){
    console.log(this.getAttribute('news_id'));

    const url = pref + "/news/" + this.getAttribute('news_id');
    console.log(url)
    window.location.replace(url)
}