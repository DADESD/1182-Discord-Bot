const {SlashCommandBuilder, Embed} = require('@discordjs/builders');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help_commands')
    .setDescription('Show all the commands categories'),
    
    async execute(interaction, client) {
        let Embed = new MessageEmbed()
        .setDescription('List of the categories commands offered by 1182 Official Channel Super Bot <:sunglasses:940307265137827882>')
        .setColor('RANDOM')
        .setFields(
            {name: '/help_commands_ticket', value: 'Show the list of the commands related to the tickets'}
        );

        await interaction.reply({embeds: [Embed], ephemeral: true});
    },
};