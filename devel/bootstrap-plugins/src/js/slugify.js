/**
 * --------------------------------------------------------------------------
 * Bootstrap Slugify (v0.0.1): slugify.js
 * Licensed under MIT (https://github.com/iqbalfn/bootstrap-slugify/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'slugify'
const VERSION            = '0.0.1'
const DATA_KEY           = 'bs.slugify'
const EVENT_KEY          = `.${DATA_KEY}`
const DATA_API_KEY       = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Default = {}

const DefaultType = {}

const Event = {
    INPUT_DATA_API      : `input${EVENT_KEY}${DATA_API_KEY}`,
    FOCUS_DATA_API      : `focus${EVENT_KEY}${DATA_API_KEY}`
}

const ClassName = {}

const Selector = {}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Slugify {
    constructor(element, config) {
        this._element   = element
        this._source    = document.querySelector(config.source)

        if(this._element.value)
            return
        
        this._addElementListener()
        this._addSourceListener()
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Public

    // Private

    _addElementListener(){
        $(this._element).on(Event.FOCUS_DATA_API, e => {
            $(this._source).off(Event.INPUT_DATA_API)
        })
    }

    _addSourceListener(){
        $(this._source).on(Event.INPUT_DATA_API, e => {
            this._element.value = this._source.value
                .toLowerCase()
                .replace(/[^\w\-]/g, '-')
                .replace(/\-+/g, '-')
                .replace(/^\-|\-$/g, '')
        })
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)
            const _config = {
                ...Default,
                ...$(this).data(),
                ...typeof config === 'object' && config ? config : {}
            }

            if (!data) {
                data = new Slugify(this, _config)
                $(this).data(DATA_KEY, data)
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = Slugify._jQueryInterface
$.fn[NAME].Constructor = Slugify
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Slugify._jQueryInterface
}

export default Slugify