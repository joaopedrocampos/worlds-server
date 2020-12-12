const World = require('../models/World');

async function getWorldHandler(request, reply) {
    try {
        const worldId = request.params.id;
        const world = await World.findById(worldId);

        reply.code(200).send(world);
    } catch (error) {
        console.error(error);

        reply.code(500).send(error);
    }
}

module.exports = getWorldHandler;
