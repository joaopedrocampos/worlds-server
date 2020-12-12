const fastify = require('fastify');
const mongoose = require('mongoose');

const app = fastify();

// connection on database
try {
    mongoose.connect('mongodb://localhost:27017/worlds_db');
} catch (e) {
    console.error(e);
}

// starting application on port 5000
app.listen(5000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server running on port ${5000}`);
});