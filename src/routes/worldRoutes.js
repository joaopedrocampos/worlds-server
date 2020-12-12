const worldsController = require('../controllers/worldsControllers');

module.exports = (app) => {
    // create world
    app.post('/v1/worlds', worldsController.create);

    // list worlds
    app.post('/v1/worlds', worldsController.fetch);

    // list a single world
    app.post('/v1/worlds/:id', worldsController.get);

    // update world
    app.put('/v1/worlds/:id', worldsController.update);

    // delete world
    app.delete('/v1/worlds/:id', worldsController.delete);
};
