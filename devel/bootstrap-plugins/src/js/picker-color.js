/**
 * --------------------------------------------------------------------------
 * Bootstrap Picker Color (v0.0.2): picker-color.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'pickercolor'
const VERSION            = '0.0.2'
const DATA_KEY           = 'bs.pickercolor'
const EVENT_KEY          = `.${DATA_KEY}`
const DATA_API_KEY       = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Default = {
    input       : null,
}

const DefaultType = {
    input       : '(element|string)',
}

const Event = {
    CHANGE      : `change${EVENT_KEY}${DATA_API_KEY}`
}

const COLOR_REGEX_STR = '^#[a-fA-F0-9]{6}'
const COLOR_REGEX = new RegExp(COLOR_REGEX_STR)

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class PickerColor {

    constructor(element, config) {
        this._config    = this._getConfig(config)
        this._element   = element
        this._input     = config.input

        if(typeof config.input === 'string')
            this._input = document.querySelector(config.input)

        this._modifyElement()
        this._addElementListener()

        this._input.value = this._element.value
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Private

    _getConfig(config) {
        config = {
          ...Default,
          ...config
        }
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    _addElementListener(){
        $(this._element).on(Event.CHANGE, e => {
            this._input.value = e.target.value.toUpperCase()
            this._inputChanges()
        })

        $(this._input).on(Event.CHANGE, e => this._inputChanges())
    }

    _inputChanges(){
        let val = this._input.value
        if(COLOR_REGEX.test(val)){
            this._input.setCustomValidity('')
            this._element.value = this._input.value
        }else{
            this._input.setCustomValidity('Please enter valid HEX color')
        }
    }

    _modifyElement(){
        let re = this._input.getAttribute('pattern')
        if(!re)
            this._input.setAttribute('pattern', COLOR_REGEX_STR)
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
                data = new PickerColor(this, _config)
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

$.fn[NAME] = PickerColor._jQueryInterface
$.fn[NAME].Constructor = PickerColor
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return PickerColor._jQueryInterface
}

export default PickerColor