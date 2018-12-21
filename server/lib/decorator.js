const Router = require('koa-router')
const { resolve } = require('path')
const _ = require('lodash')
const glob = require('glob')

const symbolPrefix = Symbol('prefix')

// 创建一个空集合
const routerMap = new Map()

const isArray = c => (_.isArray(c) ? c : [c])

export class Route {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init() {
    // require 路由文件
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)

    for (let [conf, controller] of routerMap) {
      // 多个处理方法
      console.log(routerMap)
      console.log(conf)
      console.log(controller)
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }

    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

const normalizePath = path => (path.startsWith('/') ? path : `/${path}`)

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  // 这里意味着一个路由只有一个处理函数，相加多个处理函数，在当前代码下，得写多个装饰器
  // map中的key是对象的话，就是引用类型，即使这个对象的字面量是一样的，但是对于map来说，这也是两条数据
  routerMap.set(
    {
      target,
      ...conf
    },
    target[key]
  )
}

// 装饰器 方法 对象属性挂载到原型上 唯一性
export const controller = path => target => (target.prototype[symbolPrefix] = path)

// 装饰器方法  get
export const get = path =>
  router({
    method: 'get',
    path
  })

// 装饰器方法  post
export const post = path =>
  router({
    method: 'post',
    path
  })

export const put = path =>
  router({
    method: 'put',
    path
  })

export const del = path =>
  router({
    method: 'del',
    path
  })

export const use = path =>
  router({
    method: 'use',
    path
  })

export const all = path =>
  router({
    method: 'all',
    path
  })
