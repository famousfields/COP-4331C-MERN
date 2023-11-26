// Defines a token for user email verification
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: {type: String, required: true },
    expireAt: { type: Date, default: Date.now, expires: 7200 } //24-hours in seconds 86400
});
//tokenSchema.index( {"expireAt": 1}, { expireAfterSeconds: 10});  // sets the expireAt field to be deleted 1 sec after the time it has.

const Token = mongoose.model("Token", tokenSchema);
//mongoose.Collection.createIndex( {"expireAt"})

module.exports = Token;