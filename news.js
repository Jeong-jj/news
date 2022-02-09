function call(cate) {
    var subcate = ""
    if (cate !== 'all') {
        subcate = `category=${cate}&`
    }

    $.ajax({
        type:'GET',
        url:`https://newsapi.org/v2/top-headlines?country=kr&${subcate}apiKey=5669fc983aba41f7b091c3175af09794`,
        dataType:'json',
        beforeSend: function() {
            $('#content').append(`<div class="loading">로딩중입니다.</div>`)
        },
        complete: function() {
            $('#content .loading').remove()
        },
        timeout: 2000, // 요청한 데이터를 불러오는데 기다릴 시간(밀리세컨드)
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            alert(xhr.status + '/' + xhr.errorText )
        }
    })
}
call('all')


function usedata(data) {
    var elem = `<ul class="article">`
    for (let i in data.articles) {
        elem += `<li>`
        elem += `<h2>${data.articles[i].title}</h2>`
        elem += `<img src="${data.articles[i].urlToImage}" alt="">`
        elem += `<p>${data.articles[i].description}</p>`
        elem += `<div>${data.articles[i].author}</div>`
        elem += `</li>`
    }
    elem += `</ul>`
    $('#content').append(elem)
}

$('.tabTit a').on('click', function() {
    var category = $(this).attr('href')
    $('#content .article').remove()
    call(category)

    return false
})