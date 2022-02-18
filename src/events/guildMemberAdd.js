const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const {user, guild} = member;
        const ticketchannel = guild.channels.cache.get(process.env.TICKETMANAGEMENT_PAGE_ID);
        const kvkexpectationschannel = guild.channels.cache.get(process.env.KVK_EXPECTATIONS_PAGE_ID);
        const ruleschannel = guild.channels.cache.get(process.env.RULES_PAGE_ID);
        const guestschannel = guild.channels.cache.get(process.env.GUESTS_CHAT_PAGE_ID);

        let MessageDescription  = 'Welcome **' + user.username + '** ! \n\n'
        MessageDescription += "If you want to be our appreciated guest and have a chat with us, you don't have to do anything, you can already write in " + guestschannel.toString() + ' channel \n\n'
        MessageDescription += 'Please, move to the channel ' + ticketchannel.toString();
        MessageDescription += ' and follow the described steps to be accepted in case you are a proud member of 1182 or want to be part of us! \n\n';
        MessageDescription += 'You **all** are also asked to visit the channels ' + ruleschannel.toString() + ' in order to understand better our server rules and ' + kvkexpectationschannel.toString() + ' to know our kvk expectation from you (clearly, the last channel only if you want to join us)';

        member.roles.add(process.env.ID_ROLE_GUEST);
        await guild.channels.cache.get(process.env.WELCOME_PAGE_ID).send({content: MessageDescription});
    },
};