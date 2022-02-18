const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_close')
    .setDescription('Close the ticket relted the channel where you are'),
    
    async execute(interaction, client) {

        var passed = await ControlliPreliminari(interaction);
        if (passed == false) return;

        const FiltroTicket = {ChannelID:interaction.channel.id};
        const ticketdacercare = await Ticket.findOne(FiltroTicket);
        if (ticketdacercare == null || ticketdacercare.length == 0) 
        return await interaction.reply({content:'There are no data available for this channel!', ephemeral:true});
        else
        {
                await interaction.reply({content:"Ticket closed succesfully!", ephemeral: true});
                await Ticket.deleteOne(FiltroTicket);
                if (ticketdacercare.ChannelID != undefined && ticketdacercare.ChannelID != null) {
                    if (guild.channels.cache.get(ticketdacercare.ChannelID)) {
                        guild.channels.cache.get(ticketdacercare.ChannelID).delete();
                    }
        }
        }
    },
};

async function ControlliPreliminari(interaction) {

    //Controllo di essere sulla categoria corretta
    if (interaction.channel.parentId !== process.env.ID_CATEGORIA_WELCOME) {
        await interaction.reply({content:'This command is allowed only in WELCOME category!', ephemeral: true});
        return false;
    }
    //Controllo di mettere il comando SOLO nella pagina relativa ai ticket!!!
    if (interaction.channel.id === process.env.WELCOME_PAGE_ID || interaction.channel.id === process.env.TICKETMANAGEMENT_PAGE_ID) {
        await interaction.reply({content:'This command is allowed only in specific ticket channels (opened tickets)!', ephemeral: true});
        return false;
    }

    return true;

}