# Koaction

/!\ Still under development

Koaction is a wrapper around Koa. It doesn't replace it, it's fully compatible as it is just a wrapper. 
Why it can help me ? 
For some people, it's hard to begin a new project with KoaJs, even if they're used to Express. All the latest concepts of EcmaScript in one framework. It can be really disturbing. So, with Koaction, I expose an opinionated architecture around Koa and try to enhance the way of developing REST apis.

## Components
### Skills
Everything you can bring to the app context. 
Folder app/skills by default. 
#### dependsOn
You can provide an array of dependencies to any skill. When all the skill dependencies are solved, the skill is solved too. Currently, only skills can be dependencies.

### Middlewares
Classical middlewares for Koa. Each request can through it, be affected, be rejected.

### Routes
Every route in Koaction are conditionned by its name.

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