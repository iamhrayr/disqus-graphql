const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    topic: {
        type: Schema.ObjectId,
        ref: 'Topic'
    },
    text: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
