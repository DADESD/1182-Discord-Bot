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

        if (interaction.channel.name.toUpperCase().endsWith('ACCEPTED') || interaction.channel.name.toUpperCase().endsWith('REFUSED'))
        return await interaction.reply({content: "Ticket has already been accepted / refused, you can't modify it!", ephemeral: true});

        //Il ticket non era ancora stato gestito, posso continuare
        const FiltroTicket = {channelID:interaction.channel.id};
        const myticketdata = await Ticket.find(FiltroTicket);
        if (myticketdata == null) await interaction.reply('There are no data available for this channel!');
        else
        {
            const CampiDaAggiornare ={status: "ACCEPTED"};
            await Ticket.findOneAndUpdate(FiltroTicket, CampiDaAggiornare, {upsert:false});
            let MemberInfo = await interaction.guild.members.fetch(myticketdata[0].memberId);
            console.log(MemberInfo);
            console.log(myticketdata[0].requestType.toString());
            switch (myticketdata[0].requestType.toString().toLowerCase())
            {
                case 'gnd-member':
                    {
                        console.log('Accettato come Membro di GnD');
                        MemberInfo.roles.add(process.env.ID_ROLE_GND_MEMBER);
                        break;
                    }
                case 'ixgk-member':
                    {
                        console.log('Accettato come Membro di IXGK');
                        MemberInfo.roles.add(process.env.ID_ROLE_IXGK_MEMBER);
                        break;
                    }                    
                case 'migrant':
                    {
                        console.log('Accettato come migrant');
                        MemberInfo.roles.add(process.env.ID_ROLE_GND_MEMBER);
                        break;
                    }
                case 'kvk-ally':
                    {
                        console.log('Accettato come kvk-ally');
                        MemberInfo.roles.add(process.env.ID_ROLE_KVK_ALLY);
                        break;
                    }
            }

            interaction.channel.setName(interaction.channel.name + '_ACCEPTED');

            await interaction.reply({content:'Congratulations! You have been accepted in 1182 Official Server, enjoy your experience here!'});
        }
    },
};