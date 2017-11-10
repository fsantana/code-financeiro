const gulp = require('gulp');
const elixir = require('laravel-elixir');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const webpackDevConfig = require('./webpack.dev.config');
const mergeWebpack = require('webpack-merge');

//require('laravel-elixir-vue');
//require('laravel-elixir-webpack-official');

// zerando os loaders para que fique somente os loaders que estão no webpackConfig
/*Elixir.webpack.config.module.loaders = [];

Elixir.webpack.mergeConfig(webpackConfig);
Elixir.webpack.mergeConfig(webpackDevConfig);*/
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

gulp.task('webpack-dev-server',()=>{
    let config =  mergeWebpack(webpackConfig, webpackDevConfig);

    let inlineHot = [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://127.0.0.1:8080'
    ];

    for(let key of Object.keys(config.entry)){
        config.entry[key] = [config.entry[key]].concat(inlineHot);
    }

    new WebpackDevServer(webpack(config),{
        hot: true,
        proxy:{
            '*': 'http://127.0.0.1:8000'
        },
        watchOptions:{
            poll:true,
            aggregateTimeout: 300
        },
        publicPath: config.output.publicPath,
        noInfo:true,
        stats: {colors:true}
    }).listen(8080,"127.0.0.1",() => {
        console.log("Bundling project ...")
    })
});

elixir(mix => {
    mix.sass('./resources/assets/admin/sass/admin.scss')
        .copy('./node_modules/materialize-css/fonts/roboto','public/fonts/roboto');

    gulp.start('webpack-dev-server');

    mix.browserSync({
        host: '127.0.0.1',
        proxy: 'http://127.0.0.1:8080',

    });
      // .webpack('app.js');
});
