const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-trailer'

mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV !== 'production'){
      mongoose.set('debug',true)
    }
  
    mongoose.connect(db,{
      useNewUrlParser: true
    })
  
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++

      if (maxConnectTimes < 5){
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了？修一波')
      }
    })
  
    mongoose.connection.on('err', err => {
      if (maxConnectTimes < 5){
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库挂了？修一波')
      }
    })
  
    mongoose.connection.once('open', () => {
      //测试数据库
      // const Dog = mongoose.model('Dog',{ name: String })
      // const doga = new Dog({ name: '阿尔法'})

      // doga.save().then( () => {
      //   console.log('汪!');
      // })
      resolve()
      console.log('MongoDB Connected successfully!')
    })
  })
}