const path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            docs: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'codemirror.css'
                        ],
                        dest: '../../docs/assets/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'codemirror.js'
                        ],
                        dest: '../../docs/assets/js/'
                    }
                ]
            },
            docs_css: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'codemirror.css'
                        ],
                        dest: '../../docs/assets/css/'
                    }
                ]
            },
            docs_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'codemirror.js'
                        ],
                        dest: '../../docs/assets/js/'
                    }
                ]
            },

            fwd_css: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css/',
                        src: [
                            'codemirror.css'
                        ],
                        dest: 'dist/css/'
                    }
                ]
            },
            fwd_js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: [
                            'codemirror.js'
                        ],
                        dest: 'dist/js/'
                    }
                ]
            },

            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'codemirror.min.css',
                            'codemirror.min.css.map'
                        ],
                        dest: '../../theme/admin/static/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'codemirror.min.js'
                        ],
                        dest: '../../theme/admin/static/js/'
                    },
                    {
                        expand: true,
                        cwd: 'src/js/mode/',
                        src: ['**/*.js'],
                        flatten: true,
                        filter: function(filepath){
                            let filename = path.basename( filepath, '.js' );
                            let dirname  = path.basename( path.dirname(filepath) );
                            return filename === dirname
                        },
                        dest: '../../theme/admin/static/js/codemirror/'
                    }
                ]
            },
            app_css: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'codemirror.min.css',
                            'codemirror.min.css.map'
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
                            'codemirror.min.js'
                        ],
                        dest: '../../theme/admin/static/js/'
                    }
                ]
            },
            app_js_mode: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/mode/',
                        src: ['**/*.js'],
                        flatten: true,
                        filter: function(filepath){
                            let filename = path.basename( filepath, '.js' );
                            let dirname  = path.basename( path.dirname(filepath) );
                            return filename === dirname
                        },
                        dest: '../../theme/admin/static/js/codemirror/'
                    }
                ]
            }
        },

        run: {
            css_minify:    { cmd: 'npm', args: ['run','css-minify'] },
            js_minify:     { cmd: 'npm', args: ['run','js-minify'] }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-copy')
}