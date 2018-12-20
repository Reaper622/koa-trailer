const Koa = require('koa')
const mongoose = require("mongoose")
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init')
const router = require('./routes/movie')
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
        ),
        require,
        name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}
const app = new Koa()

;(async () => {
  await connect()

  initSchemas()

  //require('./tasks/movie')
  // require('./tasks/api')


  // await useMiddlewares(app)

  app.listen(4455)
})()



