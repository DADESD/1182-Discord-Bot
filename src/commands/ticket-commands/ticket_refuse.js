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

        // if (interaction.channel.name.toUpperCase().endsWith('ACCEPTED') || interaction.channel.name.toUpperCase().endsWith('REFUSED'))
        // return await interaction.reply({content: "Ticket has already been accepted / refused, you can't modify it!", ephemeral: true});

        //Il ticket non era ancora stato gestito, posso continuare
        const FiltroTicket = {channelID:interaction.channel.id};
        const myticketdata = await Ticket.find(FiltroTicket);
        if (myticketdata == null) await interaction.reply('There are no data available for this channel!');
        else
        {
            const CampiDaAggiornare ={status: "REFUSED"};
            await Ticket.findOneAndUpdate(FiltroTicket, CampiDaAggiornare, {upsert:false});
            let MemberInfo = await interaction.guild.members.fetch(myticketdata[0].memberId);
            interaction.channel.setName(interaction.channel.name + '_REFUSED');

            let MessaggioRifiuto = 'We are sorry! <:frowning2:940309656872558663> You have been refused to join our kingdom, find the reason here below. \n'
            MessaggioRifiuto += '**' + interaction.options.getString('reason') + '** \n';
            MessaggioRifiuto += 'Anyway, feel free to stay as appreciated guest in our server if you want! To enjoy our server, please change nickname indicating your kingdom, your alliance and your Governor Name';
            await interaction.reply({content:MessaggioRifiuto});
        }
    },
};