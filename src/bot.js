const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
require('dotenv').config();

client.commands = new Collection();
client.buttons = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const buttonFolders = fs.readdirSync("./src/buttons");

(
    async () => {
        for (file of functions)
        {
            require('./functions/' + file)(client);
        }
        client.handleCommands(commandFolders, './src/commands');
        client.handleEvents(eventFiles, './src/events');
        client.handleButtons(buttonFolders, './src/buttons');
        client.login(process.env.token);
        client.dbLogin();
    }
)();