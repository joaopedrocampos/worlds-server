const { startServer, closeServer } = require('../../server');
const mongoose = require('mongoose');

describe('Delete World Handler', () => {
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
        it('Should delete world', async () => {
            const payload = await server.inject({
                url: `/v1/worlds/${worldObjectId}`,
                method: 'DELETE',
            });

            expect(payload.statusCode).toEqual(204);
            expect(payload.payload).toBeFalsy();
        });
    });

    describe('When _id is invalid', () => {
        it('Should reply with 500 error', async () => {
            const payload = await server.inject({
                url: '/v1/worlds/fake-id',
                method: 'DELETE',
            });

            expect(payload.statusCode).toEqual(500);
        });
    });
});
