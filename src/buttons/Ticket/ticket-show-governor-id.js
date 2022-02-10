const Ticket = require('../../schemas/ticket')();
const mongoose = require('mongoose');

module.exports = {
    data: {
        name: 'ticket-show-governor-id'
    },

    async execute(interaction, client) {

        const FiltroTicket = {ChannelID:interaction.channel.id};
        const myticketdata = await Ticket.findOne(FiltroTicket);
        if (myticketdata == null) await interaction.reply('There are no data available for this channel!');
        else
        {
            interaction.reply({content: myticketdata.governor_ID, ephemeral: true});
        }
    }
}