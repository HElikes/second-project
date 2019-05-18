const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      minifyCss = require('gulp-minify-css'),
      gulpSass = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');

// 制定任务
// gulp.task('default',() =>{
//     // 任务里面有两个参数，第一个是任务名称，第二个是要干的事情
//     // 制定了一个default任务，任务干的事情就是打印default
//     console.log("default");
// })      

// 制定一个css任务
// scss编译成css，然后在压缩css
gulp.task('css',() => {
    // src取源文件
    gulp.src('src/css/**/*.scss')
    // pipe管道（文件传输的过程，可以在过程中对文件做处理）
        .pipe(gulpSass())//在管道里编译一下scss
        .pipe(minifyCss())//在管道里压缩一下scss
        .pipe(gulp.dest('dist/css'))//dest  destination  目的地   管道里处理完成后放到目标文件夹里
        .pipe(connect.reload());
})

// 制定html任务
gulp.task('html',() =>{
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
               removeComments: true,//清除HTML注释
               collapseWhitespace: true,//压缩HTML
               collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
               removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
               removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
               removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
               //minifyJS: true,//压缩页面JS
               //minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
})



// 制定JS任务
gulp.task('js',() => {
    //把所有js代码取出来，把Es6转成Es5  babel
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        //压缩，在放到dist、js里面
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})

//libs任务
gulp.task('libs',()=>{
    //libs里面的所有文件原封不动的移动到dist里面
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
        .pipe(connect.reload());
})

//images任务

gulp.task('images',()=>{
    //libs里面的所有文件原封不动的移动到dist里面
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
})

// 制定一个开启服务器的任务
gulp.task('server',()=>{
    connect.server({
        root : "dist",
        //port端口号
        port : 190,
        livereload :true//热更新
    });
})


// 制定一个监听任务
gulp.task('watch',()=>{
    // 监听所有html文件的修改，一旦被修改，html任务从新执行
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/css/**/*.scss',['css']);
})

//把任务集中去执行
gulp.task('default',["html","css","js","libs","images","server","watch"]);