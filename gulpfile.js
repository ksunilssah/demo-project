// Import task modules and setting up variables.
var gulp = require('gulp'),
    hb = require('gulp-hb'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    bless = require('gulp-bless'),
    babel = require('gulp-babel'),    
    exec = require('gulp-exec'),
    runSequence = require('run-sequence'),  
    access = require('gulp-accessibility'),//https://github.com/yargalot/gulp-accessibility
    // Set base directories
    bases = {
     src: 'src/',
     dist: 'dist/'
    },
    // Set paths
    paths = {
       libs: {
         js:[
           'bower_components/jquery/jquery.min.js'
         ]
       },
       modules:['src/scripts/config.js',
                'src/scripts/util.js',     
                'src/components/**/*.js'                          
              ],
       imgs: ['src/assets/img/**/**.*','src/assets/img/**.*'],
       fonts: ['src/assets/fonts/**/**.*','src/assets/fonts/**.*']
    };
  
  //***************** BUILD TASKS*********************

  // CSS tasks
  gulp.task('css', function () {
      return gulp.src(bases.src+'assets/sass/style.scss')
      .pipe(sass({errLogToConsole: true}))     
      /* Note:- If IE9 supported then use bless for the splitting of large CSS files */
        //.pipe(bless())
      .pipe(gulp.dest(bases.dist+'assets/css'))
      .pipe(minifyCSS({ keepSpecialComments: 1, processImport: false }))
      .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest(bases.dist + 'assets/css'));
  });

  // CSS Linting tasks
  gulp.task('scss-lint', function() {
    return gulp.src(bases.src+'**/*.scss')
      .pipe(scsslint({
        'config': '.scss-lint.yml',
        'reporterOutput': 'scssReport.json'
      }));
  });

  //JS Tasks
  gulp.task('js',function(){
      gulp.src(paths.libs.js)
      .pipe(concat('libs.js'))
      .pipe(uglify())
      .pipe(gulp.dest(bases.dist+'assets/js/libs'))

      gulp.src(paths.modules)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))

      /* Use below command to fail the build if errors occur in js files. */
      //.pipe(jshint.reporter('fail'))  
      .pipe(concat('main.js'))
      .pipe(gulp.dest(bases.dist+'assets/js'))      
      /* if developer is writing code in ES6 then use babel. need and TESTTTTT*/
      //.pipe(babel())      
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(bases.dist+'assets/js'));
  });


gulp.task('accessibility', function() {
  return gulp.src(bases.dist+'/*.html')
    .pipe(access({
      force: true,
      accessibilityLevel: 'WCAG2A',
      ignore: [
          'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
          'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2'
        ]
    }))
    .on('error', console.log)
    .pipe(access.report({
        reportType: 'txt',
        reportLevels: {
          'notice': false,
          'warning': true,
          'error': true
        }
    }))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest('reports/txt'));
});

// Accessibility Tasks
gulp.task('markup', function(){
  return gulp.src([bases.src+'templates/pages/**/*.hbs'], {
    })
    .pipe(
      hb({
        debug: true,
        helpers: [
          'node_modules/handlebars-layouts',
        ],
        data: bases.src+'asstes/js/data/**/*.{js,json}'
      })
      .partials(bases.src+'templates/partials/**/*.hbs')
      .partials(bases.src+'components/**/*.hbs')
    )
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(bases.dist));
});

// clean up
gulp.task('clean', function () {
     gulp.src(bases.dist, {read: false})
      .pipe(clean({force: true}));
});

// Copy images
gulp.task('copy:imgs', function() {

  // images
   gulp.src(paths.imgs)
   .pipe(imagemin())
   .pipe(gulp.dest(bases.dist+'assets/img'));

});

// Copy fonts
gulp.task('copy:fonts', function() {

  // fonts
   gulp.src(paths.fonts)
   .pipe(gulp.dest(bases.dist+'assets/fonts'));

});

// Copy all
gulp.task('copy:all', ['copy:imgs', 'copy:fonts']);

gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('css-watch', ['css'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('json-watch', ['json'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('markup-watch', ['markup'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('default', function() {
  runSequence(['copy:all','css', 'scss-lint', 'js', 'markup'],
  //gulp.task('default', [ 'copy:all','css', 'js', 'markup','webpackbuild'], 
  function () {
    var options = {
      continueOnError: false, // default = false, true means don't emit error event 
      pipeStdout: false, // default = false, true means stdout is written to file.contents 
      customTemplatingThing: "test" // content passed to gutil.template() 
    },
    reportOptions = {
      err: true, // default = true, false means don't write err 
      stderr: true, // default = true, false means don't write stderr 
      stdout: true // default = true, false means don't write stdout 
    };    
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch(bases.src+'**/*.scss', ['css-watch']);
    gulp.watch(bases.src+'**/*.js', ['js-watch']);
    gulp.watch(bases.src+'**/*.json', ['json-watch']);
    gulp.watch(bases.src+'**/*.hbs', ['markup', 'markup-watch']);
    gulp.src('/')    
    .pipe(exec('cd src/react', options))
    //.pipe(exec('cd react && npm run-script start', options))
    .pipe(exec.reporter(reportOptions));

  });
});
