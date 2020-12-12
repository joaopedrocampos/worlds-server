const { startServer } = require('./src/server');

(async function runServer() {
    try {
        const fastify = await startServer();

        console.log(
            `Server listening at ${fastify.server.address().address}:${
                fastify.server.address().port
            }`
        );

        console.log(fastify.printRoutes());
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
