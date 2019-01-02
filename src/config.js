function freezeAll(target) {
    Object.freeze(target);
    Object
        .keys(target)
        .forEach((key) => Object.freeze(target[key]));
}

module.exports = function (superConfig) {
    'use strict';

    const
        nconf = require('nconf'),
        // 'test' is not included because we want the same behavior as 'development' environment
        allowedEnvironments = ['development', 'production'];

    let environment = 'development';

    if (allowedEnvironments.includes(process.env.NODE_ENV)) {
        environment = process.env.NODE_ENV;
    }

    nconf
        .argv()
        .overrides({
            ...{
                paths: {
                    skills: './src/skills'
                }
            }, ...superConfig
        })
        .file('./_conf/env.' + environment + '.json')
        .file('package', './package.json');

    const config = nconf.get();

    config.http.port = process.env.PORT || config.http.port;
    config.http.currentDomain = config.http.protocol + '://' + config.http.domain;

    config.environment = environment;
    allowedEnvironments.splice(allowedEnvironments.indexOf('development'), 1);
    config.otherEnvironments = allowedEnvironments;
    config.appVersion = nconf.get('version');

    if ('development' === config.environment) {
        config.http.currentDomain += ':' + config.http.port;
    }

    freezeAll(config);

    console.log('[# env.]', config.environment);
    console.log('[# url]', config.http.currentDomain);
    console.log('[# version]', config.appVersion);

    return config;
};
