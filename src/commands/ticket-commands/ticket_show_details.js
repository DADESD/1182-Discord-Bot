const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_show_details')
    .setDescription('Show the info about the player of the ticket'),
    
    async execute(interaction, client) {

        const FiltroTicket = {channelID:interaction.channel.id};
        const myticketdata = await Ticket.find(FiltroTicket);
        if (myticketdata[0] == null) await interaction.reply('There are no data available for this channel!');
        else
        {
            let UserInfo = await client.users.fetch(myticketdata[0].memberId);
            const userEmbed = new MessageEmbed()
                .setTitle(UserInfo.username + " Informations")
                .setThumbnail( UserInfo.displayAvatarURL())
                .setFields(
                    {name:"Rok Governor ID: ", value: myticketdata[0].governor_ID},
                    {name:"RoK Governor Name / Player Name: ", value: myticketdata[0].governor_name},
                    {name:"Request Type: ", value: myticketdata[0].requestType},
                    {name:"Status: ", value: myticketdata[0].status},
                    {name:"Notes: ", value: myticketdata[0].notes === null ? 'Not any note' : myticketdata[0].notes},
                    )
                .setColor("GOLD");

                const Buttons = new MessageActionRow()
                .addComponents(
                        new MessageButton()
                        .setCustomId("ticket-show-governor-id")
                        .setLabel("Show GOVERNOR ID Only")
                        .setStyle("PRIMARY"));

            await interaction.reply({embeds: [userEmbed], components: [Buttons], ephemeral: true});
        }
    },
};