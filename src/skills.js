module.exports = async function (app, config) {
    const
        fileSystem = require('fs'),
        path = require('path'),
        process = require('process'),
        availablePaths = fileSystem.readdirSync('./src/skills'),
        stillNeedToBeLoaded = {};

    let
        iteratorForLoadedQueue;

    for (const file of availablePaths) {
        if ('index.js' !== file && false === file.endsWith('.spec.js')) {
            const
                fileName = file.substring(0, file.length - 3),
                skillModule = require(process.cwd() + '/src/skills/' + file);

            if (!skillModule.dependsOn || !skillModule.dependsOn.length) {
                app.context[fileName] = await skillModule(config, app.context);
                console.log('[+skills]', fileName);
            } else {
                stillNeedToBeLoaded[fileName] = skillModule;
            }
        }
    }

    iteratorForLoadedQueue = 0;
    if (Object.keys(stillNeedToBeLoaded).length) {
        do {
            const
                dependencieName = Object.keys(stillNeedToBeLoaded)[iteratorForLoadedQueue],
                module = stillNeedToBeLoaded[dependencieName];

            module.dependsOn = module.dependsOn.filter(function (currentDependencie) {
                return !Object.keys(app.context).includes(currentDependencie);
            });

            if (!module.dependsOn.length) {
                app.context[dependencieName] = await module(config, app.context);
                console.log('[+skills]', dependencieName);
            }

            iteratorForLoadedQueue += 1;
            if (Object.keys(stillNeedToBeLoaded).length === iteratorForLoadedQueue) {
                iteratorForLoadedQueue = 0;
            }
            if (app.context[dependencieName]) {
                iteratorForLoadedQueue = 0;
                delete stillNeedToBeLoaded[dependencieName];
            }
        } while (Object.keys(stillNeedToBeLoaded).length);
    }
};
