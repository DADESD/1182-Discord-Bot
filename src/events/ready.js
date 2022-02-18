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

    const DatiEvento = await Eventi.find();
    if(DatiEvento.length > 0) {
        DatiEvento.forEach( async (Evento) => {
            var DataAttualeUTC =  new Date();
            const DataEvento = new Date(Evento.DataUTC).toUTCString();
            const seconds = moment(DataEvento).diff(DataAttualeUTC, "second");
            console.log(seconds);
            if (seconds < 3600 && seconds > 0) {
                //Devo avvisare dell'evento un'ora e mezz'ora prima, poi salvare il fatto che l'ho già fatto o va in loop
                //Imposto il canale dove mandare il messaggio                
                const canale = client.channels.cache.get(process.env.ID_CANALE_ANNOUNCEMENT);
                var MessaggioRemind = '';
                if (Evento.AggiornaUnOra == 0) {
                    MessaggioRemind = 'ATTENTION! the event **' + Evento.NomeEvento + '** of the alliance ' + Evento.Alleanza + ' will start in 1 hour! (**' + DataEvento.replace('GMT', 'UTC') + '**)';
                    var FiltroEvento = {Alleanza: Evento.Alleanza, NomeEvento: Evento.NomeEvento};
                    const CampiDaAggiornare = {AggiornaUnOra: 1}
                    await Eventi.updateOne(FiltroEvento, CampiDaAggiornare);
                    canale.send('<@&' + process.env.ID_ROLE_KINGDOM_MEMBER + '> ' + MessaggioRemind);
                } else if (Evento.AggiornaMezzora == 0 && seconds < 1800)
                {
                    MessaggioRemind = 'ATTENTION! the event **' + Evento.NomeEvento + '** of the alliance ' + Evento.Alleanza + ' will start in 30 minutes! (**' + DataEvento.replace('GMT', 'UTC') + '**)';
                    var FiltroEvento = {Alleanza: Evento.Alleanza, NomeEvento: Evento.NomeEvento};
                    const CampiDaAggiornare = {AggiornaMezzora: 1}
                    await Eventi.updateOne(FiltroEvento, CampiDaAggiornare);
                    canale.send('<@&' + process.env.ID_ROLE_KINGDOM_MEMBER + '> ' + MessaggioRemind);
                }                
            } else if (seconds < 0) {
                    var FiltroEvento = {Alleanza: Evento.Alleanza, NomeEvento: Evento.NomeEvento};
                    await Eventi.deleteOne(FiltroEvento);
                    console.log('Evento ' + Evento.NomeEvento + ' eliminato!');
                }
        });
    }

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
        NomeComando === 'ticket_accept' || NomeComando === 'ticket_refuse' || NomeComando === 'ticket_close' 
        || NomeComando === 'alliance_create_event') {                
            await client.guilds.cache.get(process.env.GUILD_ID)?.commands.permissions.add({
                command: slashCommand.id,
                permissions: [adminPermission, everyonePermission]
            });
        }
    });

};