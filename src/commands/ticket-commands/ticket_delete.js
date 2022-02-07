const {SlashCommandBuilder} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const ticket = require('../../schemas/ticket');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_delete')
    .setDescription('Cancel your existing ticket'),

    async execute(interaction, client) {
        const {guild, member} = interaction;
        
        //Ora gli metto in output i bottoni, primaperò genero già un record per 
        //questo giocatore salvando il governor ID, così dopo devo solo salvarlo
        const FiltroTicket = {guildId:guild.id, memberId:member.id};
        const ticketdacercare = await Ticket.findOne(FiltroTicket);
        if (ticketdacercare == null) {
            interaction.reply({content:"You don't have any ticket to delete!", ephemeral: true});
        } else {
            await Ticket.deleteOne(FiltroTicket);
            console.log('Record eliminato, controlliamo il canale');
            console.log(ticketdacercare.ChannelID);
                if (ticketdacercare.ChannelID != undefined && ticketdacercare.ChannelID != null) {
                    if (guild.channels.cache.get(ticketdacercare.ChannelID)) {
                        guild.channels.cache.get(ticketdacercare.ChannelID).delete();
                    }
                }
            interaction.reply({content:"Ticket deleted succesfully!", ephemeral: true})    
        }
    },
};