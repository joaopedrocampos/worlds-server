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
        mongoose.connect('mongodb://ae_natan:mudar1234@localhost:27017/worlds');
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

        await fastify.listen(5000, '0.0.0.0');

        return fastify;
    } catch (error) {
        throw new Error(`Error while trying to start server! ${error}`);
    }
}

async function closeServer() {
    await fastify.close();
}

module.exports = { startServer, closeServer };
