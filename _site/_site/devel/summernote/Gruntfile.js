module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            docs:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'summernote.css'
                        ],
                        dest: '../../docs/assets/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'summernote.js',
                            'summernote.js.map'
                        ],
                        dest: '../../docs/assets/js/'
                    }
                ]
            },
            docs_css:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'summernote.css'
                        ],
                        dest: '../../docs/assets/css/'
                    }
                ]
            },
            docs_js:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'summernote.js',
                            'summernote.js.map'
                        ],
                        dest: '../../docs/assets/js/'
                    }
                ]
            },
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'summernote.min.css'
                        ],
                        dest: '../../theme/admin/static/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'summernote.min.js',
                            'summernote.min.js.map'
                        ],
                        dest: '../../theme/admin/static/js/'
                    }
                ]
            },
            app_css: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'summernote.min.css'
                        ],
                        dest: '../../theme/admin/static/css/'
                    }
                ]
            },
            app_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'summernote.min.js',
                            'summernote.min.js.map'
                        ],
                        dest: '../../theme/admin/static/js/'
                    }
                ]
            }
        },

        run:{
            js:              { cmd: 'npm', args: ['run','js'] },
            js_compile:      { cmd: 'npm', args: ['run','js-compile'] },
            js_minify:       { cmd: 'npm', args: ['run','js-minify'] },
        },

        watch: {
            css:{
                files: [
                    'src/less/*.less'
                ],
                tasks: [
                    'recess:compile',
                    'copy:docs_css'
                ]
            },
            js:{
                files: [
                    'src/js/*.js',
                    'src/js/**/*.js'
                ],
                tasks: [
                    'run:js_compile',
                    'copy:docs_js'
                ]
            }
        },

        recess: {
            compile: {
                options: {
                    compile: true
                },
                files: [
                    {
                        'dist/css/summernote.css': 'src/less/summernote-bs4.less'
                    }
                ]
            },
            minify: {
                options: {
                    compile: true,
                    compress: true
                },
                files: [
                    {
                        'dist/css/summernote.min.css': 'src/less/summernote-bs4.less'
                    }
                ]
            }
        },

        webfont: {
            icons: {
                src: 'src/icons/*.svg',
                dest: 'src/icons/dist/font',
                destCss: 'src/icons/dist/',
                options: {
                    font: 'summernote',
                    relativeFontPath: '../font/',
                    stylesheet: 'less',
                    template: 'src/icons/templates/summernote.css',
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-run')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-webfont')
    grunt.loadNpmTasks('grunt-recess');
}
