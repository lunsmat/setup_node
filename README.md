# Setup To Node

(1° Commit)

This is a little setup maden to use in nodejs projects. This setup  I see in a video of rocketseat, the link is: <https://www.youtube.com/watch?v=rCeGfFk-uCk>. But I restart to maden to show every part and showing to  you. So you can use this setup.

## EditorConfig

(2° Commit)

Before I made the setup I added the file .editorconfig. This file work with a extension called editor config and the extension dertemines some default settings to editor use. In my configuration I preffer 4 spaces of indentation, use charset like utf-8, break lines with unix style(lf), but this things you can change like you preffer. You can se more configurations in <https://editorconfig.org/>.

## First app created

(3° Commit)

After the editor config was maden, I made a init the node project, using yarn, with `yarn init -y`, install the express with `yarn add express` and I create a app with express, I created a folder src where I put the source code of the project, I create a file called app.js in src folder with the following content:

```js
const express = require('express');

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.get('/ping', (req, res) => res.json({ pong: 'true' }));
    }
}

module.exports = new App().express;
```

Here is the first app I made. To run the app I created a file caled server.js in src folder to start the app, the content of the app was:

```js
const app = require('./app');

app.listen(3333);
```

So finally just run `node src/server.js`, or run with script I made  with `yarn start`, and the app is on the air, the only route is `/ping`, so accessing `localhost:3333/ping`, you may revice the following json:

```json
{
    "pong": true
}
```

To commit I ignore node_modules in .gitignore

## Typescript

(4° Commit)

Now the project can was can use typescript, first was installed typescript like a dev depedencie with `yarn add typescript -D`, so I use `yarn tsc --init` to create a tsconfig.json (the file with the config of typescript). With typescript I added types in some parts of app, but the express doesn't have a type, so I install types of expresss with(like a dev depedencie to not go to production) `yarn add @types/express -D`, after to start the server I added a depedencie to run typescript, the depedencie is ts-node-dev and was installed like a dev depedencie with `yarn add ts-node-dev -D`, so I run in terminal `ts-node-dev src/server.ts` and the server was started. Node doesn't understand typescript so the start script was not used and was removed, now to up the server in development I use ts-node-dev, but to made run more speed I created the script dev with the value `ts-node-dev --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts`, this params made the ts-node dev restart the server always that a file was change(--respawn), don't verify the types of typescript and just transpile to javascript(--transpile-only), and ignore to see if some file was changed in node_modules. And now the server start with typescript.

## ESLint

(5° Commit)

Now the ESLint was added, the eslint serve to make a style guides in the code, I use the ESLint with the extension that auto formats the code to follow the style guide. To start you run in terminal `yarn eslint --init` and anwser the questions. In the ESLint I put to I anwser some questions and I use the style that I like, with indent of 4 space, using semicolon, using single quotes in string and using lf to break lines. With this my code can use a unique style guide. After answer some will be auto created the .eslintrc.json where estays the config of eslint. Some depedencies will be instaled, by default the eslint use npm, you can stop and install with yarn the listed depedencies or install with npm, delete package-lock.json and run `yarn` to update. After this, I update the tsconfig.json to stay like this:

```json
{
    "compilerOptions": {
        "target": "es2017",
        "module": "commonjs",
        "lib": ["ES6"],
        "allowJs": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "removeComments": true,
        "typeRoots": [
            "./node_modules/@types",
            "src/@types"
        ],
        "esModuleInterop": true,
        "resolveJsonModule": true,

        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "baseUrl": ".",
        "paths": {
            "@controllers/*": ["./src/controllers/*"]
        }
    }
}
```

So to finish I create the controllers in a folder controllers in src, I create a file called PingController.ts in this folder where I put this:
```ts
import { Request, Response } from 'express';

class PingController {
    public index(request: Request, response: Response): Response {
        return response.json({
            pong: true,
        });
    }
}

export default PingController;
```

And create a routes.ts file in src where I put this:

```ts
import { Router } from 'express';
import PingController from '@controllers/PingController';

const routes = Router();

const pingController = new PingController();

routes.get('/', pingController.index);

export default routes;
```

So I import the routes in app file and a change the routes method to be:

```ts
private routes() {
    this.express.use(routes);
}
```

I have import the PingControllers with @controllers beacause I have used this lines in tsconfig.json:

```json
{
    "baseUrl": ".",
    "paths": {
        "@controllers/*": ["./src/controllers/*"]
    }
}
```

