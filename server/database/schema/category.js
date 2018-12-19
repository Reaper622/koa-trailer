const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  movies: [{
    type: ObjectId,
    ref: 'Moive' //指向模型
  }],
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
categorySchema.pre('save', function (next) {
  //若为新数据
  if (this.isNew) { 
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('Category', categorySchema)