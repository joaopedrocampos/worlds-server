const World = require('../models/World');

module.exports = {
    // create a world
    create: async (request, reply) => {
        try {
            const world = request.body;
            const newWorld = await World.create(world);

            reply.code(201).send(newWorld);
        } catch (error) {
            console.error(error);

            reply.code(500).send(error);
        }
    },

    // get the list of worlds
    fetch: async (request, reply) => {
        try {
            const worlds = await World.find({});

            reply.code(200).send(worlds);
        } catch (error) {
            console.error(error);

            reply.code(500).send(error);
        }
    },

    // get a single world
    get: async (request, reply) => {
        try {
            const worldId = request.params.id;
            const world = await World.findById(worldId);

            reply.code(200).send(world);
        } catch (error) {
            console.error(error);

            reply.code(500).send(error);
        }
    },

    // update a world
    update: async (request, reply) => {
        try {
            const worldId = request.params.id;
            const updates = request.body;

            await World.findByIdAndUpdate(worldId, updates);

            const updatedWorld = await World.findById(worldId);

            reply.code(200).send({ data: updatedWorld });
        } catch (error) {
            console.error(error);

            reply.code(500).send(error);
        }
    },

    // delete a world
    delete: async (request, reply) => {
        try {
            const worldId = request.params.id;

            await World.findByIdAndDelete(worldId);

            reply.code(204).send();
        } catch (error) {
            console.error(error);

            reply.code(500).send(error);
        }
    },
};
