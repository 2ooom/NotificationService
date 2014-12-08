/// <binding AfterBuild='less' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

var styles = {
    files: { "wwwroot/css/styles.css": "assets/*.less" }
}
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/lib",
                    layout: "byComponent",
                    cleanTargetDir: true
                }
            }
        },
        // Add this JSON object:
        less: {
            development: {
                options: {
                    paths: ["Assets"],
                },
                files: styles.files
            },
        },
        watch: {
            styles: {
                files: ['Assets/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                    interrupt: true,
                },
            },
            scripts: {
                files: ['App/*.ts'],
                tasks: ['typescript'],
                options: {
                    spawn: false,
                    interrupt: true,
                },
            },
        },
        typescript: {
            base: {
                src: ['App/*.ts'],
                dest: 'wwwroot',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5',
                    sourceMap: false,
                    declaration: false,
                }
            }
        }
    });

    grunt.registerTask("default", ["bower:install"]);
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-typescript");
    grunt.loadNpmTasks("grunt-contrib-less");
};