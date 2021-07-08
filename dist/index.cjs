
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./make-color-more-chill.production.min.cjs')
} else {
  module.exports = require('./make-color-more-chill.development.cjs')
}
