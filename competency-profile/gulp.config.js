module.exports = function () {
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];
    
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
        defaultPort: '3000'
    };
    
    config.karma = getKarmaOptions();
    
    return config;
    
    
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                'public/app/**/*.js',
                'test/**/*.js'
            ),
            exclude: [],
            preprocessors: []
        };
        return options;
    }
};
