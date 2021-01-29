let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//  main
mix.js("src/scripts/app.js", "dist/js")
  .sass("src/scss/bootstrap.scss", "dist/css")
  .sass("src/scss/app.scss", "dist/css")
  .copyDirectory("src/fonts", "dist/fonts")
  .copyDirectory("node_modules/bootstrap/dist/js", "vendor/bootstrap/js");

// option
mix.disableNotifications();