describe('skills', () => {
    let app;

    jest.mock('process', () => ({
        cwd: jest.fn(() => './fixtures')
    }));

    beforeEach(() => {
        app = {
            context: {}
        };
    });

    describe('skills without dependencies', () => {
        jest.mock('fs', () => ({
            readdirSync: jest.fn(() => [
                'foo.js',
                'foo.spec.js'
            ])
        }));

        beforeEach(() => {
            require('./skills')(app, {
                name: 'koaction-demo',
                version: '1.0.0',
                http: {
                    port: '3010',
                    domain: 'localhost',
                    protocol: 'http'
                }
            });
        });

        it('has only one skill', function () {
            expect(Object.keys(app.context).length).toBe(1);
        });

        it('has skill foo', function () {
            expect(app.context.foo).toBe('bar');
        });
    });

    describe('skills with dependencies', () => {
        jest.mock('fs', () => ({
            readdirSync: jest.fn(() => [
                'foo.js',
                'foo.spec.js',
                'dependsOnFoo.js',
                'dependsOnFoo.spec.js'
            ])
        }));

        beforeEach(() => {
            require('./skills')(app, {
                name: 'koaction-demo',
                version: '1.0.0',
                http: {
                    port: '3010',
                    domain: 'localhost',
                    protocol: 'http'
                }
            });
        });

        it('has two skills', function () {
            expect(Object.keys(app.context).length).toBe(2);
        });

        it('has skill foo', function () {
            expect(app.context.foo).toBe('bar');
        });

        it('has skill dependsOnFoo', function () {
            expect(Object.keys(app.context)).toBe('');
        });
    });
});
