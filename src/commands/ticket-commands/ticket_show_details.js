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

        var passed = await ControlliPreliminari(interaction);
        if (passed == false) return;

        const FiltroTicket = {ChannelID:interaction.channel.id};
        const myticketdata = await Ticket.findOne(FiltroTicket);
        if (myticketdata == null || myticketdata.length == 0) 
        return await interaction.reply({content:'There are no data available for this channel!', ephemeral:true});
        else
        {
            let UserInfo = await client.users.fetch(myticketdata.memberId);
            const userEmbed = new MessageEmbed()
                .setTitle(UserInfo.username + " Informations")
                .setThumbnail( UserInfo.displayAvatarURL())
                .setFields(
                    {name:"Rok Governor ID: ", value: myticketdata.governor_ID},
                    {name:"RoK Governor Name / Player Name: ", value: myticketdata.governor_name},
                    {name:"Request Type: ", value: myticketdata.requestType},
                    {name:"Status: ", value: myticketdata.status},
                    {name:"Notes: ", value: myticketdata.notes === null ? 'Not any note' : myticketdata.notes},
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

async function ControlliPreliminari(interaction) {

    //Controllo di essere sulla categoria corretta
    if (interaction.channel.parentId !== process.env.ID_CATEGORIA_WELCOME) {
        console.log('Categoria errata ticket_show_details');
        await interaction.reply({content:'This command is allowed only in WELCOME category!', ephemeral: true});
        return false;
    }
    //Controllo di mettere il comando SOLO nella pagina relativa ai ticket!!!
    if (interaction.channel.id === process.env.WELCOME_PAGE_ID || interaction.channel.id === process.env.TICKETMANAGEMENT_PAGE_ID) {
        console.log('Canale errato ticket_show_details');
        await interaction.reply({content:'This command is allowed only in specific ticket channels (opened tickets)!', ephemeral: true});
        return false;
    }

    return true;

}