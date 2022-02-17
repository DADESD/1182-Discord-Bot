const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const fs = require('fs');

//ID del BOT
const clientId = '934817846251384914';

module.exports =  (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders)
        {
            const commandFiles = fs.readdirSync(path + '/' + folder).filter(file => file.endsWith('.js'));
                for (const file of commandFiles)
                {
                    console.log('Gestione Comando ' + file);
                    const command = require('../commands/' + folder + '/' + file);
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                }
        }

        const rest = new REST(
            {
                version: '9'
            }).setToken(process.env.token);

        (
            async () => 
            {
                try {
                    console.log('Started refreshing application (/) commands');
                    await rest.put(
                        Routes.applicationGuildCommands(clientId, process.env.GUILD_ID), 
                        {
                            body: client.commandArray
                        },
                    );
                    console.log('Succesfully reloaded application (/) commands');
                } catch (error)
                {
                    console.log(error)
                };
            }
        )();
    };
};