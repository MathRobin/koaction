const skill = require('./src/skills');

module.exports = class Koaction {
    constructor(config) {
        const Koa = require('koa');

        this.app = new Koa();
        this.config = require('./src/config')(config);

        require('./src/skills')(this.app, this.config);

        process
            .on('SIGTERM', function () {
                process.exit();
            });

        return this;
    }

    run() {
        this
            .app
            .listen(this.config.http.port);
    }
};
