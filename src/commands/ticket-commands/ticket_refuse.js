const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_refuse')
    .setDescription('Use this command to refuse a ticket in the relative channel!')
    .addStringOption((option) => option
        .setName('reason')
        .setDescription('Please write here the reason for which the player has been refused')
        .setRequired(true)
        ),

    async execute(interaction) {

        var passed = await ControlliPreliminari(interaction);
        if (passed == false) return;

        const FiltroTicket = {ChannelID:interaction.channel.id};
        const myticketdata = await Ticket.findOne(FiltroTicket);
        if (myticketdata == null) 
        await interaction.reply({content:'There are no data available for this channel!', ephemeral:true});
        else
        {
            await interaction.reply({content:'Closing Ticket...'});
            if (myticketdata.ChannelID != undefined && myticketdata.ChannelID != null) {
                if (interaction.guild.channels.cache.get(myticketdata.ChannelID)) {
                    interaction.guild.channels.cache.get(myticketdata.ChannelID).delete();
                }
            }
            await Ticket.deleteOne(FiltroTicket);
            let MessaggioRifiuto = 'We are sorry! <:frowning2:940309656872558663> \n You have been refused to join our kingdom, find the reason here below. \n'
            MessaggioRifiuto += '\n **' + interaction.options.getString('reason') + '** \n';
            MessaggioRifiuto += 'Anyway, feel free to stay as appreciated guest in our server if you want! To enjoy our server, please change nickname indicating your kingdom, your alliance and your Governor Name';
            interaction.channel.guild.members.cache.get(myticketdata.memberId).send(MessaggioRifiuto);
        }
    },
}

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