const gulp = require("gulp"); 
const wbBuild = require('workbox-build');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const pump = require('pump');
const runSequence = require('run-sequence');

gulp.task('copy-index',()=>
    gulp.src('./src/index.html')
    .pipe(gulp.dest('dist/'))
);
gulp.task('prefix-css', () =>
    gulp.src('./src/styles/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/styles'))
);
gulp.task('compile-es6',(cb)=>{
    gulp.src('./src/scripts/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('bundle-sw', () => {
   return wbBuild.generateSW({
     globDirectory: './src',
     swDest: './dist/sw.js',
     globPatterns: ['**\/*.{html,js,css}'],
     globIgnores: ['admin.html','node_modules/*','gulpfile.js'],
     skipWaiting:true
   })
   .then(() => {
     console.log('Service worker generated.');
   })
   .catch((err) => {
     console.log('[ERROR] This happened: ' + err);
   });
 });

  gulp.task('default',function(cb){
    runSequence('copy-index','prefix-css','compile-es6','bundle-sw');
  });