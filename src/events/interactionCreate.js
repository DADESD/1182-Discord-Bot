const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Ticket = require('../schemas/ticket')();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log('Interazione scatenata!');
        if (interaction.isCommand()){
            console.log('Sono entrato nel comando!');
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
            if (customId.startsWith('ticket-') && customId !== 'ticket-show-governor-id') 
            {createTicket(interaction, guild ,member , customId.split('ticket-')[1], client);}
            
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

function createTicket(interaction, guild, member, comando, client) {
    
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
            {
                id: process.env.ID_BOT,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "MANAGE_ROLES"]
            }        
        ]}).then(async (channel) => {
            const FiltroTicket = {guildId:guild.id, memberId:member.id};
            const CampiDaAggiornare ={status: "IN_CHARGE",
                                      requestType: comando,
                                      ChannelID: channel.id};
            const myticketdata = await Ticket.findOneAndUpdate(FiltroTicket, CampiDaAggiornare);

            var Messaggio = '**' + guild.name + ' | ' + 'Ticket ID: ' + NewChannelID + '**\n';
            Messaggio += 'Dear **' + myticketdata.governor_name + '**, your ticket has been generated! \n';
            Messaggio += 'Please, be aware that Kingdom Leadership will take in charge your ticket ';
            Messaggio += 'as soon as possible and will write you in your channel, which you can reach by ';
            Messaggio += 'clicking on this link: ' + channel.toString() + '\n';
            Messaggio += 'There, you will also find all the informations regarding your application!';

            interaction.reply({content: Messaggio, ephemeral: true});

            let UserInfo = await client.users.fetch(myticketdata.memberId);
            let userEmbed = new MessageEmbed()
                .setAuthor({name: guild.name + ' | ' + 'Ticket ID: ' + NewChannelID})
                .setTitle(UserInfo.username + " Informations")
                .setThumbnail(UserInfo.displayAvatarURL())
                .setFields(
                    {name:"Rok Governor ID: ", value: myticketdata.governor_ID},
                    {name:"RoK Governor Name / Player Name: ", value: myticketdata.governor_name},
                    {name:"Request Type: ", value: comando},
                    {name:"Status: ", value: "IN_CHARGE"},
                    {name:"Notes: ", value: myticketdata.notes === null ? 'Not any note' : myticketdata.notes},
                    )
                .setColor("GOLD");

                const Buttons = new MessageActionRow()
                .addComponents(
                        new MessageButton()
                        .setCustomId("ticket-show-governor-id")
                        .setLabel("Show GOVERNOR ID Only")
                        .setStyle("SUCCESS"));

                channel.send({embeds: [userEmbed], components: [Buttons]});

            });
}