const mongoose = require('mongoose');
const World = require('../../models/World');

const worldData = {
    name: 'Ofertas do Dia',
    world_source: 'ofertas_do_dia',
    hotlink_image: 'minha_imagem.jpg',
};

describe('World Model Test', () => {
    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(
            global.__MONGO_URI__,
            { useNewUrlParser: true, useCreateIndex: true },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    });

    it('Should create user successfully', async () => {
        const validWorld = new World(worldData);
        const createdWorld = await validWorld.save();

        // Object Id should be defined when successfully saved to MongoDB.
        expect(createdWorld._id).toBeDefined();
        expect(createdWorld.name).toEqual(worldData.name);
        expect(createdWorld.world_source).toEqual(worldData.world_source);
        expect(createdWorld.hotlink_image).toEqual(worldData.hotlink_image);
    });
});
