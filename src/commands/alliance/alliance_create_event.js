const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Eventi = require('../../schemas/eventi')();
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alliance_create_event')
    .setDescription('Create a new alliance event')
    .addSubcommand(subcommand =>
        subcommand
        .setName("gnd")
        .setDescription('Create the event for alliance GnD')
        .addStringOption((option) => option
        .setName('event-name')
        .setDescription('Please write your in-game name')
        .setRequired(true)
    )  
    .addStringOption((option) => option
        .setName('year')    
        .setDescription('Year on which the event will be play')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('month')
        .setDescription('Month on which the event will be play')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('day')
        .setDescription('Day (express in number) on when the event will take place')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('hour')
        .setDescription('Hour on which the event will be play (from 0 to 24)')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('minute')
        .setDescription('Minute in which the event will start (from 0 to 60)')
        .setRequired(true)
    ))
    .addSubcommand(subcommand =>
        subcommand
        .setName("ixgk")
        .setDescription('Create the event for alliance IXGK')
        .addStringOption((option) => option
        .setName('event-name')
        .setDescription('Please write your in-game name')
        .setRequired(true)
    )  
    .addStringOption((option) => option
        .setName('year')    
        .setDescription('Year on which the event will be play')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('month')
        .setDescription('Month on which the event will be play')
        .setRequired(true)
        )
    .addStringOption((option) => option
        .setName('day')
        .setDescription('Day (express in number) on when the event will take place')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('hour')
        .setDescription('Hour on which the event will be play (from 0 to 24)')
        .setRequired(true)
    )
    .addStringOption((option) => option
        .setName('minute')
        .setDescription('Minute in which the event will start (from 0 to 60)')
        .setRequired(true)
    )),

    async execute(interaction, client) {
        const NomeAlleanza = interaction.options.getSubcommand();
        const NomeEvento = interaction.options.getString('event-name');
        const AnnoEvento = interaction.options.getString('year');
        const MeseEvento = interaction.options.getString('month') - 1; //In js i mesi vanno da 0 a 11
        const GiornoEvento = interaction.options.getString('day');
        const OraEvento = interaction.options.getString('hour');
        const MinutiEvento = interaction.options.getString('minute');
        // const passed = ControlliPreliminari(interaction);
        // if (passed == false) return;
        // var Alleanza = '';
        // var Categoria = interaction.channel.parentId;
        // if (Categoria == process.env.ID_CATEGORIA_GND) Alleanza = 'GND'
        // if (Categoria == process.env.ID_CATEGORIA_IXGK) Alleanza = 'IXGK'
        console.log('Cerco evento con nome ' + NomeEvento + ' ed alleanza ' + NomeAlleanza);
        const FiltroEvento = {Alleanza: NomeAlleanza, NomeEvento:NomeEvento};
        var EventoTrovato = false;
        const DatiEvento = await Eventi.findOne(FiltroEvento);

        const data = new Date();
        const DataEvento = new Date(data.getFullYear(), MeseEvento, GiornoEvento, OraEvento, MinutiEvento);
        if(DatiEvento == null || DatiEvento.length == 0) {
            console.log('Evento non trovato!');
            EventoTrovato = false;
            await Eventi.create({
                Alleanza: NomeAlleanza.toUpperCase(),
                NomeEvento: NomeEvento,
                DataUTC: new Date(data.getFullYear(), MeseEvento, GiornoEvento, OraEvento, MinutiEvento).toString(),
                });
                await interaction.reply({content: 'Event created successfully!!', ephemeral: true});
        } else {
            EventoTrovato = true;
            console.log('Evento trovato!');
            const DataStabilitaEvento = new Date(DatiEvento.DataUTC);
            const DataSchedulazioneEvento = DataStabilitaEvento.getDate() + '/' + (DataStabilitaEvento.getMonth()+1).toString() + '/' + DataStabilitaEvento.getFullYear() + ' ' + DataStabilitaEvento.getHours() + ':' + DataStabilitaEvento.getMinutes();
            await interaction.reply({content: 'An event with this name has already been added!!It is scheduled at this date and time: **' + DataSchedulazioneEvento + '**', ephemeral: true});
        }
    },
};

// async function ControlliPreliminari(interaction) {
//         //Controllo di essere sulla categoria corretta
//         if (interaction.channel.parentId !== process.env.ID_CATEGORIA_GND && interaction.channel.parentId !== process.env.ID_CATEGORIA_IXGK) {
//             await interaction.reply({content:'This command is allowed only in GND / IXGK categories!', ephemeral: true});
//             return false;
//         }
    
//         // //Controllo di mettere il comando SOLO nella pagina relativa ai ticket!!!
//         // if (interaction.channel.id !== process.env.TICKETMANAGEMENT_PAGE_ID) {
//         //     const CanalePermesso = interaction.guild.channels.cache.get(process.env.TICKETMANAGEMENT_PAGE_ID);
//         //     await interaction.reply({content:'this command is allowed only in ' + CanalePermesso.toString() + ' channel!', ephemeral: true});
//         //     return false;
//         // }
//         if (interaction.channel.parentId !== process.env.ID_CATEGORIA_GND && interaction.channel.parentId !== process.env.ID_CATEGORIA_IXGK) {
//             await interaction.reply({content:'This command is allowed only in GND / IXGK categories!', ephemeral: true});
//             return false;
//         }

//         const MeseEvento = interaction.options.getString('month');
//         if (MeseEvento <1 && MeseEvento >12) {
//             await interaction.reply({content:'Month parameter allow values only between 1 and 12!', ephemeral: true});
//             return false;
//         }

//         const MeseEvento = interaction.options.getString('month');
//         if (MeseEvento <1 && MeseEvento >12) {
//             await interaction.reply({content:'Month parameter allow values only between 1 and 12!', ephemeral: true});
//             return false;
//         }
// }