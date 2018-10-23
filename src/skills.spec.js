describe('skills', () => {
    const
        mockFileList = [
            'foo.js',
            'foo.spec.js'
        ];

    let app;

    beforeEach(() => {
        app = {
            context: {}
        };

        jest.mock('process', () => ({
            cwd: jest.fn(() => './fixtures')
        }));

        jest.mock('fs', () => ({
            readdirSync: jest.fn(() => mockFileList)
        }));
    });

    describe('skills without dependencies', () => {
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
        beforeEach(() => {
            if (!mockFileList.includes('dependsOnFoo.js')) {
                mockFileList.push('dependsOnFoo.js');
                mockFileList.push('dependsOnFoo.spec.js');
            }

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
            expect(app.context.dependsOnFoo).toBe('bar-depends');
        });
    });
});
