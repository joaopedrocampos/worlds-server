const World = require('../models/World');

async function createWorldHandler(request, reply) {
    try {
        const world = request.body;
        const newWorld = await World.create(world);

        reply.code(201).send(newWorld);
    } catch (error) {
        console.error(error);

        reply.code(500).send(error);
    }
}

module.exports = createWorldHandler;
