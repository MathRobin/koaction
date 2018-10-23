async function whichNeedToBeLoaded (app, config) {
    const
        fileSystem = require('fs'),
        process = require('process'),
        availablePaths = fileSystem.readdirSync('./src/skills'),
        result = {};

    for (const file of availablePaths) {
        if ('index.js' !== file && false === file.endsWith('.spec.js')) {
            const
                fileName = file.substring(0, file.length - 3),
                skillModule = require(process.cwd() + '/src/skills/' + file);

            if (!skillModule.dependsOn || !skillModule.dependsOn.length) {
                app.context[fileName] = await skillModule(config, app.context);
                console.log('[+skills]', fileName);
            } else {
                result[fileName] = skillModule;
            }
        }
    }

    return result;
}

module.exports = async function (app, config) {
    const
        needToBeLoaded = await whichNeedToBeLoaded(app, config);

    let
        iteratorForLoadedQueue;

    iteratorForLoadedQueue = 0;
    console.log('needToBeLoaded', needToBeLoaded);
    if (Object.keys(needToBeLoaded).length) {
        do {
            const
                dependencieName = Object.keys(needToBeLoaded)[iteratorForLoadedQueue],
                module = needToBeLoaded[dependencieName];

            module.dependsOn = module.dependsOn.filter(function (currentDependencie) {
                return !Object.keys(app.context).includes(currentDependencie);
            });

            if (!module.dependsOn.length) {
                app.context[dependencieName] = await module(config, app.context);
                console.log('[+skills]', dependencieName);
            }

            iteratorForLoadedQueue += 1;
            if (Object.keys(needToBeLoaded).length === iteratorForLoadedQueue) {
                iteratorForLoadedQueue = 0;
            }
            if (app.context[dependencieName]) {
                iteratorForLoadedQueue = 0;
                delete needToBeLoaded[dependencieName];
            }
        } while (Object.keys(needToBeLoaded).length);
    }
};
