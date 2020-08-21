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

Now the project can was can use typescript, first was installed typescript like a dev depedencie with `yarn add typescript -D`, so I use `yarn tsc --init` to create a tsconfig.json (the file with the config of typescript). With typescript I added types in some parts of app, but the express doesn't have a type, so I install types of expresss with(like a dev depedencie to not go to production) `yarn add @types/express -D`, after to start the server I added a depedencie to run typescript, the depedencie is ts-node-dev and was installed like a dev depedencie with `yarn add ts-node-dev -D`, so I run in terminal `ts-node-dev src/server.ts` and the server was started. Node doesn't understand typescript so the start script was not used and was removed, now to up the server in development I use ts-node-dev, but to made run more speed I created the script dev with the value `ts-node-dev --respawn --transpileOnly --ignore-watch node_modules --no-notify src/server.ts`, this params made the ts-node dev restart the server always that a file was change(--respawn), don't verify the types of typescript and just transpile to javascript(--transpileOnly), and ignore to see if some file was changed in node_modules. And now the server start with typescript.
