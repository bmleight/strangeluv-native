const Fs = require('fs-extra');
const WebpackCompiler = require('../build/webpack-compiler');
const WebpackConfig = require('../build/webpack.config');
const Config = require('../config');
const Debug = require('debug')('app:bin:compile');

const paths = Config.utils_paths;

Debug('Run compiler');

WebpackCompiler(WebpackConfig)
.then((stats) => {

    if (stats.warnings.length && Config.compiler_fail_on_warning) {
        Debug('Config set to fail on warning, exiting with status code "1".');
        process.exit(1);
    }

    Debug('Copy static assets to dist folder.');
    Fs.copySync(paths.client('static'), paths.dist());
})
.catch((err) => {

    Debug('Compiler encountered an error.', err);
    process.exit(1);
});
