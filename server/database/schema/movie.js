const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const movieSchema = new Schema({
  doubanId:{
    unique: true,
    type: String
  }, //豆瓣ID
  rate: Number, //评分
  title: String, //标题
  summary: String, //简介
  video: String, //视频地址
  poster: String, //海报地址
  cover: String, //视频缩略图地址

  videoKey: String, //七牛云视频地址
  posterKey: String, //七牛云海报地址
  coverKey: String, //七牛云视频缩略图地址

  rawTitle: String, //纯英标题
  movieTypes: [String], //类型
  pubdata: Mixed, //上映日期
  year: Number, //年份
  tags: [String],//标签

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//数据更新时间处理中间件
movieSchema.pre('save', next => {
  //若为新数据
  if (this.isNew) { 
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Movie', movieSchema)