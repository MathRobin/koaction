function withDependency () {
    return 'bar-depends';
}

withDependency.dependsOn = ['foo'];

module.exports = withDependency;
