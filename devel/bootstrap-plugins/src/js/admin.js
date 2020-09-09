/**
 * --------------------------------------------------------------------------
 * Admin UI (v0.0.1): admin.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'
import Viewer from './viewer.esm'

const NAME                = 'admin'
const VERSION             = '0.0.1'
const DATA_KEY            = 'bs.admin'
const EVENT_KEY           = `.${DATA_KEY}`
const DATA_API_KEY        = '.data-api'
const JQUERY_NO_CONFLICT  = $.fn[NAME]

const ARROW_DOWN_KEYCODE  = 40

const Event = {
    CLICK_DATA_API          : `click${EVENT_KEY}${DATA_API_KEY}`,
    DRAWER_SHOWN            : 'shown.bs.drawer',
    LOAD_DATA_API           : `load${EVENT_KEY}${DATA_API_KEY}`
}

const ClassName = {}

const IDName = {
    DRAWER_MAIN             : 'drawer-main',
    DRAWER_MAIN_FILTER      : 'drawer-main-filter',
    DRAWER_MAIN_MENU        : 'drawer-main-menu',
    DRAWER_MAIN_SEARCH      : 'drawer-main-search'
}

const Selector = {
    DRAWER_MAIN             : [false, `#${IDName.DRAWER_MAIN}`],
    DRAWER_MAIN_FILTER      : [false, `#${IDName.DRAWER_MAIN_FILTER}`],
    DRAWER_MAIN_MENU        : [false, `#${IDName.DRAWER_MAIN_MENU}`],
    DRAWER_MAIN_SEARCH      : [false, `#${IDName.DRAWER_MAIN_SEARCH}`]
}

class Admin {
    constructor() {
        this._populateElements()

        // drawer stuff
        this._drawerState = 'menu'
        this._drawerMainAddListener()

        this._navbarMainAddListener()       // navbar stuff

        this._imageViewer()                 // image viewer

        this._inputDatetimepicker()         // datetimepicker
        this._inputFormCodeMirror()         // codemirror
        this._inputFormFiles()              // multiple files & multiple object
        this._inputFormGallery()            // multiple image
        this._inputFormFileURL()            // input file url
        this._inputFormImage()              // image picker
        this._inputPasswordStrength()       // password strength
        this._inputSummernote()             // summernote

        // input autocomplete
        $('.form-autocomplete').autocomplete({
            preProcess(res){
                if(res.error)
                    return []
                let flat = []
                res.data.forEach(e => flat.push(e.label))
                return flat
            }
        })

        // select ajax source
        $('.selectpicker').selectpickerAjax({
            ajaxPreProcess(res){
                if(res.error)
                    return {}
                let flat = {}
                res.data.forEach(e => (flat[e.id] = e.label))
                return flat
            }
        })
        
        $('.form-confirm').confirm()            // form confirmation
        $('.needs-validation').formerror()      // form need validation
        $('.picker-color').pickercolor()        // color picker
        $('.custom-range').rangetips()          // input range
        $('.tag-input-filter').taginput()       // tag input
        $('.slugify').slugify()                 // input slugify
        $('.linkfilter').linkfilter()           // input link filter

        this._formMainAutofocus()               // autofocus form element
    }

    // Private 

    _drawerMainAddListener(){
        if(!this._el.DRAWER_MAIN)
            return

        $(this._el.DRAWER_MAIN).on(Event.DRAWER_SHOWN, e => this._el.DRAWER_MAIN_FILTER.focus())

        $(this._el.DRAWER_MAIN_SEARCH).linkfilter({ input: this._el.DRAWER_MAIN_FILTER, empty: true })

        $(this._el.DRAWER_MAIN_FILTER).on('input paste change search', e => {
            let nextState = this._el.DRAWER_MAIN_FILTER.value.trim() ? 'search' : 'menu'
            if(nextState === this._drawerState)
                return

            if(this._drawerState === 'menu'){
                this._el.DRAWER_MAIN_MENU.style.display = 'none'
                this._el.DRAWER_MAIN_SEARCH.style.removeProperty('display')
            }else{
                this._el.DRAWER_MAIN_MENU.style.removeProperty('display')
                this._el.DRAWER_MAIN_SEARCH.style.display = 'none'
            }

            this._drawerState = nextState
        })

        // focus to menu
        $(this._el.DRAWER_MAIN_FILTER).on('keyup.admin-ui', e => {
            if(e.keyCode !== ARROW_DOWN_KEYCODE)
                return

            if(this._el.DRAWER_MAIN_FILTER.value.trim())
                return

            $(this._el.DRAWER_MAIN_MENU).find('> ul > li:first-child > a').focus()
        })
    }

    _formMainAutofocus(){
        let form = document.querySelector('form.main')
        if(!form)
            return

        let fElement = null;
        for(let i=0; i<form.elements.length; i++){
            let element = form.elements[i];

            if(!element.classList.contains('form-control'))
                continue;

            if(!fElement)
                fElement = element
            let formGroup = $(element).closest('.form-group')
            if(!formGroup)
                continue
            if(formGroup.hasClass('is-invalid')){
                fElement = element
                break;
            }
        }

        if(fElement)
            fElement.focus()
    }

    _getViewerOption(multiple, index){
        let options = {
            button: false,
            navbar: false,
            loop: false,
            movable: false,
            zoomable: false,
            scalable: false
        }

        if(multiple){
            options.navbar = true
            options.initialViewIndex = index || 0
        }else{
            options.toolbar = {
                reset      : true,
                rotateLeft : true,
                rotateRight: true,
                prev: false,
                next: false
            }
        }

        return options
    }

    _imageViewer(){
        let options = this._getViewerOption(false)

        // single image
        document.querySelectorAll('.img-viewer').forEach(e => {
            $(e).data('viwerjs.admin-ui', new Viewer(e, options))
        })

        options = this._getViewerOption(true)
        // galleries
        document.querySelectorAll('.gallery-viewer').forEach(e => {
            $(e).data('viwerjs.admin-ui', new Viewer(e, options))
        })
    }

    _inputDatetimepicker(){
        let formats = {
            'date'              : 'YYYY-MM-DD',
            'datetime-local'    : 'YYYY-MM-DDTHH:mm:ss',
            'month'             : 'YYYY-MM',
            'time'              : 'HH:mm:ss'
        }

        document.querySelectorAll('.datetimepicker').forEach(e => {
            let input = $(e).children('input.form-control').get(0)
            let type  = input.getAttribute('type')

            if(!formats[type])
                return
            
            $(e).datetimepicker({ format: formats[type] })
        })
    }

    _inputFormCodeMirror(){
        document.querySelectorAll('.form-codemirror').forEach(e => {
            let opts = {
                theme: 'default',
                indentUnit: 4,
                smartIndent: true,
                tabSize: 4,
                indentWithTabs: false,
                lineNumbers: true,
                mode: e.dataset.mode
            }
            let data = window.CodeMirror.fromTextArea(e, opts)

            $(e).data('codemirror.bs.admin', data)

            // now handle the label related element
            if(!e.id)
                return

            let label = document.querySelector(`[for="${e.id}"`)
            if(!label)
                return

            $(label).data('codemirror', e)

            $(label).on('click', e => {
                let te = $(e.target).data('codemirror')
                if(!te)
                    return

                $(te).data('codemirror.bs.admin').focus()
            })
        })
    }

    _inputFormFiles(){
        document.querySelectorAll('.formfiles').forEach(e => {
            let transform;
            let filePicker;

            // multiple files
            if(e.dataset.form){
                transform  = res => {
                    return {
                        url  : res.url,
                        name : res.name,
                        meta : res.type || res.mime,
                        icon : '<i class="fas fa-file-alt"></i>'
                    }
                }

                filePicker = (cb, plugin) => {
                    let opts = {
                        accept      : plugin._element.dataset.accept,
                        multiple    : true,
                        maxSize     : plugin._element.dataset.maxsize,
                        form        : plugin._element.dataset.form
                    }

                    this.pickFile(files => files.forEach(e => cb(e)), opts)
                }

            // multiple object
            }else if(e.dataset.object){
                transform  = res => {
                    return {
                        value : res.value,
                        url   : '#0',
                        name  : res.name,
                        meta  : res.type,
                        icon  : res.icon || null
                    }
                }
                
                filePicker = (cb, plugin) => {
                    let opts = {
                        icon : `<i class="${plugin._element.dataset.icon}"></i>`,
                        type : plugin._element.dataset.object
                    }

                    this.pickObject(objects => objects.forEach(e => cb(e)), opts);
                }
            }

            $(e).formfiles({filePicker, transform})
        })
    }

    _inputFormFileURL(){
        $('.fileurl-picker').fileurl({
            filePicker: (cb, btn, model) => {
                let opts = {
                    accept  : btn.dataset.accept || '*/*',
                    multiple: false,
                    form    : btn.dataset.form || ''
                }

                this.pickFile(files => files.forEach(e => cb(e.url)), opts)
            }
        })
    }

    _inputFormGallery(){
        $('.formgallery').formgallery({
            imagePicker: (cb, plugin) => {
                let opts = {
                    accept      : 'image/*',
                    multiple    : true,
                    form        : plugin._element.dataset.form
                }
                this.pickFile(files => files.forEach(e => cb(e.url)), opts)
            },
            imagePreviewer: (images, index) => {
                this.viewImage(images, index)
            }
        })
    }

    _inputFormImage(){
        $('.formimage').formimage({
            imagePicker: (cb, plugin) => {
                let opts = {
                    accept      : 'image/*',
                    multiple    : false,
                    form        : plugin._element.dataset.form
                }

                this.pickFile(files => cb(files[0].url), opts)
            },
            imagePreviewer: (url) => {
                this.viewImage(url)
            }
        })
    }

    _inputPasswordStrength(){
        document.querySelectorAll('.password-strength').forEach(e => {
            let parent   = e.parentNode
            let progress = $(parent).children('.progress').get(0)

            parent.classList.add('form-group-password-meter')
            
            $(e).pwdstr({progress})
        })
    }

    _inputSummernote(){
        document.querySelectorAll('.form-summernote').forEach(e => {
            let toolbar = [
                    ['style',   ['style']],
                    ['font',    ['bold', 'italic', 'clear']],
                    ['para',    ['ul', 'ol']],
                    ['table',   ['table']],
                    ['insert',  ['link','video']],
                    ['view',    ['fullscreen','codeview']]
            ];
            if(e.dataset.form)
                toolbar[4] = ['insert',  ['link','picture','video']];

            $(e).summernote({
                disableResizeEditor: true,
                placeholder: e.getAttribute('placeholder'),
                tabsize: 2,
                height: 328,
                toolbar,
                callbacks: {
                    onFocus: function(e){
                        let ctn = $(e.currentTarget).parent().parent();
                        ctn.addClass('note-editor-focus');
                    },
                    onBlur : function(e,i){
                        let ctn = $(e.currentTarget).parent().parent();
                        ctn.removeClass('note-editor-focus');
                    }
                }
            })

            let id = e.id 
            $(`label[for=${id}]`).click(evn => {
                $(e).summernote('focus')
            })
        })
    }

    _navbarMainAddListener(){
        this._navbar_main = document.querySelector('#navbar-main')
        if(!this._navbar_main)
            return

        $(window).on(`scroll${EVENT_KEY}${DATA_API_KEY}`, e => {
            if(window.pageYOffset)
                this._navbar_main.classList.add('navbar-shadow')
            else
                this._navbar_main.classList.remove('navbar-shadow')
        })

        $(window).scroll()
    }

    _populateElements(){
        this._el = {}

        for(let k in Selector){
            let multiple = Selector[k][0],
                selector = Selector[k][1],
                method   = multiple ? 'querySelectorAll' : 'querySelector'

            this._el[k] = document[method](selector)
        }
    }

    // Public

    pickFile(cb, opts){
        let fpopts = {
            multiple    : opts.multiple || false,
            type        : opts.accept   || '*/*',
            btnUpload   : '<i class="fas fa-upload"></i>',

            selected(files){
                cb(files)
            }
        }

        if(window.AConf && window.AConf.libUpload){

            if(window.AConf.libUpload.thumbs)
                fpopts.thumbnails = window.AConf.libUpload.thumbs
            
            if(window.AConf.libUpload.search){
                fpopts.search = (query, type, callback) => {
                    let data = {query, type}
                    let target = window.AConf.libUpload.search

                    $.get(target, data, res => {
                        if(res.error)
                            return callback([])

                        let files = [];
                        res.data.forEach(file => {
                            if(/image/.test(file.type) && !file.thumb)
                                file.thumb = file.url
                            files.push(file)
                        })

                        callback(files)
                    }).fail(res => {
                        $.dialog.alert('Whoops!', 'Failed to fetch data from server');
                        callback([])
                    })
                }
            }

            if(window.AConf.libUpload.upload){
                fpopts.upload = (file, progress, callback) => {
                    progress.style.width = '5%'

                    this.pickFileMd5(file, progress, res => {
                        if(!res.error && res.data.length)
                            return this.pickFileFinalize(res.data[0], callback)

                        this.pickFileUpload(file, opts, progress, res => {
                            if(!res.error)
                                return this.pickFileFinalize(res.data, callback)
                            callback(res.message)
                        })
                    })
                }
            }
        }

        new FilePicker(fpopts)
    }

    pickFileFinalize(result, callback){
        if(/image/.test(result.type) && !result.thumb)
            result.thumb = result.url
        callback(result)
    }

    pickFileMd5(file, progress, callback){
        progress.style.width = '10%'

        let fReader = new FileReader;

        fReader.onerror = () => callback({error:1})

        fReader.onload = e => {
            if(file.size != e.target.result.length)
                return callback({error:1})

            progress.style.width = '15%'
            let hash = SparkMD5.hashBinary(e.target.result)

            progress.style.width = '20%'
            $.get(window.AConf.libUpload.search, {hash}, callback)
        }

        fReader.readAsBinaryString(file)
    }

    pickFileUpload(file, opts, progress, callback){
        progress.style.width = '25%'
        this.pickFileUploadValidate(file, opts, progress, res => {
            if(res.error)
                return callback(res)

            progress.style.width = '30%'
            let uploader = new FileUploader({
                url     : window.AConf.libUpload.upload,
                files   : {file},
                fields  : {form: opts.form},
                onSuccess(up, xhr, res){
                    if(res.error){
                        if(res.error == 422){
                            for(let k in res.data)
                                res.message = res.data[k].text
                        }

                        if(!res.message)
                            res.message = 'Unable to upload the file'
                    }

                    callback(res)
                },
                onError(up){
                    callback({error:1,message:'Failed on uploading the file'})
                }
            })

            uploader.send()
        })
    }

    pickFileUploadValidate(file, opts, progress, callback){
        // validate file before upload
        let body = {
            form: opts.form,
            file: {
                size: file.size,
                type: file.type,
                name: file.name,
                width : null,
                height: null
            }
        }

        let makeRequest = () => {
            $.ajax({
                type       : 'POST',
                url        : window.AConf.libUpload.validate,
                data       : JSON.stringify(body),
                contentType: 'application/json',
                dataType   : 'json',
                success    : res => {
                    if(res.error){
                        if(res.error == 422){
                            for(let k in res.data)
                                res.message = res.data[k].text
                        }

                        if(!res.message)
                            res.message = 'Unable to parse server response'
                    }

                    callback(res)
                },
                error      : e => {
                    callback({error:1,messag:'Unable to reach server'})
                }
            })   
        }

        if(/image\//.test(file.type)){
            let img = new Image()
            img.src = window.URL.createObjectURL(file)
            img.onload = () => {
                body.file.width = img.width
                body.file.height = img.height

                makeRequest()
            }
        }else{
            makeRequest()
        }
    }

    pickObject(cb, opts){
        let fpopts = {
            multiple : true,
            type     : opts.type,
            selected(objects){
                cb(objects);
            }
        }

        if(window.AConf && window.AConf.objFilter){
            if(window.AConf.libUpload && window.AConf.libUpload.thumbs)
                fpopts.thumbnails = window.AConf.libUpload.thumbs

            if(window.AConf.objFilter.search){
                fpopts.search = (query, type, callback) => {
                    let data = {query,type}
                    let target = window.AConf.objFilter.search

                    $.get(target, data, res => {
                        if(res.error)
                            return callback([])
                        let result = []
                        res.data.forEach(e => {
                            result.push({
                                name  : e.label,
                                path  : '#0',
                                type  : e.info,
                                thumb : e.thumb || null,
                                icon  : e.icon || opts.icon || null,
                                value : e.id
                            })
                        })

                        callback(result)
                    }).fail(res => {
                        $.dialog.alert('Whoops!', 'Failed to fetch data from server');
                        callback([])
                    })
                }
            }
        }

        new FilePicker(fpopts)
    }

    viewImage(url, index){
        let div  = document.createElement('div')
        let main = div
        let opts = this._getViewerOption(Array.isArray(url), index)

        if(Array.isArray(url)){
            url.forEach(u => {
                let img = document.createElement('img')
                img.src = u
                div.appendChild(img)
            })
        }else{
            let img = document.createElement('img')
            img.src = url
            div.appendChild(img)

            main = img
        }

        opts.hidden = e => viewer.destroy()

        let viewer = new Viewer(main, opts)
        viewer.show()
    }
}

$(window).on(Event.LOAD_DATA_API, () => {
    if(!$(document.body).data(DATA_KEY))
        $(document.body).data(DATA_KEY, new Admin())
})

$(document).on(Event.CLICK_DATA_API, 'a', function(e){
    if(this.getAttribute('href') === '#0')
        e.preventDefault()
})

export default Admin