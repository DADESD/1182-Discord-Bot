const Balance = require('../schemas/balance');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        // const balanceProfile = await client.createBalance(message.member);
        // const amount = Math.floor(Math.random() + 29) + 1;
        // await Balance.findOneAndUpdate({memberId: balanceProfile.memberId, guildId: balanceProfile.guildId});
    },
};