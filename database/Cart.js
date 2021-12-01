const { Schema, model } = require('mongoose');

const { USER, PUB, CART} = require("../config/database-tables.enum");

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true
    },
    cartItems: [
        {
            pub: {
                type: Schema.Types.ObjectId,
                ref: PUB,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]


}, { timestamps: true });

module.exports = model(CART, cartSchema);
