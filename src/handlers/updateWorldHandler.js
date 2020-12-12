const World = require('../models/World');

async function updateWorldHandler(request, reply) {
    try {
        const worldId = request.params.id;
        const updates = request.body;

        await World.findByIdAndUpdate(worldId, updates);

        const updatedWorld = await World.findById(worldId);

        reply.code(200).send({ data: updatedWorld });
    } catch (error) {
        reply.code(500).send(error);
    }
}

module.exports = updateWorldHandler;
