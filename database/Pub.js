const {Schema, model} = require('mongoose')
const {PUB} = require("../config/database-tables.enum");

const pubSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        required: true
    },
    statistic: {
        type: String,
        required: true,
        trim: true
    },
    schedule: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
    },
    likeCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    }

}, { timestamps: true });


module.exports = model(PUB, pubSchema);
