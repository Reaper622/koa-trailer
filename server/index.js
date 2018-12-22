const Koa = require('koa')
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const mongoose = require('mongoose')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(initWith => initWith(app)),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  await connect()

  initSchemas()

  // 拉取电影列表数据
  // require('./tasks/movie')
  // TODO 为什么一次只能跑一个task？
  // 拉取电影详细数据
  // require('./tasks/api')
  // 拉取视频数据
  // require('./tasks/trailer')
  // 将多媒体资源搬运到七牛
  // require('./tasks/qiniu')

  const app = new Koa()
  // Add render function to the ctx and some options
  await useMiddlewares(app)
  /* app.use(
    views(resolve(__dirname, './views'), {
      extension: 'pug'
    })
  )

  app.use(async (ctx, next) => {
    await ctx.render('index', {
      you: 'Luke',
      me: 'Jiaoguanwen'
    })
  }) */

  app.listen(4455)
})()
