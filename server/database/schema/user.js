const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const userSchema = new Schema({
  //用户名
  username: {
    unique: true,
    type: String,
  }, 
  email: {
    unique: true,
    type: String,
  },
  password: {
    unique: true,
    type: String,
  },
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
userSchema.pre('save', next => {
  //若为新数据
  if (this.isNew) { 
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
//数据更新时间处理中间件
userSchema.pre('save', next => {
  if (!userSchema.isModified('password')) return next()

  //若为新数据
  if (this.isNew) { 
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('User', userSchema)