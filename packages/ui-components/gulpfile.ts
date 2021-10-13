import path from 'path'
import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import postcssCustomProperties from 'postcss-custom-properties'
import minifycss from 'gulp-minify-css'
import sourcemaps from 'gulp-sourcemaps'
import less from 'gulp-less'
import rename from 'gulp-rename'

const srcRoot = path.join(__dirname, './src')
const cjsRoot = path.join(__dirname, './lib')
const esmRoot = path.join(__dirname, './es')

function buildLess() {
  return gulp
    .src(`${srcRoot}/**/styles/index.less`)
    .pipe(less())
    .pipe(postcss([autoprefixer, postcssCustomProperties()]))
    .pipe(gulp.dest(esmRoot))
    .pipe(gulp.dest(cjsRoot))
}

function copyLessPlugins() {
  return gulp
    .src(`${srcRoot}/styles/plugins/*.js`)
    .pipe(gulp.dest(`${esmRoot}/styles/plugins`))
    .pipe(gulp.dest(`${cjsRoot}/styles/plugins`))
}

function minifyCss() {
  return gulp
    .src(`${esmRoot}/**/*.css`)
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(esmRoot))
    .pipe(gulp.dest(cjsRoot))
}

function copyLess() {
  return gulp
    .src(`${srcRoot}/**/*.less`)
    .pipe(gulp.dest(esmRoot))
    .pipe(gulp.dest(cjsRoot))
}

const build = gulp.series(copyLess, copyLessPlugins, buildLess, minifyCss)
export { build }
