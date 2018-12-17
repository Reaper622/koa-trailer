
const rp = require('request-promise-native')

async function fetchMovie (item){
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

  const res = await rp(url)

  return res
}

;(async () => {
  let movies =  [
    { 
      doubanId: 3168101,
      title: '毒液：致命守护者',
      rate: 7.3,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2537158013.jpg' 
    },
    { 
      doubanId: 20438964,
      title: '无敌破坏王2：大闹互联网',
      rate: 8.2,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2537667301.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    
    try{
      movieData = JSON.parse(movieData)
      console.log(movieData.tags)
      console.log(movieData.summary)
    }catch (err) {
      console.log(err);
    }

    console.log(movieData);
  })
})()