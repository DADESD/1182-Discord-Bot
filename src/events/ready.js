const {momentjs} = require('moment');
const { REST } = require("@discordjs/rest");
const {Route} = require('discord-api-types/v9');
const { data } = require("../commands/ticket-commands/ticket_accept");
const Eventi = require('../schemas/eventi')();
const moment = require("moment");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Project is ready!');

        client.user.setPresence({activities: [{
            name: '1182 Best Kingdom Ever',
            type: 'PLAYING'}],
            url: 'https://www.youtube.com/watch?v=0z-YzMahrj4&list=PLv0io0WjFNn_4ryS0QmYbph3GWdHvXLeu&index=11',
            status: 'dnd' });

        GestionePermessiComandi(client);
        setTimeout(() => {
            CheckEventi(client);
        }, 5000);
    },
};

async function CheckEventi(client) {

    // console.log('Entro nel check degli eventi!');
    // const FiltroEvento = {Alleanza: 'gnd'};
    // var EventoTrovato = false;
    // const DatiEvento = await Eventi.find(FiltroEvento);
    // if(DatiEvento.length > 0) {
    //     DatiEvento.forEach( Evento => {
    //         console.log(Evento.NomeEvento);
    //     });
    //     console.log('Evento trovato!'); 
    //     const data = new Date();
    //     const seconds = moment(DatiEvento[0].DataUTC).diff(moment(data), "second");
    //     if (seconds < 3600) {
    //         //Devo avvisare dell'evento un'ora prima, poi salvare il fatto che l'ho già fatto o va in loop
    //         //Imposto il canale dove mandare il messaggio
    //         const canale = client.channels.cache.get(process.env.ID_CANALE_ANNOUNCEMENT);
    //         console.log(canale);
    //         canale.send('@Gnd Member attention! the event ' + Evento.NomeEvento + ' will start at ' + '');
    //     }
    // }

    setTimeout(function () {
        CheckEventi(client)},10000);
}

async function GestionePermessiComandi(client) {

    const everyonePermission =  {
        id: process.env.EVERYONEID,
        type: 'ROLE',
        permission: false,
    };
    const adminPermission =  {
        id: process.env.KINGDOM_LEADERSHIP_ID,
        type: 'ROLE',
        permission: true,
    };
    
    const commandsList = await client.guilds.cache.get(process.env.GUILD_ID)?.commands.fetch();
    commandsList.forEach(async (slashCommand) => {
        const NomeComando = slashCommand.name.toLowerCase();
        if (NomeComando === 'ticket_show_details' || NomeComando === 'clear' || 
        NomeComando === 'ticket_accept' || NomeComando === 'ticket_refuse' || NomeComando === 'alliance_create_event') {                
            await client.guilds.cache.get(process.env.GUILD_ID)?.commands.permissions.add({
                command: slashCommand.id,
                permissions: [adminPermission, everyonePermission]
            });
        }
    });

};