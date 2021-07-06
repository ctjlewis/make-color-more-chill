
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./make-color-more-chill-test.production.min.cjs')
} else {
  module.exports = require('./make-color-more-chill-test.development.cjs')
}
