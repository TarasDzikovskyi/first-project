const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require("../config");
const { CURRENT_YEAR } = require("../config/constants");
const { USER } = require("../config/database-tables.enum");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    born_year: {
        type: Number,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: databaseTablesEnum.USER,
        enum: Object.values(databaseTablesEnum)
    },
    lastLoginDate: {
        type: Date,
        default: Date.now
    },
    avatar: {
    }
}, { timestamps: true });

module.exports = model(USER, userSchema);
