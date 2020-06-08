//导入模块
const { src, dest, parallel, watch} = require('gulp');
const less = require('gulp-less');//编辑less插件
const rename = require('gulp-rename');//重命名插件
const cleanCss = require("gulp-clean-css");//压缩CSS插件
const uglify = require("gulp-uglify");//压缩JS插件
const borwserSync = require("browser-sync").create(); //启动服务器插件
const reload = borwserSync.reload;//热加载
//创建任务

//css任务
function css(){
    return src("./less/*.less")//要处理的文件源
    .pipe(less())
    .pipe(cleanCss())
    .pipe(
        rename({
            suffix: ".min"
        })
    )
    .pipe(dest("./dist/css"))
}

//js任务
function js() {
    return src("./js/*.js")
    .pipe(uglify())//压缩处理
    .pipe(
        rename({
            suffix: ".min"
        })
    )
    .pipe(dest("./dist/js"))
}

// 启动服务器
function serve() {
    borwserSync.init({
        server: {
            baseDir:"./"
        },
        port:3033
    })
}
// 热加载
function auto( ) {
    watch("./less/*.less",css).on("change",reload);
    watch("./js/*.js",js).on("change",reload);
    watch("*.html").on("change",reload);
}


exports.css = css;
exports.js = js;
// exports.default = parallel(css, js);
exports.default = parallel(js,css,serve,auto)