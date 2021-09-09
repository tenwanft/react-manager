const packageName = require('./package.json').name;
module.exports = {
    webpack: (config) => {
        config.output.library = packageName;
        config.output.libraryTarget = 'umd';
        // config.output.publicPath = 'http://localhost:3000/';	// 此应用自己的端口号
        return config;
    },
    devServer: (configFunction) => {
        return function (proxy,allowedHost) {
            const config = configFunction(proxy,allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin": '*',
            }
            return config
        }
    }
}
