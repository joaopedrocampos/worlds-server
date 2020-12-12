const World = require('../models/World');

module.exports = (request, reply, done) => {
    World.count({}, (err, count) => {
        if (err) {
            console.error(err);
            reply.code(500).send(err);
        }

        reply.header('Content-Range', `notes 0-10}/${count}`);
        done();
    });
};
