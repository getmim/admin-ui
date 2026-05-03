/**
 * --------------------------------------------------------------------------
 * Bootstrap Form Map (v0.0.1): form-map.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'formmap'
const VERSION            = '0.0.1'
const DATA_KEY           = 'bs.formmap'
const EVENT_KEY          = `.${DATA_KEY}`
const DATA_API_KEY       = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Default = {}

const DefaultType = {}

const Event = {
    UPDATE              : `update${EVENT_KEY}`,
    UPDATED             : `updated${EVENT_KEY}`,
    CHANGE              : `change${EVENT_KEY}`,
    CLEAR               : `clear${EVENT_KEY}`,
    CLEARED             : `cleared${EVENT_KEY}`,

    CHANGE_DATA_API     : `change${EVENT_KEY}`,
    CLICK_DATA_API      : `click${EVENT_KEY}`,
}

const ClassName = {
    CONTAINER : 'formmap',
    CONTROL   : 'formmap-control',
    MODEL     : 'formmap-model'
}

const Selector = {
    CONTAINER : `.${ClassName.CONTAINER}`,
    CONTROL   : `.${ClassName.CONTROL}`,
    MODEL     : `.${ClassName.MODEL}`
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class FormMap {
    constructor(element, config) {
        this._config        = this._getConfig(config)
        this._element       = element
        this._control       = $(element).children(Selector.CONTROL).get(0)
        this._model         = $(element).children(Selector.MODEL).get(0)

        this._value         = this._model.value
        let prePosition     = this._value
        if (!prePosition)
            prePosition = '-6.175327492768445,106.82715167843331'
        prePosition = prePosition.split(',')
        this._map           = L.map(this._control).setView(prePosition, 13)

        this._map.on('click', e => this.pickPoint(e))
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);

        if (this._value) {
            this._mapMarker = L.marker(prePosition).addTo(this._map)
        }

        this._addModelListener()
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Private

    _addModelListener(){
        $(this._model).on('change', e => {
            if(this._value != e.target.value)
                this.pickPoint(e.target.value)
        })
        $(this._model).on('keydown', e => {
            if (e.keyCode != 13) {
                return
            }
            e.preventDefault()
            if(this._value != e.target.value) {
                this.pickPoint(e.target.value)
            }

            return false
        })
    }

    pickPoint(position) {
        if (position.latlng) {
            position = [position.latlng.lat,position.latlng.lng]
        }
        if (typeof position === 'string') {
            position = position.split(',')
        }

        this._value = position.join(',')

        if (!this._mapMarker) {
            this._mapMarker = L.marker(position).addTo(this._map)
        } else {
            this._mapMarker.setLatLng(position)
        }

        this._map.setView(position)

        if (this._model.value != this._value) {
            this._model.value = this._value
        }
    }

    _getConfig(config) {
        config = {
          ...Default,
          ...config
        }
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
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
                data = new FormMap(this, _config)
                $(this).data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`)
                }
                data[config](relatedTarget)
            } else if (_config.pickPoint) {
                data.pickPoint(relatedTarget)
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = FormMap._jQueryInterface
$.fn[NAME].Constructor = FormMap
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return FormMap._jQueryInterface
}

export default FormMap
