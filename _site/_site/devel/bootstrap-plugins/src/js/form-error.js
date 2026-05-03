/**
 * --------------------------------------------------------------------------
 * Bootstrap Form Error (v0.0.1): form-error.js
 * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-error/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'formerror'
const VERSION            = '0.0.1'
const DATA_KEY           = 'bs.formerror'
const EVENT_KEY          = `.${DATA_KEY}`
const DATA_API_KEY       = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Default = {}

const DefaultType = {}

const Event = {
    INPUT_DATA_API      : `input${EVENT_KEY}${DATA_API_KEY}`,
    INVALID_DATA_API    : `invalid${EVENT_KEY}${DATA_API_KEY}`,
    SUBMIT_DATA_API     : `submit${EVENT_KEY}${DATA_API_KEY}`
}

const ClassName = {}

const Selector = {}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class FormError {
    constructor(element, config) {
        this._element   = element
        this._controls  = [].slice.call(element.elements, 0);

        this._wasValidated = false

        this._addControlListener()
        this._addFormListener()
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

    _addControlListener(){
        this._controls.forEach(e => {
            let $e = $(e)
            let feedback = $e.next('.invalid-feedback').get(0)

            if(!feedback){
                let parent = $e.closest('.form-group');
                feedback = parent.find('.invalid-feedback').get(0)
            }

            if(feedback)
                $e.data('feedback', feedback)

            $e.on(Event.INVALID_DATA_API, event => {
                if(this._wasValidated && e.validationMessage && $e.data('feedback'))
                    $e.data('feedback').innerText = e.validationMessage
            })

            $e.on(Event.INPUT_DATA_API, event => {
                if(this._wasValidated && e.validationMessage && $e.data('feedback'))
                    $e.data('feedback').innerText = e.validationMessage
            })
        })
    }

    _addFormListener(){
        this._element.setAttribute('novalidate', '')

        $(this._element).on(Event.SUBMIT_DATA_API, e => {
            if(!this._element.checkValidity()){
                e.preventDefault()
                e.stopPropagation()
            }

            this._controls.forEach(c => {
                if(!c.checkValidity()){
                    if($(c).data('feedback'))
                        $(c).data('feedback').innerText = c.validationMessage
                }
            })

            this._element.classList.add('was-validated')
            this._wasValidated = true
        })
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)

            if (!data) {
                data = new FormError(this)
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

$.fn[NAME] = FormError._jQueryInterface
$.fn[NAME].Constructor = FormError
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return FormError._jQueryInterface
}

export default FormError