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
    .setName('ticket_generate')
    .setDescription('Open a new ticket')
    .addStringOption((option) => option
        .setName('governor-id')
        .setDescription('Please write your governor ID')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('governor-name')
        .setDescription('Please write your in-game name (or your personal name, as you prefer')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('notes')
        .setDescription('Please write here any notes (optionals)')
        .setRequired(false)
        ),

    async execute(interaction, client) {
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
        const ticketdata = await Ticket.findOne(FiltroTicket, 'guildId memberId ');
        console.log(ticketdata);
        if(ticketdata == null) {
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
        
         console.log(TicketTrovato.toString());
        if (TicketTrovato === true){
           await interaction.reply({content: 'You already have a ticket open! To do it from zero, please cancel it using the command /cancel_ticket', ephemeral: true});
        } else {
            await interaction.reply({embeds: [Embed], components: [Buttons], ephemeral: true});
        }
        
    },
};