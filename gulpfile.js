const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// compila os arquivos sass para a pasta 'css/main.css'
function compileSass() {
    return gulp.src('./src/scss/*.scss') // o ' * ' pega todos os arquivos com a extensão scss
    .pipe(sass({
        outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
    }))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream()); // injeta o css na página sem precisar dar refresh
}

gulp.task('sass', compileSass); // gulp.task('sass', compileSass);

// inicia um servidor local a partir da raiz do projeto './'
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

// compacta os arquivos js para 'js/all.js'
function gulpJs(){
    return  gulp.src('./src/js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env'] // compila js para navegadores mais antigos
    }))
    .pipe(uglify()) // mimifica os arquivos js
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream()); // injeta o js na página sem precisar dar refresh
}

gulp.task('allJs', gulpJs);
gulp.task('browser-sync', browser);

function pluginsCSS() {
    return gulp.src('./src/css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginsCSS);

function pluginsJs() {
    return gulp
    .src(['./src/js/lib/aos.min.js','./src/js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./src/js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginsJs);

// espera uma atualização para realizar um tarefa sem precisar reiniciar o gulp
function watch() {
    gulp.watch('./src/scss/*.scss', compileSass); // gulp.series'ou parallel'('sass', 'outra-tarefa');
    gulp.watch('./src/css/lib/*.css', pluginsCSS);
    gulp.watch('*.html').on('change', browserSync.reload); // browserSync.reload atualiza á pagina inteira
    gulp.watch('./src/js/scripts/*.js', gulpJs);
    gulp.watch('./src/js/lib/*.js', pluginsJs);
};
gulp.task('watch', watch);
// tarefas a serem iniciadas ao dar o comando gulp
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass','plugincss', 'allJs', 'pluginjs')); // nome das tarefas a serem executadas ao iniciar o gulp