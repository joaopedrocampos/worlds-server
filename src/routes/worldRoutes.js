const createWorldHandler = require('../handlers/createWorldHandler');
const deleteWorldHandler = require('../handlers/deleteWorldHandler');
const getWorldHandler = require('../handlers/getWorldHandler');
const listWorldsHandler = require('../handlers/listWorldsHandler');
const updateWorldHandler = require('../handlers/updateWorldHandler');

async function worldRoutes(fastify) {
    // create world
    fastify.route({
        attachValidation: true,
        handler: createWorldHandler,
        method: 'POST',
        path: '/v1/worlds',
    });

    // list worlds
    fastify.route({
        attachValidation: true,
        handler: listWorldsHandler,
        method: 'GET',
        path: '/v1/worlds',
    });

    // list single world
    fastify.route({
        attachValidation: true,
        handler: getWorldHandler,
        method: 'GET',
        path: '/v1/worlds/:id',
    });

    // update world
    fastify.route({
        attachValidation: true,
        handler: updateWorldHandler,
        method: 'PUT',
        path: '/v1/worlds/:id',
    });

    // delete world
    fastify.route({
        attachValidation: true,
        handler: deleteWorldHandler,
        method: 'DELETE',
        path: '/v1/worlds/:id',
    });
}

module.exports = worldRoutes;
