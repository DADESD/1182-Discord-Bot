module.exports =  (client) => {
    client.handleEvents = async (eventsFile, path) => {
        for (const file of eventsFile)
        {
            const event = require('../events/' + file);
            console.log('Gestione evento' + file);

            if (event.once)
            {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else
            {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    };
};