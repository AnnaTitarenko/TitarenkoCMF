var gulp = require('gulp'),
    path = require('path'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    nib = require('nib'),
    cssmin = require('gulp-cssmin'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    mktimecss = require('gulp-css-url-mktime'),
    sftp = require('gulp-sftp');


var config = {
    projects : {
        stylus: {
            filename: 'stylus.css',
            source: 'vendor/frontend/stylus/**/*.styl',
            dest: 'web/css/vendor'
        },
        main: {
            filename: 'main.css',
            source: 'vendor/frontend/main/**/*.styl',
            dest: 'web/css/vendor'
        }
    }
};

var handleErrors = function(type, data) {
    console.log('!!! error -->', type, data);
    gutil.log.bind(data, '!!!');
};

gulp.task('stylus',function(){
    gulp.watch(
        config.projects.stylus.source,
        function(event) { gulp.run('vendor-frontend-stylus-compile'); }
    );
    gulp.run('vendor-frontend-stylus-compile');

    gulp.watch(
        config.projects.main.source,
        function(event) { gulp.run('vendor-frontend-main-compile'); }
    );
    gulp.run('vendor-frontend-main-compile');
});

gulp.task('vendor-frontend-stylus-compile', function() {
    return gulp.src(config.projects.stylus.source)
        .pipe(sourcemaps.init())
        .pipe(concat('main'))
        .pipe(mktimecss(__dirname+'/web'))
        .pipe(stylus({
            'include css': true,
            use: [nib()],
            // compress: true,
            linenos: false
        }))
        // .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.projects.stylus.dest))
        .pipe(rename(config.projects.stylus.filename))
        .pipe(gulp.dest(config.projects.stylus.dest))
        .on('error', function(res) {
            handleErrors('stylus', res);
            this.emit('end')
        });
});

gulp.task('vendor-frontend-main-compile', function() {
    return gulp.src(config.projects.main.source)
        .pipe(sourcemaps.init())
        .pipe(concat('main'))
        .pipe(mktimecss(__dirname+'/web'))
        .pipe(stylus({
            'include css': true,
            use: [nib()],
            // compress: true,
            linenos: false
        }))
        // .pipe(cssmin())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.projects.main.dest))
        .pipe(rename(config.projects.main.filename))
        .pipe(gulp.dest(config.projects.main.dest))
        .on('error', function(res) {
            handleErrors('stylus', res);
            this.emit('end')
        });
});

gulp.task('run', ['stylus']);
