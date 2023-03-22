const news_array = document.querySelectorAll('.news-block');

for (news of news_array) {
    news.onclick = fetchNews;
}

function fetchNews(e) {
    console.log(this.getAttribute('news_id'));

    const url = pref + "/news/" + this.getAttribute('news_id');
    console.log(url)
    window.location.replace(url)
}


async function uploadNews() {


    const news_id_array = Array.from(document.querySelectorAll('.news-block')).map((x) => x.getAttribute('news_id'));

    console.log(news_id_array);

    const body = {
        news_id_array: news_id_array
    };

    const response = await fetch(
        pref + '/api/get_news',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })

    if (response.status != 200) {
        return;
    }

    console.log(response)

    const news_array = await response.json();

    console.log(news_array);

    if (news_array.length == 0){
        return false;
    }

    return true;
}

// uploadNews()


window.onload = async () => {
    // устанавливаем настройки
    const options = {
        // родитель целевого элемента - область просмотра
        // root: document.querySelector('.news-wrapper'),
        // без отступов
        // процент пересечения - половина изображения
        threshold: 0.75
    }


    const observer = new IntersectionObserver((entries, observer) => {
        // для каждой записи-целевого элемента
        entries.forEach(entry => {


            // если элемент является наблюдаемым
            console.log(entry)
            if (entry.isIntersecting) {
                isUpload =  uploadNews();

                if(isUpload === false){
                    observer.unobserve(entry.target);
                }
             }
        })
    }, options)

    const news_block = document.querySelectorAll('.news-block');



    observer.observe(news_block[news_block.length - 1]);
}