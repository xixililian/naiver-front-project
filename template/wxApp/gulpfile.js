const { src, dest, watch } = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require('sass'));

function tansferSass(path, stats) {
    console.log(path);
    return src(path)
        .pipe(sass().on("error", sass.logError))
        .pipe(rename({ extname: ".wxss" }))
        .pipe(dest("./"))
}

exports.default = function () {
    const watcher = watch([
        "package1/**/*.scss",
        "package2/**/*.scss",
        "components/**/*.scss",
    ], {
        delay: 2e3
    });
    watcher.on("change", tansferSass);
    watcher.on("add", tansferSass);
}