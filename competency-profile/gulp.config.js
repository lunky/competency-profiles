module.exports = function () {
    var client = './public/';
    var temp = './.tmp/';

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './public/javascripts/*.js',
            './routes/**/*.js',
            './test/**/*.js',
            './app.js'
        ],
        build: './build/',
        images: client + 'images/**/*.*',
        stylus: client + 'stylesheets/style.styl',
        temp: temp
    };
    return config;
};
