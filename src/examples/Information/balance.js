// const {SlashCommandBuilder} = require('@discordjs/builders');
// const { mongoose } = require('mongoose');
// const Balance = require('../../schemas/balance');

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('balance')
//     .setDescription('Return info based on a user balance!')
//     .addSubcommand(subcommand =>
//         subcommand
//             .setName("user")
//             .setDescription('Gets informations of a user mentioned')
//             .addUserOption(option => option.setName("target").setDescription("The user mentioned"))),
//     async execute(interaction, client) {
//         //Si può usare questarigadi codice anzichè le due commentate sotto
//         let user = (interaction.options.getUser("target") ? interaction.options.getUser("target") : interaction.user);
//         // let user = interaction.options.getUser("target");
//         // if (!user) user = interaction.user;
//         const balanceProfile = await client.createBalance(interaction.member);
//         await interaction.reply({content: 'Member' + interaction.user.tag + ' has ' + balanceProfile.amount + '.' });
//     },
// };