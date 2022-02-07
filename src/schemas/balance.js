const mongoose = require('mongoose');
const balanceSchema = new mongoose.Schema({
    guildId: String,
    memberId: String,
    amount: Number
});

module.exports = mongoose.model('balances', balanceSchema);