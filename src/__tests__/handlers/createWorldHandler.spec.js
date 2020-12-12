const { startServer, closeServer } = require('../../server');
const mongoose = require('mongoose');

describe('Create World Handler', () => {
    let server;

    beforeAll(async () => {
        server = await startServer();
    });

    afterAll(async () => {
        const worlds = mongoose.connection.collection('worlds');

        await worlds.deleteMany({});
        await closeServer();
        await mongoose.connection.close();
    });

    describe('When world data is valid', () => {
        it('Should create world', async () => {
            const payload = await server.inject({
                url: '/v1/worlds',
                method: 'POST',
                payload: {
                    name: 'Ofertas do Dia',
                    hotlink_image: 'teste.jpg',
                    world_source: 'ofertas_do_dia',
                },
            });

            expect(payload.statusCode).toEqual(201);

            const response = JSON.parse(payload.payload);

            expect(response._id).toBeDefined();
            expect(response.name).toEqual('Ofertas do Dia');
            expect(response.hotlink_image).toEqual('teste.jpg');
            expect(response.world_source).toEqual('ofertas_do_dia');
        });
    });

    describe('When payload is invalid', () => {
        it('Should reply with 500 error', async () => {
            const payload = await server.inject({
                url: '/v1/worlds',
                method: 'POST',
                payload: {
                    xablau: 'batatinha',
                },
            });

            expect(payload.statusCode).toEqual(500);
        });
    });
});
