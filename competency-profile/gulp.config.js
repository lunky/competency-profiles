module.exports = function () {

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
        
        nodeServer: './bin/www',
        server: './',
        defaultPort: '3000',
        
    };
    return config;
};
