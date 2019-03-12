/*
  Please add all Javascript code to this file.
*/

// (1)
//During open or refresh the page will take all data of 3 news API
let urls = [
  'https://newsapi.org/v2/top-headlines?country=sa&apiKey=db51dfda8508451f93cae2929f2dc4be',
  'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=W4Eadrqvv8ucdbocPYbetFHMoXSjXwF0',
  'https://content.guardianapis.com/search?api-key=b1e70ce0-6792-48b6-be2f-fc21bbf44623'
];

// make fetch requests
Promise.all(urls.map(url => fetch(url)))
  // map each response to response.json()
.then(responses => Promise.all(
  responses.map(r => r.json())
))
  // take news then push each in one Array
.then(nwesAPIs => {  
  let newsArray = []
  for(let news of nwesAPIs) {
    newsArray.push(news)
  }

  //Take all news and put in opject inside one Array and make it in same keys for random show during refrsh or first open
  //News API
  let newsArrays = [] 
  for(i=0; i < newsArray[0].articles.length; i++){
    newsArrays.push({
      title: newsArray[0].articles[i].title,
      url: newsArray[0].articles[i].url,
      content: newsArray[0].articles[i].content,
      image: newsArray[0].articles[i].urlToImage
    })
  }
  //NY Times
  for(i=0; i < newsArray[1].results.length; i++){
    console.log(i)
    newsArrays.push({
      title: newsArray[1].results[i].title,
      url: newsArray[1].results[i].url,
      content: newsArray[1].results[i].abstract,
      image: newsArray[1].results[i].thumbnail_standard
    })
  }
  //Gardian news
  for(i=0; i < newsArray[2].response.results.length; i++){
    newsArrays.push({
      title: newsArray[2].response.results[i].webTitle,
      url: newsArray[2].response.results[i].webUrl,
      content: 'To read the article click here', //no content in gardian news
      image: "" //no image in gardian news
    })
  }
  //take total length for news for forloop
  let total = newsArray[2].response.results.length + newsArray[1].results.length + newsArray[0].articles.length
  
  mainSection.innerHTML = "" //during refresh need delete all previuse news to clean the page
  for(i = 0; i < 20; i++){ // show 20 news first after scroll down show the rest 
    const article = document.createElement('article')
    const imageSection = document.createElement('section')
    const image = document.createElement('img')
    const articleSection = document.createElement('section')
    const anchor = document.createElement('a')
    const hThree = document.createElement('h3')
    const hSix = document.createElement('h6')
    const impressinveSection = document.createElement('section')
    const divdiv = document.createElement('div')

    // append to document 
    mainSection.appendChild(article)
    article.appendChild(imageSection)
    imageSection.appendChild(image)
    article.appendChild(articleSection)
    articleSection.appendChild(anchor)
    anchor.appendChild(hThree)
    articleSection.appendChild(hSix)
    article.appendChild(impressinveSection)
    article.appendChild(divdiv)

    //add class to elements
    article.className = "article"
    imageSection.className = "featuredImage"
    articleSection.className = "articleContent"
    impressinveSection.className = "impressions"
    impressinveSection.textContent = `${Math.floor(Math.random()*600)}`
    divdiv.className = "clearfix"
  }
  //here get all class related to article contect and image then start looping 
  var articleContent = document.querySelectorAll('.articleContent')
  var image = document.querySelectorAll('.featuredImage')


  for (var a=[],i=0;i<total;++i) a[i]=i;
  function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }
  a = shuffle(a);
  
  for(i = 0; i < 20; i++){
    // here start to insert the content of images which pushed on Array with good catograize 
    articleContent[i].querySelector('h3').innerText = newsArrays[a[i]].title
    articleContent[i].querySelector('a').href = newsArrays[a[i]].url
    articleContent[i].querySelector('a').target = "_blank"
    articleContent[i].querySelector('a').className = "popUpWindow"
    articleContent[i].querySelector('h6').innerText = newsArrays[a[i]].content
    image[i].querySelector('img').src = newsArrays[a[i]].image
  }
   //open popUp Page for article
   const pageLink = document.querySelectorAll('.popUpWindow')
   Array.from(pageLink).forEach(function(link){
   link.addEventListener('click', function(e){
     window.open(e.target.parentElement.href,'_blank','height=300px, width=700px')
     })
   })
  //here start load page after scorill it down after 20 news.
  let j = 0
  $(document).scroll(function(){
    
    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        loadNewData();
    }
  });
  function loadNewData(){
    j += 1
    if(j<=1){ // after one scroll stop scrolling
      alert('loadingNewData');

      for(i = 20; i < total; i++){
        //create elements
        const article = document.createElement('article')
        const imageSection = document.createElement('section')
        const image = document.createElement('img')
        const articleSection = document.createElement('section')
        const anchor = document.createElement('a')
        const hThree = document.createElement('h3')
        const hSix = document.createElement('h6')
        const impressinveSection = document.createElement('section')
        const divdiv = document.createElement('div')

        // append to document
        mainSection.appendChild(article)
        article.appendChild(imageSection)
        imageSection.appendChild(image)
        article.appendChild(articleSection)
        articleSection.appendChild(anchor)
        anchor.appendChild(hThree)
        articleSection.appendChild(hSix)
        article.appendChild(impressinveSection)
        article.appendChild(divdiv)

        //add class to elements
        article.className = "article"
        imageSection.className = "featuredImage"
        articleSection.className = "articleContent"
        impressinveSection.className = "impressions"
        impressinveSection.textContent = `${Math.floor(Math.random()*600)}`
        divdiv.className = "clearfix"
      }
      var articleContent = document.querySelectorAll('.articleContent')
      var image = document.querySelectorAll('.featuredImage')

      for(i = 20; i < total; i++){
        articleContent[i].querySelector('h3').innerText = newsArrays[a[i]].title
        articleContent[i].querySelector('a').href = newsArrays[a[i]].url
        articleContent[i].querySelector('a').target = "_blank"
        articleContent[i].querySelector('a').className = "popUpWindow"
        articleContent[i].querySelector('h6').innerText = newsArrays[a[i]].content
        image[i].querySelector('img').src = newsArrays[a[i]].image
      }
      //open popUp Page for article
      const pageLink = document.querySelectorAll('.popUpWindow')
      Array.from(pageLink).forEach(function(link){
      link.addEventListener('click', function(e){
        window.open(e.target.parentElement.href,'_blank','height=300px, width=700px')
        })
      })
    }
  }
})
 
