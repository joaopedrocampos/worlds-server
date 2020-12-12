const World = require('../models/World');

async function deleteWorldHandler(request, reply) {
    try {
        const worldId = request.params.id;

        await World.findByIdAndDelete(worldId);

        reply.code(204).send();
    } catch (error) {
        console.error(error);

        reply.code(500).send(error);
    }
}

module.exports = deleteWorldHandler;
