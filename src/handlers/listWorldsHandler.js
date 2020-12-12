const World = require('../models/World');

async function listWorldsHandler(request, reply) {
    try {
        const worlds = await World.find({});

        reply.code(200).send(worlds);
    } catch (error) {
        console.error(error);

        reply.code(500).send(error);
    }
}

module.exports = listWorldsHandler;
