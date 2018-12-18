const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)

const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac,cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise( (resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret ,info) => {
      if(err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        }else{
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  console.log('执行');
  let movies = [
    { 
      video: 'http://vt1.doubanio.com/201812172041/c611adce953d320859e2d9d07df134bb/view/movie/M/402400074.mp4',
      doubanId: '3878007',
      cover: 'https://img1.doubanio.com/img/trailer/medium/2541280237.jpg',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2537158013.jpg'
    }
  ]

  movies.map(async movie => {
    if(movie.video && !movie.key){
      try{
        console.log('开始传video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('开始传poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')

        if(videoData.key) {
          movie.videoKey = videoData.key;
        }
        if(coverData.key) {
          movie.coverKey = coverData.key;
        }
        if(posterData.key) {
          movie.posterKey = posterData.key;
        }

        console.log(movie)
      }catch(err){
        console.log(err)
      }
    }
  })
})()

