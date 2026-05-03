'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Admin UI v0.0.1 (https://github.com/getmim/admin-ui)
  * Copyright 2011-${year} MIM Dev
  * Licensed under MIT (https://github.com/getmim/admin-ui/blob/master/LICENSE)
  */`
}

module.exports = getBanner
