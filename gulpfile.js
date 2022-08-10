// Импорт основного модуля
import gulp from "gulp";
// Импорт общих плагинов
import { plugins } from "./config/gulp-plugins.js";
// Импорт путей
import { path } from "./config/gulp-settings.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

// Импорт задач
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { jsp } from "./config/gulp-tasks/js-p.js";
import { images } from "./config/gulp-tasks/images.js";
import { ftp } from "./config/gulp-tasks/ftp.js";
import { sprite } from "./config/gulp-tasks/sprite.js";
import { gitignore } from "./config/gulp-tasks/gitignore.js";
import { otfToTtf, ttfToWoff, fonstStyle } from "./config/gulp-tasks/fonts.js";

// Последовательная обработака шрифтов
const fonts = gulp.series( otfToTtf, ttfToWoff, fonstStyle);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const devTasks = gulp.parallel(fonts, gitignore);
// Основные задачи будем выполнять параллельно после обработки шрифтов
const buildTasks = gulp.series(fonts, js, gulp.parallel(html, css, images, gitignore), jsp);

// Экспорт задач
export { html }
export { css }
export { js }
export { images }
export { fonts }
export { sprite }
export { ftp }

// Построение сценариев выполнения задач
const development = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);

// Экспорт сценариев
export { development }
export { build }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', development);






