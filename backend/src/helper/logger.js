const Honeybadger = require('@honeybadger-io/js')
Honeybadger.configure({
  apiKey: process.env.HONEY_BADGER_KEY
})

class Logger {
  static notify(err) {
    try {
      Honeybadger.notify(err)
    } catch (err) {
    }
  }
}

const logger = Logger

module.exports = {
  logger
}