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
        console.log('Controlli passati');
        //Il ticket non era ancora stato gestito, posso continuare
        const FiltroTicket = {ChannelID:interaction.channel.id};
        const myticketdata = await Ticket.find(FiltroTicket);
        if (myticketdata == null) return await interaction.reply({content:'There are no data available for this channel!', ephemeral:true});
        else
        {
            console.log('Controlli passati PT 2');
            const CampiDaAggiornare ={status: "ACCEPTED"};
            await Ticket.updateOne(FiltroTicket, CampiDaAggiornare);
            let MemberInfo = await interaction.guild.members.fetch(myticketdata[0].memberId);
            switch (myticketdata[0].requestType.toString().toLowerCase())
            {
                case 'gnd-member':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_GND_MEMBER);
                        break;
                    }
                case 'ixgk-member':
                    {
                        console.log('Controlli passati PT 3');
                        MemberInfo.roles.add(process.env.ID_ROLE_IXGK_MEMBER);
                        console.log('Controlli passati PT 4');
                        break;
                    }                    
                case 'migrant':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_GND_MEMBER);
                        break;
                    }
                case 'kvk-ally':
                    {
                        MemberInfo.roles.add(process.env.ID_ROLE_KVK_ALLY);
                        break;
                    }
            }

            console.log(interaction.channel.id);
            await interaction.channel.setName(interaction.channel.name + '_ACCEPTED');
            console.log('Nome canale cambiato');
            await interaction.reply({content:'Congratulations! You have been accepted in 1182 Official Server, enjoy your experience here!'});
        }
    },
}

async function ControlliPreliminari(interaction) {

    //Controllo di essere sulla categoria corretta
    if (interaction.channel.parentId !== process.env.ID_CATEGORIA_WELCOME) {
        console.log('Categoria errata ticket_accept');
        await interaction.reply({content:'This command is allowed only in WELCOME category!', ephemeral: true});
        return false;
    }
    //Controllo di mettere il comando SOLO nella pagina relativa ai ticket!!!
    if (interaction.channel.id === process.env.WELCOME_PAGE_ID || interaction.channel.id === process.env.TICKETMANAGEMENT_PAGE_ID) {
        console.log('Canale errato ticket_accept');
        await interaction.reply({content:'This command is allowed only in specific ticket channels (opened tickets)!', ephemeral: true});
        return false;
    }

    //Controllo se il ticket era già stato rifiutato / accettato
    if (interaction.channel.name.toUpperCase().endsWith('ACCEPTED') || interaction.channel.name.toUpperCase().endsWith('REFUSED')) {
        await interaction.reply({content: "Ticket has already been accepted / refused, you can't modify it!", ephemeral: true});
        return false;
    }
            
    return true;

}