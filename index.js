export default class koaction {
    constructor(config) {
        const
            Koa = require('koa');

        this.app = new Koa();
        this.config = config;

        process
            .on('SIGTERM', function () {
                process.exit();
            });

        return this;
    }

    registerSkills(path) {
        require(path)(this.app, this.config);
    }

    run() {
        this
            .app
            .listen(config.http.port);
    }
}
