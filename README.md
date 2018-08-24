# Koaction

/!\ Still under development

Koaction is a wrapper around Koa. It doesn't replace it, it's fully compatible as it is just a wrapper. 
Why it can help me ? 
For some people, it's hard to begin a new project with KoaJs, even if they're used to Express. All the latest concepts of EcmaScript in one framework. It can be really disturbing. So, with Koaction, I expose an opinionated architecture around Koa and try to enhance the way of developing REST apis.

## Components
### Middlewares
Classical middlewares for Koa. Each request can through it, be affected, be rejected.

### Routes
Every route in Koaction are conditionned by its name.

### Skills
Everything you can bring to the app context. 
Folder `app/skills` by default.

Sample :
```javascript
// file [project root]/app/skills/logger.js
// Simple use case where you console something when want to log it  
module.exports = function (config, context) {
    const 
        theProdLogger = require('awesome-package-for-log-in-production'),
        toolToLog = ('development' === config.environment) ? console : theProdLogger);

    return function () {
        return {
            log : toolToLog.log,
            error : toolToLog.error,
            warn : toolToLog.warn
        };
    };
};
```
Usage :
```javascript
// File [project root]/app/endpoints/[private|public]/[endpoint].js
module.exports = function (config) {
    async function get(context) {
        context.logger.log('hello');
        // ...
    }

    return {
        get
    };
};
```
As you can understand, now, an endpoint can log anything, but without knowing what happens for real behind. In dev environment, maybe you just need a simple console.log. But in prod, maybe it's more clever to push errors to Kibana (for example). You don't care, in your business code, you just need to log something.

#### What can goes in skill ?

It's your code, so you decide.
But remember, with skill, you add features to the app context of Koa. So take care about your skills names. And at least, don't hesitate to group it. Here I could have write `context.log` and `context.error`. But not, everything can be namespaced in `context.logger.(log|error)`.
 
#### dependsOn
You can provide an array of dependencies to any skill. When all the skill dependencies are solved, the skill is solved too. Currently, only skills can be dependencies. A skill can depend on another.

Here a sample with a skill which depends on the previous logger service :
```javascript
// file [project root]/app/skills/sql.js
async function sql(config, context) {
    return {
        // you awesome methods fo managing sql skill
    };
}

sql.dependsOn = ['logger'];

module.exports = sql;
``` 
When starting the app will firstly boot the skills which depends on nothing and after the skills which depends on the first skills already resolved are resolved too.

### Environnements
You can provide a JSON configuration file for every environment you need.

### koaction.json
The main important file for Koaction, but it's not mandatory. It just allows you to change default values for your app architecture.

## CLI
We don't provide a CLI project you have to install globally. We don't want to force you to have it globally cause it's not a good practice. As it, you can maintain each project independently to each others.
If you install it globally, we can't ensure you it will work.

### Hygen
As said, Koaction is opinionated. So, it uses Hygen, marvellous code generator, to provide a simple CLI. Every component can be generated with it's help. It pushes files in the good folder, create the test bed, and everything needed.
Actually, Koaction provides templates and can be easily run with a simple command:
```shell
npx run hygen [your command]
```
Here too, it's just a usage of hygen already included, so it's fully compatible with hygen. Many thanks to the hygen team ! 

## plugins
Some plugins are already available, they are all listed here. 
- sql
- slack

If you want, you can suggest your own plugin(s) by making a pull request. 

## Where is it used ?
- MatosMaison.fr
- Yorisa.fr

Please, let us know if you use it ! We'll be proud to add you here !
