const { PermissionOverwriteManager, MessageEmbed } = require("discord.js");
const Ticket = require('../schemas/ticket')();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isCommand()){
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try
            {
                if (command.permissions && command.permissions.length > 0) {
                    if (!interaction.member.permissions.has(command.permissions)) 
                    return await interaction.reply("the user don't have this kind of permission");
                }

                await command.execute(interaction, client);
                
            } catch (error)
            {
                console.log(error);
                await interaction.editReply(
                    {
                        content: 'Error while executing the interaction',
                        ephemeral: true
                    }
                );
            }
        } else if (interaction.isSelectMenu()) {            
        } else if (interaction.isButton()){
            const {guild,member, customId} = interaction;
            const button = client.buttons.get(customId);
            if(!button) return await interaction.reply({content: 'There is no code write for the button.'});
            //Se l'ID appartiene
            if (customId.startsWith('ticket-') && customId !== 'ticket-show-governor-id') createTicket(interaction, guild ,member ,customId.split('ticket-')[1]);
            try
            {
                await button.execute(interaction, client);
            } catch (error)
            {
                console.log(error);
                await interaction.reply(
                    {
                        content: 'Error while executing the button',
                        ephimeral: true
                    }
                );
            }
        }
    },
};

function createTicket(interaction, guild, member, comando) {
    
    const NewChannelID = Math.floor(Math.random() * 90000) + 10000;
    guild.channels.create(comando + '_' + NewChannelID, {
        type: "GUILD_TEXT",
        parent: process.env.PARENTID,
        PermissionOverwrites: [
            {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
                id: process.env.KINGDOM_LEADEHIP_ID,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
            id: process.env.EVERYONEID,
            deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },              
        ]}).then(async (channel) => {
            const FiltroTicket = {guildId:guild.id, memberId:member.id};
            const CampiDaAggiornare ={status: "IN_CHARGE",
                                      requestType: comando,
                                      ChannelID: channel.id};
            const myticketdata = await Ticket.findOneAndUpdate(FiltroTicket, CampiDaAggiornare, {upsert: false});
            
            let Embed = new MessageEmbed()
            .setAuthor({name: guild.name + ' | ' + 'Ticket ID: ' + NewChannelID})
            .setDescription('Please wait patiently for a response from Kingdom Leadership, they will contact you as soon as possible in the channel \n' + channel.toString())
            .setThumbnail(interaction.member.user.displayAvatarURL());

            interaction.reply({embeds:[Embed], ephemeral: true});

            });

}