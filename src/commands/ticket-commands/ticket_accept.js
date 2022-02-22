const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_accept')
    .setDescription('Use this command to accept a ticket in the relative channel!'),
    
    async execute(interaction, client) {

        const {guild} = interaction
        var passed = await ControlliPreliminari(interaction);
        if (passed == false) return;
        //Il ticket non era ancora stato gestito, posso continuare
        const FiltroTicket = {ChannelID:interaction.channel.id};
        const myticketdata = await Ticket.findOne(FiltroTicket);
        if (myticketdata == null) 
        await interaction.reply({content:'There are no data available for this channel!', ephemeral:true});
        else
        {
            let MemberInfo = await interaction.guild.members.fetch(myticketdata.memberId);
            switch (myticketdata.requestType.toString().toLowerCase())
            {
                case 'kingdom-member':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_KINGDOM_MEMBER);
                        break;
                    }                  
                case 'migrant':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_KINGDOM_MEMBER);
                        break;
                    }
                case 'kvk-ally':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_KVK_ALLY);
                        break;
                    }
            }
            
            await interaction.reply({content:'Closing Ticket...'});
            if (myticketdata.ChannelID != undefined && myticketdata.ChannelID != null) {
                if (interaction.guild.channels.cache.get(myticketdata.ChannelID)) {
                    interaction.guild.channels.cache.get(myticketdata.ChannelID).delete();
                }
            }
            const MessaggioPrivato = 'Congratulations! You have been accepted in 1182 Official Server, enjoy your experience here!';
            interaction.channel.guild.members.cache.get(myticketdata.memberId).send(MessaggioPrivato);
            await Ticket.deleteOne(FiltroTicket);
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