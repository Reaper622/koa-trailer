const Koa = require('koa')
const mongoose = require("mongoose")
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')

const app = new Koa()

;(async () => {
  await connect()

  initSchemas()

  //require('./tasks/movie')
  require('./tasks/api')
})()

app.use(views(resolve(__dirname,'./views'),{
  extension: 'pug'
}))
app.use(async (ctx, next) => {
  await ctx.render('index',{
    you: 'Reaper',
    me: 'ReaperLee'
  })
 })

 app.listen(4455)