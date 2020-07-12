const { src, dest } = require('gulp');

function copyIcons() {
  return src('src/assets/**/*.png')
    .pipe(dest('dist/assets'));
}

exports.default = copyIcons;