I Have used but the ts-node-dev doesn't understand this, was because I install tsconfig-paths with `yarn add tsconfig-paths -D` and update the dev script to `ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts`,where -r run the resgister paths of the tsconfig-paths and you can use @controllers. After update you can run `yarn dev` and access `localhost:3333/ping` and the json may have be send to you.

Now my develompent envoiriment use typescript, and style guide with eslint.

## Jest

(6° Commit)

Now to make tests in the app we will install jest, but this lib doesn't come with types, so you install the types with this lib, and to use typescript with jest you install the ts-jest lib, so you can install this like depedency of development by `yarn add jest @types/jest ts-jest -D`,  with this you have to init the jest, just run in terminal `yarn jest --init` and anwser the questions, I have answer with:

- Would you like to use Jest when running "test" script in "package.json"? ... yes
- Do you want Jest to add coverage reports? ... no
- Which provider should be used to instrument code for coverage? » babel
- Automatically clear mock calls and instances between every test? ... yes

So the jest will create a file called jest.config.js, and add a script test in package.json. To test I install the supertest depedencie to dev  with `yarn add supertest -D`, so I create a folder test in scr and created the file ping.spec.ts inside the folder test, and in this folder I put:

```ts
import request from 'supertest';
import app from '../app';

test('It shoult be okay', async () => {
    const response = await request(app).get('/ping');

    expect(response.body).toMatchObject({ pong: true });
});
```

This is a test to see if a request made to app with get method in /ping will be return the json with:

```json
{
    "pong": true
}
```

But until the jest doesn't understand typescript so I open the jest.config.js and search by preset, the line was commented and I uncommented the line and change to:

```json
{
    "preset": "ts-jest"
}
```

So I run `yarn test` and the test passed, so the jest was working. But the ESLint doesn't know who is jest, you can changing this in .eslintrc.json updating the env adding jest like true, the env will be like:

```json
{
    "env": {
        "es2020": true,
        "node": true,
        "jest": true
    }
}
```

Well, we just made a simple test with just. But jest doesn't understand the paths like @controllers that we made, so to jest understand this, in top of file jest.config.js paste this:

```js
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
```

And to jest understand search by moduleNameMapper, will be commented, you have to uncomment and change the value to:

```js
{
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
}
```

Now can works, but may the jest.config.js can not work because the you are requiring the tsconfig.json and you put that root dist in tsconfig.json was ./src, so to fix this, go to tsconfig.json and after the compilerOptions you add a include like:

```json
{
    "compilerOption": {/**/},
    "include": [
        "src/**/*"
    ]
}
```

With this the jest will understand paths like @controllers. To finish, you can make the eslint ignore the file of config of the jest so you can make a file called .eslintignore in the root folder of the project and paste:

```
/*.js
```

So the ESLint not will look no one file with .js in the root folder of the project.

## Babel

(7° Commit)

Well, all works but the node doesn't understand typescript, just javascript, so you can use babel to transform all your code in typescript, to a code in javascript, after this you can use only node to run your app. To install all tools that you will need of babel you use `yarn add -D @babel/cli @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver`, again like a dev dependencie. Now to config the babel you have to create a file in root folder of the project, the name of the file has to be babel.config.js and you paste in the file:

```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                '@controllers': './src/controllers',
            }
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
};
```

And finally the babel will be configured, now, to finish you have to create 2 scripts in your package.json, one to babel transform the code typescript in javascript, and another to node start the javascript, so added in package.json the scripts:

```json
{
    "scripts": {
        "start": "node dist/server.js",
        "build": "babel src --extensions \".js,.ts\" --out-dir dist --copy-files --no-copy-ignored",
        "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules --no-notify src/server.ts",
        "test": "jest"
    }
}
```

The dev and the jest we just have created, but the the build and the start you create now, the build run the babel to create a build in javascript in a folder called dist that will be in the root folder of your project, and the start the node to run the the the server created by the build, with this, your app will be started for production, just run build and run start. After this just add the dist folder where will be build in gitignore. And with this, all the development part will be finished, and now just start to code.

## CORS

(8° Commit)

This template was used to create apps with node, but will be most used to create api's, to allow access from api we will add the cors in the project. You can add cors by `yarn add cors`, note that we are not adding like a devdepedencie, this is because the cors will be used in production, so we are not add like dev depedencie. But cors doesn't have types to use with typescript, to fix this install types of cors with `yarn add @types/cors -D` and now is a dev Depedencie. With this import cors in app.ts file and add in the middlewares controller the line

```js
this.app.use(cors());
```
