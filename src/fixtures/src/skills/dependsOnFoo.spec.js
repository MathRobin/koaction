describe('skills', () => {
    it('has only one skill', function () {
        expect(require('./dependsOnFoo')()).toBe('bar-depends');
    });
});
