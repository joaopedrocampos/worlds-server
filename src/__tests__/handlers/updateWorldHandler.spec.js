const { startServer, closeServer } = require('../../server');
const mongoose = require('mongoose');

describe('Update World Handler', () => {
    let server;
    const worldObjectId = new mongoose.Types.ObjectId();

    beforeAll(async () => {
        server = await startServer();

        const worlds = mongoose.connection.collection('worlds');

        const mockWorld = {
            _id: worldObjectId,
            name: 'Ofertas do Dia',
            hotlink_image: 'teste.jpg',
            world_source: 'ofertas_do_dia',
        };
        await worlds.insertOne(mockWorld);
    });

    afterAll(async () => {
        const worlds = mongoose.connection.collection('worlds');

        await worlds.deleteMany({});
        await closeServer();
        await mongoose.connection.close();
    });

    describe('When world exists on database', () => {
        it('Should reply with updated world', async () => {
            const payload = await server.inject({
                url: `/v1/worlds/${worldObjectId}`,
                method: 'PUT',
                payload: {
                    name: 'Black Friday',
                },
            });

            expect(payload.statusCode).toEqual(200);

            const response = JSON.parse(payload.payload);

            expect(response.data.name).toEqual('Black Friday');
            expect(response.data.hotlink_image).toEqual('teste.jpg');
            expect(response.data.world_source).toEqual('ofertas_do_dia');
        });
    });

    describe('When update field is invalid', () => {
        it('Should reply with 500 error', async () => {
            const payload = await server.inject({
                url: '/v1/worlds/fake-id',
                method: 'PUT',
                payload: {
                    name: 'Black Friday',
                },
            });

            expect(payload.statusCode).toEqual(500);
        });
    });
});
