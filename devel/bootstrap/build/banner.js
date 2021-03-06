'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap v4.3.1 / Admin UI v0.0.1 (https://github.com/getmim/admin-ui)
  * Copyright 2011-${year} The Bootstrap Authors Author / MIM Dev
  * Licensed under MIT (https://github.com/getmim/admin-ui/blob/master/LICENSE)
  */`
}

module.exports = getBanner
