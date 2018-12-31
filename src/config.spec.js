const
    environments = [undefined, null, 0, 1, -1, true, false, NaN, Infinity, -Infinity, (new Date()), {}, {env: 'dev'}, [], [1, 2, 3], '', 'development',
        'production', 'test'];

for (const environment of environments) {
    describe('config', () => {
        describe('default', () => {
            let config;

            beforeEach(() => {
                process.env.NODE_ENV = environment;
                config = require('./config')({
                    name: 'koaction-demo',
                    version: '1.0.0',
                    http: {
                        port: '3010',
                        domain: 'localhost',
                        protocol: 'http'
                    }
                });
            });

            it('should have HTTP', () => {
                expect(config.http.domain).toBeDefined();
                expect(config.http.protocol).toMatch(/(http|https)/);
            });

            it('should have paths', () => {
                expect(config.paths.skills).toBe('./src/skills');
            });

            it('should have other package.json important rules', () => {
                expect(config.name).toBeDefined();
                expect(config.version).toBeDefined();
                expect(config.repository).toBeDefined();
                expect(config.appVersion).toBeDefined();
            });
        });

        describe('default', () => {
            let config;

            beforeEach(() => {
                process.env.NODE_ENV = environment;
                config = require('./config')({
                    name: 'koaction-demo',
                    version: '1.0.0',
                    http: {
                        port: '3010',
                        domain: 'localhost',
                        protocol: 'http'
                    },
                    paths: {
                        skills: '~/skills'
                    }
                });
            });

            it('should have HTTP', () => {
                expect(config.http.domain).toBeDefined();
                expect(config.http.protocol).toMatch(/(http|https)/);
            });

            it('should have paths', () => {
                expect(config.paths.skills).toBe('~/skills');
            });

            it('should have other package.json important rules', () => {
                expect(config.name).toBeDefined();
                expect(config.version).toBeDefined();
                expect(config.repository).toBeDefined();
                expect(config.appVersion).toBeDefined();
            });
        });
    });
}
