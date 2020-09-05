import app from './app';

const server = app.listen(app.get('port'), () => {
    console.log(`🚀 Server running on the port ${Object(server.address()).port}`);
});
