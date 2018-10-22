function withDependency () {
    return 'bar';
}

withDependency.dependsOn = ['foo'];

module.exports = withDependency;
