const {SlashCommandBuilder} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../../schemas/ticket')();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket_generate')
    .setDescription('Open a new ticket')
    .addStringOption((option) => option
        .setName('governor-id')
        .setDescription('Please write your governor ID')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('governor-name')
        .setDescription('Please write your in-game name')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('notes')
        .setDescription('Please write here any notes (optionals)')
        .setRequired(false)
        ),

    async execute(interaction, client) {

        if (await ControlliPreliminari(interaction) == false) return

        const {guild, member} = interaction;
        
        let Embed = new MessageEmbed()
            .setAuthor({name: '1182 - Ticket System'})
            .setDescription('Open a ticket for the user ' + interaction.user.username)
            .setColor('RANDOM')

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
                new MessageButton()
                .setCustomId("ticket-gnd-member")
                .setLabel("GnD Member")
                .setStyle("PRIMARY"),
                
                new MessageButton()
                .setCustomId("ticket-ixgk-member")
                .setLabel("IXGK Member")
                .setStyle("PRIMARY"),

                new MessageButton()
                .setCustomId("ticket-migrant")
                .setLabel("Migration Request")
                .setStyle("SECONDARY"),

                new MessageButton()
                .setCustomId("ticket-kvk-ally")
                .setLabel("1182 ally for kvk")
                .setStyle("SUCCESS")
        );

        //Ora gli metto in output i bottoni, primaperò genero già un record per 
        //questo giocatore salvando il governor ID, così dopo devo solo salvarlo
        const FiltroTicket = {guildId:guild.id, memberId:member.id};
        var TicketTrovato = false;
        const ticketdata = await Ticket.find(FiltroTicket);

        if(ticketdata == null || ticketdata.length == 0) {
            console.log('Ticket not found!');
            TicketTrovato = false;
            await Ticket.create({
                guildId: guild.id,
                memberId: member.id,
                governor_ID: interaction.options.getString('governor-id'),
                governor_name: interaction.options.getString('governor-name'),
                notes: interaction.options.getString('notes'),
                status: "LOADED",
                requestType: '',
                ChannelID: 0
                });
        } else {
            TicketTrovato = true;
            console.log('Ticket trovato!');
        }            
        
        if (TicketTrovato === true){
           await interaction.reply({content: 'You already have a ticket open! To do it from zero, please cancel it using the command /cancel_ticket', ephemeral: true});
        } else {
            await interaction.reply({embeds: [Embed], components: [Buttons], ephemeral: true});
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
    if (interaction.channel.id !== process.env.TICKETMANAGEMENT_PAGE_ID) {
        const CanalePermesso = interaction.guild.channels.cache.get(process.env.TICKETMANAGEMENT_PAGE_ID);
        await interaction.reply({content:'this command is allowed only in ' + CanalePermesso.toString() + ' channel!', ephemeral: true});
        return false;
    }

    return true;

}