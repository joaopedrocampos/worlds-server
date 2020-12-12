const { startServer, closeServer } = require('../../server');
const mongoose = require('mongoose');

describe('List World Handler', () => {
    let server;

    beforeAll(async () => {
        server = await startServer();

        const worlds = mongoose.connection.collection('worlds');

        const mockWorlds = [
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'Ofertas do Dia',
                hotlink_image: 'teste.jpg',
                world_source: 'ofertas_do_dia',
            },
            {
                _id: new mongoose.Types.ObjectId(),
                name: 'Mercado',
                hotlink_image: 'mercado.jpg',
                world_source: 'mercado',
            },
        ];
        await worlds.insertMany(mockWorlds);
    });

    afterAll(async () => {
        const worlds = mongoose.connection.collection('worlds');

        await worlds.deleteMany({});
        await closeServer();
        await mongoose.connection.close();
    });

    describe('When worlds exists on database', () => {
        it('Should reply with worlds', async () => {
            const payload = await server.inject({
                url: '/v1/worlds/',
                method: 'GET',
            });

            expect(payload.statusCode).toEqual(200);

            const response = JSON.parse(payload.payload);

            expect(response.length).toEqual(2);
        });
    });
});
