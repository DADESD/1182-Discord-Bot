// const {SlashCommandBuilder} = require('@discordjs/builders');
// const {MessageEmbed, MessageAttachment}= require('discord.js')

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName('info')
//     .setDescription('Descrizione comando ping!')
//     .addSubcommand(subcommand => 
//         subcommand
//             .setName('user')
//             .setDescription('Gets informations of a user mentioned')
//             .addUserOption(option => option.setName("target").setDescription("The user mentioned")))
//     .addSubcommand(subcommand =>
//         subcommand
//             .setName("server")
//             .setDescription("Info about the server")),
//     async execute(interaction) {
//         if (interaction.options.getSubcommand() === "user") {
//             const user = interaction.options.getUser("target");
//             if (user) {
//                 const userEmbed = new MessageEmbed()
//                     .setTitle(user + " Informations")
//                     .setDescription("Info about the user")
//                     .setThumbnail(user.displayAvatarURL())
//                     .setFields(
//                         {name:"Username:", value: user.username},
//                         {name:"ID:", value: user.username},
//                         {name:"Discriminator:", value: user.discriminator},
//                         )
//                     .setTimestamp()
//                     .setColor("GOLD")
//                 // await interaction.reply("Username: " + user.username + ';\n ID: ' +user.id);
//                 await interaction.reply({embeds: [userEmbed]});
//             } else {
//                 await interaction.reply("Username: " + interaction.user.username + ';\n ID: ' + interaction.user.id);
//             }
//         } else if(interaction.options.getSubcommand() === "server") {
//             await interaction.reply("Server name: " + interaction.guild.name + ";\n Total Members: " + interaction.guild.memberCount);
//         } else {
//             await interaction.reply("Not any sub command has been used");
//         }
//     },
// };