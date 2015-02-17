module.exports = function () {

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        alljs: [
            './public/**/*.js',
            './routes/**/*.js',
            './test/**/*.js',
            './app.js'
        ],
        less: './less/styles.less',
        css: './public/css',
        nodeServer: './bin/www',
        server: './',
        defaultPort: '3000',
        
    };
    return config;
};
