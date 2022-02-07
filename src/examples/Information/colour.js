// const {SlashCommandBuilder} = require('@discordjs/builders');
// const {MessageActionRow, MessageSelectMenu}= require('discord.js')

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('colour-select')
//     .setDescription('Ask your favorite colour'),
//     async execute(interaction, client) {
//         const row = new MessageActionRow()
//             .addComponents(
//                 new MessageSelectMenu()
//                 .setCustomId("colour-select")
//                 .setPlaceholder("Nothing is selected")
//                 .setMinValues(1)
//                 .setMaxValues(2)
//                 .addOptions([
//                     {
//                         label: "red",
//                         description: "Your favorite colour is red",
//                         value: "red"
//                     },
//                     {
//                         label: "blue",
//                         description: "Your favorite colour is blue",
//                         value: "blue"
//                     },
//                     {
//                         label: "green",
//                         description: "Your favorite colour is green",
//                         value: "green"
//                     },
//                 ])
//             )

//             await interaction.reply({
//                 content: "What is your fav color?",
//                 components: [row] 
//             });
//     },
// };