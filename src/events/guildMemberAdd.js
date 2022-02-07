const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        const {user, guild} = member;
        const ticketchannel = guild.channels.cache.get('937127228318289992');

        let EmbedDescription  = ""
        EmbedDescription += 'Please, move to the channel ' + ticketchannel.toString() + '\n';
        EmbedDescription += 'and follow the described steps to be accepted in the server and get your role!';

        let Embed = new MessageEmbed()
        .setTitle('Welcome ' + user.username + ' !')
        .setDescription(EmbedDescription)
        .setThumbnail(member.user.displayAvatarURL());

        member.roles.add(process.env.ID_ROLE_GUEST);
        await guild.channels.cache.get(process.env.WELCOME_PAGE_ID).send({embeds: [Embed]});
    },
};