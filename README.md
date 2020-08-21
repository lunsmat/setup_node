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
