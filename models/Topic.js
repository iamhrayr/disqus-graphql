const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Topic', TopicSchema);
