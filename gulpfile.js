const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create();

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });

  gulp.watch("./sass/*.scss", ["sass"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/functions.js").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["sass", "serve"]);
