const gulp = require("gulp"),
  browserSync = require("browser-sync").create();

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });

  gulp.watch("./css/*.css").on("change", browserSync.reload)
  gulp.watch("./*.html").on("change", browserSync.reload)
  gulp.watch("./js/functions.js").on("change", browserSync.reload)

});

gulp.task('default', ['serve'])
