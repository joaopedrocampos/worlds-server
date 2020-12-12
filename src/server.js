const config = require('config');
const fastify = require('fastify')({
    ignoreTrailingSlash: true,
});
const mongoose = require('mongoose');

const worldRoutes = require('./routes/worldRoutes');

const contentRangeHook = require('./hooks/contentRangeHook');

function registerRoutes() {
    fastify.register(worldRoutes);
}

function setGlobalErrorHandlers() {
    fastify.setNotFoundHandler((request, reply) => {
        reply.type('application/json').code(404).send({
            code: 404,
            error: 'Not found',
            message: 'Fallback not reached',
        });
    });

    fastify.setErrorHandler((error, request, reply) => {
        reply.type('application/json').code(500).send({
            code: 500,
            error: 'Internal Server Error',
            message: 'Internal Server Error',
        });
    });
}

function setGlobalHooks() {
    fastify.addHook('preHandler', contentRangeHook);
}

function connectDatabase() {
    try {
        const { user, password, host, port } = config.get('database');
        const connectionString = `mongodb://${user}:${password}@${host}:${port}/worlds`;

        mongoose.connect(connectionString);
    } catch (e) {
        console.error(e);

        throw e;
    }
}

async function startServer() {
    try {
        setGlobalErrorHandlers();

        setGlobalHooks();

        connectDatabase();

        registerRoutes();

        await fastify.listen(config.get('server.port'), '0.0.0.0');

        return fastify;
    } catch (error) {
        throw new Error(`Error while trying to start server! ${error}`);
    }
}

async function closeServer() {
    await fastify.close();
}

module.exports = { startServer, closeServer };
