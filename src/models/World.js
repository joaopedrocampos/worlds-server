const mongoose = require('mongoose');
const { Schema } = mongoose;

const worldSchema = new Schema({
    name: { type: String, required: true },
    hotlink_image: { type: String, required: false },
    world_source: { type: String, required: true },
});

const World = mongoose.model('world', worldSchema);

module.exports = World;
