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
                            'bootstrap.css',
                            'bootstrap.css.map'
                        ],
                        dest: '../../docs/assets/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'bootstrap.js',
                            'bootstrap.js.map'
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
                            'bootstrap.css',
                            'bootstrap.css.map'
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
                            'bootstrap.js',
                            'bootstrap.js.map'
                        ],
                        dest: '../../docs/assets/js/'
                    }
                ]
            },
            app:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'bootstrap.min.css',
                            'bootstrap.min.css.map'
                        ],
                        dest: '../../theme/admin/static/css/'
                    },
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'bootstrap.min.js',
                            'bootstrap.min.js.map'
                        ],
                        dest: '../../theme/admin/static/js/'
                    }
                ]
            },
            app_css:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/css/',
                        src: [
                            'bootstrap.min.css',
                            'bootstrap.min.css.map'
                        ],
                        dest: '../../theme/admin/static/css/'
                    }
                ]
            },
            app_js:{
                files: [
                    {
                        expand: true,
                        cwd: 'dist/js/',
                        src: [
                            'bootstrap.min.js',
                            'bootstrap.min.js.map'
                        ],
                        dest: '../../theme/admin/static/js/'
                    }
                ]
            }
        },

        run:{
            css:             { cmd: 'npm', args: ['run','css'] },
            css_compile:     { cmd: 'npm', args: ['run','css-compile'] },
            css_prefix:      { cmd: 'npm', args: ['run','css-prefix'] },
            css_minify:      { cmd: 'npm', args: ['run','css-minify'] },
            js:              { cmd: 'npm', args: ['run','js'] },
            js_compile:      { cmd: 'npm', args: ['run','js-compile'] },
            js_minify:       { cmd: 'npm', args: ['run','js-minify'] },
        },

        watch: {
            css:{
                files: [
                    'src/scss/*.scss',
                    'src/scss/**/*.scss'
                ],
                tasks: [
                    'run:css_compile',
                    'run:css_prefix',
                    'copy:docs_css'
                ]
            },
            js:{
                files: [
                    'src/js/*.js'
                ],
                tasks: [
                    'run:js_compile',
                    'copy:docs_js'
                ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-run')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-watch')
}