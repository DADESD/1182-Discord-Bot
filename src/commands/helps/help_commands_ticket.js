const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help_commands_ticket')
    .setDescription('Show all the commands present for ticket category'),
    
    async execute(interaction, client) {

        const {member}=interaction
        
        let Embed = new MessageEmbed()
        .setTitle('Tickets Related Commands')
        .setDescription('List of the commands which starts with "/ticket_"')
        .setColor('RANDOM')
        .addField('/ticket_generate',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor (or Personal) name, notes are facoltative")
        .addField('/ticket_delete',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor (or Personal) name, notes are facoltative")
       if (member.roles.cache.has(process.env.KINGDOM_LEADERSHIP_ID)) {
            Embed.addField('/ticket_show_details',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor (or Personal) name, notes are facoltative");
            Embed.addField('/ticket_accept',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor (or Personal) name, notes are facoltative");
            Embed.addField('/ticket_refuse',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor (or Personal) name, notes are facoltative");
        }

        await interaction.reply({embeds: [Embed], ephemeral: true});
    },
};