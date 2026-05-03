/**
 * --------------------------------------------------------------------------
 * Bootstrap Tag Input (v0.0.3): tag-input.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

 const NAME               = 'taginput'
 const VERSION            = '0.0.3'
 const DATA_KEY           = 'bs.taginput'
 const EVENT_KEY          = `.${DATA_KEY}`
 const DATA_API_KEY       = '.data-api'
 const JQUERY_NO_CONFLICT = $.fn[NAME]
 const ENTER_KEYCODE      = 13 // KeyboardEvent.which value for Enter key
 // const COMMA_KEYCODE      = 188 // KeyboardEvent.which value for Comma (,) key
 const COMMA_KEY          = ','

 const Default = {}

const DefaultType = {}

const Event = {
    CLICK_ITEM_DISMISS  : `click.dismiss${EVENT_KEY}`,
    FILTER_KEYDOWN      : `keydown.filter${EVENT_KEY}`
}

const ClassName = {
  CONTAINER         : 'tag-input-container',
  FILTER            : 'tag-input-filter',
  ITEMS             : 'tag-input-items',
  VALUE             : 'tag-input-value'
}

const Selector = {
  FILTER        : `.${ClassName.FILTER}`,
  ITEMS         : `.${ClassName.ITEMS}`,
  VALUE         : `.${ClassName.VALUE}`,
  DISMISS_ITEM  : `.close`
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class TagInput {
    constructor(element, config) {
        this._config    = this._getConfig(config)
        this._element   = element
        this._parent    = element.parentNode
        this._items     = this._parent.querySelector(Selector.ITEMS)
        this._input     = this._parent.querySelector(Selector.VALUE)

        this._setInputListener()
        this._setFilterListener()
        this._setItemsListener()
        this._renderValue()
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

    _addItem(text){
        if(this._values.includes(text))
            return;

        let index = this._values.length
        this._values.push( text )
        this._input.value = JSON.stringify(this._values)

        this._addListItem(text)
    }

    _addListItem(text){
        let li = document.createElement('li')
        li.innerText = text

        let btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.setAttribute('aria-label', 'Delete')
        btn.setAttribute('data-dismiss', 'tag-item')

        btn.classList.add('close')

        let span = document.createElement('span')
        span.setAttribute('aria-hidden', 'true')
        span.innerHTML = '&times;'
        btn.appendChild(span)

        li.appendChild(btn)

        this._items.appendChild(li)
    }

    _removeItem(index){
        this._values.splice(index,1)
        this._input.value = this._values.length ? JSON.stringify(this._values) : ''
        this._removeListItem(index)
    }

    _removeListItem(index){
        let el = this._items.querySelector('li:nth-child('+(index+1)+')')
        this._items.removeChild(el)
    }

    _setFilterListener(){
        $(this._element).on(Event.FILTER_KEYDOWN, e => {
            if(e.keyCode !== ENTER_KEYCODE && e.key !== COMMA_KEY)
                return;
            e.preventDefault()

            let text = this._element.value.trim()
            if(text){
                this._addItem(text)
                this._element.value = ''
            }
            return false;
        })
    }

    _setInputListener(){
        $(this._input).on('change', () => {
            this._renderValue()
        })
    }

    _setItemsListener(){
        $(this._items).on(Event.CLICK_ITEM_DISMISS, Selector.DISMISS_ITEM, e => {
            let index = $(this._items).children('li').index(e.currentTarget.parentNode)
            this._removeItem(index)
        })
    }

    _renderValue(){
        $(this._items).html('')
        try{
            this._values = JSON.parse( this._input.value )
        }catch(e){
            this._values = []
        }
        if(!Array.isArray(this._values))
            this._values = [];

        for(let i=0; i<this._values.length; i++)
            this._addListItem(this._values[i])
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
                data = new TagInput(this, _config)
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

$.fn[NAME] = TagInput._jQueryInterface
$.fn[NAME].Constructor = TagInput
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return TagInput._jQueryInterface
}

export default TagInput