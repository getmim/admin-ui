let formatError = res => {
    if(res.error == 422){
        for(let k in res.data)
            res.message = res.data[k].text
    }

    if(!res.message)
        res.message = 'Unable to parse server response'

    return res
}

class AdminFilePicker {

	constructor(cb, opts){
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
        }

        fpopts = this._defineFileSearch(fpopts)
        fpopts = this._defineFileUpload(fpopts, opts)

        new FilePicker(fpopts)
	}

	_defineFileSearch(fpopts){
		if(!window.AConf || !window.AConf.libUpload)
			return fpopts

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

        return fpopts
	}

	_defineFileUpload(fpopts, opts){
		if(!window.AConf || !window.AConf.libUpload || !window.AConf.libUpload.upload)
			return fpopts

        fpopts.upload = (file, progress, callback) => {
            progress.style.width = '5%'

            this._findByHash(file, progress, res => {
                if(!res.error && res.data.length)
                    return this._formatResult(res.data[0], callback)
                
                this._uploadFile(file, opts, progress, res => {
                    if(!res.error)
                        return this._formatResult(res.data, callback)
                    callback(res.message)
                })
            })
        }

        return fpopts
	}

    _formatResult(result, callback){
        if(/image/.test(result.type) && !result.thumb)
            result.thumb = result.url
        callback(result)
    }

	_findByHash(file, progress, callback){
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

    _uploadFile(file, opts, progress, callback){
        progress.style.width = '25%'
        this._validateFile(file, opts, progress, res => {
            if(res.error)
                return callback(res)

            progress.style.width = '30%'

            if(file.size < 500000)
            	return this._uploadFileSingle(file, opts, progress, callback)
            opts.token = res.data.token
            this._uploadFileChunks(file, opts, progress, callback)
        })
    }

    _uploadFileChunks(file, opts, progress, callback){
    	let uploader = new FileUploader({
            url     : window.AConf.libUpload.chunk,
            files   : {file},
            fields  : {form: opts.form, token: opts.token},
            chunks  : {
                minSize: 1,
                after(up, res, cb){
                    let body = {
                        form  : opts.form,
                        token : opts.token,
                        name  : file.name
                    }

                    $.ajax({
                        type       : 'POST',
                        url        : window.AConf.libUpload.finalize,
                        data       : JSON.stringify(body),
                        contentType: 'application/json',
                        dataType   : 'json',
                        success    : res => {
                            if(res.error)
                                res = formatError(res)

                            callback(res)
                        },
                        error      : e => {
                            callback({error:1,messag:'Unable to reach server'})
                        }
                    })
                }
            },
            onChankUploaded(up, xhr, res, callback){
                if(res.error){
                    res = formatError(res)
                    return callback(res.message)
                }

                callback(true)
            },
            onProgress(up, percent){
            	progress.style.width = ( 30 + ( ( percent / 100 ) * 60 ) ) + '%'
            },
            onSuccess(up, xhr, res){
                if(typeof res !== 'object')
                    return callback({error:1,message:'Unable to parse server response'})
                
                if(res.error)
                    res = formatError(res)

                progress.style.width = '100%'
                callback(res)
            },
            onError(up){
                callback({error:1,message:'Failed on uploading the file'})
            }
        })

        uploader.send()
    }

    _uploadFileSingle(file, opts, progress, callback){
    	let uploader = new FileUploader({
            url     : window.AConf.libUpload.upload,
            files   : {file},
            fields  : {form: opts.form},
            onSuccess(up, xhr, res){
            	progress.style.width = '100%'

                if(typeof res !== 'object')
                    return callback({error:1,message:'Unable to parse server response'})
                
                if(res.error)
                    res = formatError(res)

                callback(res)
            },
            onError(up){
                callback({error:1,message:'Failed on uploading the file'})
            }
        })

        uploader.send()
    }

    _validateFile(file, opts, progress, callback){
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
                    if(res.error)
                        res = formatError(res)
                    
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
}

export default AdminFilePicker