const {momentjs} = require('moment');
const { REST } = require("@discordjs/rest");
const {Route} = require('discord-api-types/v9');
const { data } = require("../commands/ticket-commands/ticket_accept");

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
            CheckEventi();
        }, 5000);
    },
};

async function CheckEventi() {
    console.log('Hello World');
    setTimeout(CheckEventi,5000);
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
        NomeComando === 'ticket_accept' || NomeComando === 'ticket_refuse') {                
            await client.guilds.cache.get(process.env.GUILD_ID)?.commands.permissions.add({
                command: slashCommand.id,
                permissions: [adminPermission, everyonePermission]
            });
        }
    });

};