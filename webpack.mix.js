const mix = require("laravel-mix")

// plugin
require('laravel-mix-tailwind')
require('laravel-mix-purgecss')
require('laravel-mix-nunjucks')

// 
const sidebarItems = require('./src/sidebar.json')

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
  .sass("src/scss/tailwind.scss", "dist/css")
  .tailwind('./tailwind.config.js')
  .sass("src/scss/app.scss", "dist/css")

  // vendor
mix.copyDirectory("src/fonts", "dist/fonts")
  .copyDirectory("node_modules/fontisto", "vendor/fontisto")
  .copyDirectory("node_modules/feather-icons/dist", "vendor/feather-icons")
  .copyDirectory("node_modules/bootstrap/dist/js", "vendor/bootstrap/js")
  .copyDirectory("node_modules/chart.js/dist", "vendor/chart.js")
  .copyDirectory("node_modules/choices.js/public/assets", "vendor/choices.js")
  .copyDirectory("node_modules/pikaday", "vendor/pikaday")
  .js("node_modules/moment/moment.js", "vendor/moment")
  .copyDirectory("node_modules/jquery/dist", "vendor/jquery")
  .copyDirectory("node_modules/datatables.net/js", "vendor/datatables/js")
  .copyDirectory("node_modules/datatables.net-dt/css", "vendor/datatables/css")
  .copyDirectory("node_modules/datatables.net-dt/images", "vendor/datatables/images")
  .copyDirectory("node_modules/datatables.net-bs4/css", "vendor/datatables/css")
  .copyDirectory("node_modules/datatables.net-bs4/js", "vendor/datatables/js")


// browser sync
// mix.browserSync({
//   watch: true,
//   // server
//   server: {
//     baseDir: '.',
//     index: './pages/index.html'
//   }
// })

// nunjucks
mix.njk('src/views/', 'pages/', {
  ext: '.html',
  marked: null,
  watch: true,
  data: {
    app_name: 'E-POS Admin',
    sidebarItems
  },
  envOptions: {
    watch: true,
    noCache: true
  },
  // manageEnv: (nunjucks) => {},
})

// option
// mix.disableNotifications();