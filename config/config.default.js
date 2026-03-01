/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1764587946037_9672'

  // add your middleware config here
  config.middleware = []

  // 關閉csrf功能，使可直接獲取PUT POST等請求資料
  config.security = {
    csrf: { enable: false },
  }

  // 當發生錯誤時，進行錯誤回傳
  config.onerror = {
    all: (err, ctx) => {
      ctx.response.errorHandle(err, ctx)
    },
  }

  // Cloud Run 需要服務監聽在 0.0.0.0:${PORT}
  config.cluster = {
    listen: {
      port: Number(process.env.PORT || 7001),
      hostname: process.env.EGG_SERVER_ENV === 'prod' ? '0.0.0.0' : '127.0.0.1',
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