// (2)
//take NwesAPI when press the link
const mainSection = document.querySelector('#main')
const newNews = document.getElementsByClassName('NewsAPI')
newNews[0].addEventListener('click', function(e) {
  e.preventDefault();
  $(document).ready(function(){
    const Url = 'https://newsapi.org/v2/top-headlines?country=sa&apiKey=db51dfda8508451f93cae2929f2dc4be';
    // $('.btn').click(function(){
    $.ajax({
      url: Url,
      // data:{api: 'db51dfda8508451f93cae2929f2dc4be'},
      type: "GET",
      success: function(result){
        mainSection.innerHTML = ""
        for(i = 0; i < result.articles.length; i++){
          //create elements
          const article = document.createElement('article')
          const imageSection = document.createElement('section')
          const image = document.createElement('img')
          const articleSection = document.createElement('section')
          const anchor = document.createElement('a')
          const hThree = document.createElement('h3')
          const hSix = document.createElement('h6')
          const impressinveSection = document.createElement('section')
          const divdiv = document.createElement('div')

          // append to document
          mainSection.appendChild(article)
          article.appendChild(imageSection)
          imageSection.appendChild(image)
          article.appendChild(articleSection)
          articleSection.appendChild(anchor)
          anchor.appendChild(hThree)
          articleSection.appendChild(hSix)
          article.appendChild(impressinveSection)
          article.appendChild(divdiv)

          //add class to elements
          article.className = "article"
          imageSection.className = "featuredImage"
          articleSection.className = "articleContent"
          impressinveSection.className = "impressions"
          impressinveSection.textContent = `${Math.floor(Math.random()*600)}`
          divdiv.className = "clearfix"
        }
        var articleContent = document.querySelectorAll('.articleContent')
        var image = document.querySelectorAll('.featuredImage')
        
        
        for(i = 0; i < result.articles.length; i++){
          articleContent[i].querySelector('h3').innerText = result.articles[i].title
          articleContent[i].querySelector('a').href = result.articles[i].url
          articleContent[i].querySelector('a').target = "_blank"
          articleContent[i].querySelector('a').className = "popUpWindow"
          articleContent[i].querySelector('h6').innerText = result.articles[i].content
          image[i].querySelector('img').src = result.articles[i].urlToImage
        }
        //open popUp Page for article
        const pageLink = document.querySelectorAll('.popUpWindow')
        Array.from(pageLink).forEach(function(link){
        link.addEventListener('click', function(e){
          console.log(e.target.parentElement.href)
          window.open(e.target.parentElement.href,'_blank','height=300px, width=700px')
          })
        })
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
      
    })
  })
})
//  (3)
//take NYT when press the link
const newNews2 = document.getElementsByClassName('NYT')
newNews2[0].addEventListener('click', function(e) {
  e.preventDefault();
  $(document).ready(function(){
    const Url = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=W4Eadrqvv8ucdbocPYbetFHMoXSjXwF0';
    $.ajax({
      url: Url,
      type: "GET",
      success: function(result){
        mainSection.innerHTML = ""
        for(i = 0; i < result.results.length; i++){
          //create elements
          const article = document.createElement('article')
          const imageSection = document.createElement('section')
          const image = document.createElement('img')
          const articleSection = document.createElement('section')
          const anchor = document.createElement('a')
          const hThree = document.createElement('h3')
          const hSix = document.createElement('h6')
          const impressinveSection = document.createElement('section')
          const divdiv = document.createElement('div')

          // append to document
          mainSection.appendChild(article)
          article.appendChild(imageSection)
          imageSection.appendChild(image)
          article.appendChild(articleSection)
          articleSection.appendChild(anchor)
          anchor.appendChild(hThree)
          articleSection.appendChild(hSix)
          article.appendChild(impressinveSection)
          article.appendChild(divdiv)

          //add class to elements
          article.className = "article"
          imageSection.className = "featuredImage"
          articleSection.className = "articleContent"
          impressinveSection.className = "impressions"
          impressinveSection.textContent = `${Math.floor(Math.random()*600)}`
          divdiv.className = "clearfix"
        }
        var articleContent = document.querySelectorAll('.articleContent')
        var image = document.querySelectorAll('.featuredImage')
        
        for(i = 0; i < result.results.length; i++){
          articleContent[i].querySelector('h3').innerText = result.results[i].title
          articleContent[i].querySelector('a').href = result.results[i].url
          articleContent[i].querySelector('a').target = "_blank"
          articleContent[i].querySelector('a').className = "popUpWindow"
          articleContent[i].querySelector('h6').innerText = result.results[i].abstract
          image[i].querySelector('img').src = result.results[i].thumbnail_standard
        }
        //open popUp Page for article
        const pageLink = document.querySelectorAll('.popUpWindow')
        Array.from(pageLink).forEach(function(link){
        link.addEventListener('click', function(e){
          console.log(e.target.parentElement.href)
          window.open(e.target.parentElement.href,'_blank','height=300px, width=700px')
          })
        })
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
      
    })
  })
})
// (4)
//take Gardian news when press the link
const newNews3 = document.getElementsByClassName('AWJ')
newNews3[0].addEventListener('click', function(e) {
  e.preventDefault();
  $(document).ready(function(){
    const Url = 'https://content.guardianapis.com/search?api-key=b1e70ce0-6792-48b6-be2f-fc21bbf44623';
    $.ajax({
      url: Url,
      type: "GET",
      success: function(result){
        mainSection.innerHTML = ""
        for(i=0; i < result.response.results.length; i++){
          //create elements
          const article = document.createElement('article')
          const imageSection = document.createElement('section')
          const image = document.createElement('img')
          const articleSection = document.createElement('section')
          const anchor = document.createElement('a')
          const hThree = document.createElement('h3')
          const hSix = document.createElement('h6')
          const impressinveSection = document.createElement('section')
          const divdiv = document.createElement('div')

          // append to document
          mainSection.appendChild(article)
          article.appendChild(imageSection)
          imageSection.appendChild(image)
          article.appendChild(articleSection)
          articleSection.appendChild(anchor)
          anchor.appendChild(hThree)
          articleSection.appendChild(hSix)
          article.appendChild(impressinveSection)
          article.appendChild(divdiv)

          //add class to elements
          article.className = "article"
          imageSection.className = "featuredImage"
          articleSection.className = "articleContent"
          impressinveSection.className = "impressions"
          impressinveSection.textContent = `${Math.floor(Math.random()*600)}`
          divdiv.className = "clearfix"
        }
        var articleContent = document.querySelectorAll('.articleContent')
        var image = document.querySelectorAll('.featuredImage')
        
        for(i = 0; i < result.response.results.length; i++){
          articleContent[i].querySelector('h3').innerText = result.response.results[i].webTitle
          articleContent[i].querySelector('a').href = result.response.results[i].webUrl
          articleContent[i].querySelector('a').target = "_blank"
          articleContent[i].querySelector('a').className = "popUpWindow"
          articleContent[i].querySelector('h6').innerText = 'To read the article click here'
          image[i].querySelector('img').src = ""
        }
        //open popUp Page for article
        const pageLink = document.querySelectorAll('.popUpWindow')
        Array.from(pageLink).forEach(function(link){
          link.addEventListener('click', function(e){
            console.log(e.target.parentElement.href)
            window.open(e.target.parentElement.href,'_blank','height=300px, width=700px')
            })
        })
      },
      error: function(error){
        console.log(`Error ${error}`)
      }
      
    })
  })
})
// (5)
//reload the page to show all news
function myFunction() {
  location.reload();
}
//   (6)
//search button hide and appear
document.querySelector('.searchBox').hidden = true
const searchBtn = document.querySelector('.searchBtn')
searchBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if(document.querySelector('.newsBtn').hidden){
    document.querySelector('.searchBox').hidden = true
    document.querySelector('.newsBtn').hidden = false
  } else {
    document.querySelector('.newsBtn').hidden = true
    document.querySelector('.searchBox').hidden = false
  }
})

// (7)
//search by filtering news
const searchInput = document.getElementById('search').querySelector('input');
searchInput.addEventListener('keyup', function(e){
  const term = e.target.value.toLowerCase()
  const newses = document.querySelectorAll('.article');
  Array.from(newses).forEach(news => {
    const title = news.querySelector('h3').textContent
    if(title.toLowerCase().indexOf(term) != -1){
      news.hidden= false;
    }else{
      news.hidden = true;
    }
  })
})



