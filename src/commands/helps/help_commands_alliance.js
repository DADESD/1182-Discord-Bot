const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help_commands_alliance')
    .setDescription('Show all the commands present for alliance category'),
    
    async execute(interaction, client) {

        const {member, channel}=interaction;
        
        //Controllo la categoria del canale
        if (channel.parentId !== process.env.ID_CATEGORIA_KINGDOM) 
        return await interaction.reply({content:'this command is allowed only in KINGDOM category!', ephemeral: true});

        let Embed = new MessageEmbed()
        .setTitle('Alliances Related Commands')
        .setDescription('List of the commands which starts with **/alliance_**')
        .setColor('RANDOM')
        .addField('STATUS',"W.I.P.!");
    //     .addField('/ticket_generate',"Use this command to open a ticket. You can't have more than one ticket open at the same time! Mandatory values are your governor ID and Governor name, notes are facoltative")
    //     .addField('/ticket_delete',"Use this command to delete your existing ticket")
    //    if (member.roles.cache.has(process.env.KINGDOM_LEADERSHIP_ID)) {
    //         Embed.addField('/ticket_show_details (Kingdom Leadership ONLY)',"Use this command to see all the details related to the ticket of the channel (usually channelalready contain this data)");
    //         Embed.addField('/ticket_accept (Kingdom Leadership ONLY)',"Use this command to accept a ticket and close it. Use this command in the channels of a ticket!");
    //         Embed.addField('/ticket_refuse (Kingdom Leadership ONLY)',"Use this command to refuse a ticket and close it. Reason of rejection is a mandatory value. Use this command in the channels of a ticket!");
    //     }

        await interaction.reply({embeds: [Embed], ephemeral: true});
    },
};