const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear all the messages of a chat'),

    async execute(interaction, client) {
        if (ControllaCanaleMessaggiEliminabili(interaction) === true) {
            const messaggiselezionati = interaction.channel.fetch();
            await interaction.channel.bulkDelete(100, true);
            await interaction.reply({content: 'Messages deleted correctly!', ephemeral: true});
        } else await interaction.reply({content: 'Is not possible to delete messages for this channel!', ephemeral: true});
    },
};

function ControllaCanaleMessaggiEliminabili(interaction) {
    if (interaction.member.id = process.env.OWNER_ID) return true
    if (interaction.channel.name === 'ticket-management') return false
    return true
}