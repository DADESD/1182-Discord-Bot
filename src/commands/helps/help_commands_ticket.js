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

        const {member, channel}=interaction
        
        //Controllo la categoria del canale
        if (channel.parentId !== process.env.ID_CATEGORIA_WELCOME) 
        return await interaction.reply({content:'this command is allowed only in WELCOME category!', ephemeral: true});

        let Embed = new MessageEmbed()
        .setTitle('Tickets Related Commands')
        .setDescription('List of the commands which starts with "/ticket_"')
        .setColor('RANDOM')
        .addField('', '')
        .addField('/ticket_generate',"Use this command to open a ticket for your name. You can't have more than one ticket open at the time! Mandatory values are your governor ID and Governor name, notes are facoltative")
        .addField('/ticket_delete',"Use this command to delete your existing ticket")
       if (member.roles.cache.has(process.env.KINGDOM_LEADERSHIP_ID)) {
            Embed.addField('/ticket_show_details (Administrators ONLY)',"Use this command to see all the details related to the ticket of the channel");
            Embed.addField('/ticket_accept',"Use this command to accept a ticket and close it. After did it, you will have to delete the channel for the ticket");
            Embed.addField('/ticket_refuse',"Use this command to refuse the ticket of the selected channel. Reason of rejection is a mandatory value");
        }

        await interaction.reply({embeds: [Embed], ephemeral: true});
    },
};