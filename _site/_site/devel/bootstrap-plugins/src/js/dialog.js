/**
 * --------------------------------------------------------------------------
 * Bootstrap Dialog (v0.0.1): dialog.js
 * Licensed under MIT (https://github.com/iqbalfn/bootstrap-dialog/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'dialog'
const VERSION            = '0.0.1'

const Default = {
    button: {
        type    : 'light',
        label   : 'Cancel',
        dismiss : false,
        focus   : false
    }
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Dialog {

    constructor(options){
        this._confirmed = false
        this._options   = options
        this._makeModal()
        this._showModal()
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Private

    _btnOptions(btn){
        let btns = Default.button

        for(let k in btns){
            if(typeof btn[k] === 'undefined')
                btn[k] = btns[k]
        }

        return btn
    }

    _getInputValue(){
        if(!this._options.input)
            return

        if(this._options.val)
            return this._options.val.call(this, this._input)

        return $(this._input).val()
    }

    _makeInput(){
        let tmpl  = '';
        let input = this._options.input

        switch(input.type){
            case 'textarea':
                tmpl = `<textarea class="form-control bs-dialog-input" id="bs-dialog-input" rows="3" placeholder="${input.label}"></textarea>`
            break;
            
            case 'select':
                let opts = ''
                for(let k in input)
                    opts+= `<option value="${k}">${input[k]}</option>`
                tmpl = `<select class="custom-select my-1 mr-sm-2" id="bs-dialog-input">${opts}</select>`
            break;

            default:
                tmpl = `<input type="${input.type}" class="form-control bs-dialog-input" id="bs-dialog-input" placeholder="${input.label}">`
        }

        let tx = `
            <div class="form-group">
                <label for="bs-dialog-input">${input.label}</label>
            </div>`

        this._input = $(tmpl).get(0)

        return $(tx).append(this._input)
    }

    _makeModal(){
        // headers
        let header = ''
        if(this._options.title){
            header = `
                <div class="modal-header">
                    <h5 class="modal-title">${this._options.title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        }

        // message
        let message = ''
        if(this._options.message)
            message = `<p>${this._options.message}</p>`

        // footer buttons
        let buttons = ''
        this._options.buttons.forEach(btn => {
            btn = this._btnOptions(btn)

            let action = btn.dismiss ? ' data-dismiss="modal"' : ' data-confirm="true"'
            let focus  = btn.focus ? ' btn-focus-first' : ''
            buttons+= `<button type="button" class="btn btn-${btn.type}${focus}"${action}>${btn.label}</button>`
        })

        let tmpl = `
            <div class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        ${header}
                        <div class="modal-body">
                            ${message}
                        </div>
                        <div class="modal-footer">
                            ${buttons}
                        </div>
                    </div>
                </div>
            </div>`

        this._modal = $(tmpl).appendTo(document.body)

        if(this._options.input){
            let form = this._makeInput()
            $(this._modal).find('.modal-body').append(form)
        }

        $(this._modal).on('click', '[data-confirm]', event => {
            this._confirmed = true
            $(this._modal).modal('hide')
        })

        $(this._modal).on('hidden.bs.modal', event => {
            setTimeout(e => $(this._modal).remove(), 1000)

            if(!this._options.callback)
                return

            let arg = this._confirmed
            if(this._confirmed && this._options.input)
                arg = this._getInputValue()

            this._options.callback.call(this, arg)
        })

        $(this._modal).on('shown.bs.modal', event => {
            if(this._input)
                $(this._input).focus()
            else
                $(this._modal).find('.btn-focus-first').focus()
        })
    }

    _showModal(){
        $(this._modal).modal('show')
    }

    // Static

    static alert(title, message, callback){
        new Dialog({
            title,
            message,
            callback,
            input: null,
            buttons: [
                {
                    type: 'primary',
                    focus: true,
                    label: 'Ok'
                }
            ]
        })
    }
    
    static confirm(title, message, callback){
        new Dialog({
            title,
            message,
            callback,
            input: null,
            buttons: [
                {
                    type: 'light',
                    label: 'Cancel',
                    dismiss: true
                },
                {
                    type: 'primary',
                    focus: true,
                    label: 'Ok'
                }
            ]
        })
    }

    static prompt(title, message, input, callback){
        new Dialog({
            title,
            message,
            callback,
            input,
            buttons: [
                {
                    type: 'light',
                    label: 'Cancel',
                    dismiss: true
                },
                {
                    type: 'primary',
                    focus: true,
                    label: 'Ok'
                }
            ]
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$[NAME] = Dialog

export default Dialog