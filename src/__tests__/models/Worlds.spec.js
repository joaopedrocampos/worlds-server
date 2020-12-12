const mongoose = require('mongoose');
const World = require('../../models/World');

const worldData = {
    name: 'Ofertas do Dia',
    world_source: 'ofertas_do_dia',
    hotlink_image: 'minha_imagem.jpg',
};

describe('World Model Test', () => {
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

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Should create world', async () => {
        const validWorld = new World(worldData);
        const createdWorld = await validWorld.save();

        expect(createdWorld._id).toBeDefined();
        expect(createdWorld.name).toEqual(worldData.name);
        expect(createdWorld.world_source).toEqual(worldData.world_source);
        expect(createdWorld.hotlink_image).toEqual(worldData.hotlink_image);
    });

    it('Should get world', async () => {
        const savedWorld = await World.findOne({ name: worldData.name });

        expect(savedWorld.name).toEqual(worldData.name);
        expect(savedWorld.world_source).toEqual(worldData.world_source);
        expect(savedWorld.hotlink_image).toEqual(worldData.hotlink_image);
    });

    it('Should update world', async () => {
        const filter = { name: worldData.name };
        const update = { name: 'Black Friday 2020' };

        await World.findOneAndUpdate(filter, update);

        const updatedWorld = await World.findOne({ name: 'Black Friday 2020' });

        expect(updatedWorld.name).toEqual('Black Friday 2020');
        expect(updatedWorld.world_source).toEqual(worldData.world_source);
        expect(updatedWorld.hotlink_image).toEqual(worldData.hotlink_image);
    });

    it('Should delete world', async () => {
        await World.findOneAndDelete({ name: worldData.name });

        const savedWorld = await World.findOne({ name: worldData.name });

        expect(savedWorld).toBeNull();
    });
});
