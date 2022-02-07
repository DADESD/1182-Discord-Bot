const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
    guildId: String,
    memberId: String,
    governor_ID: String,
    governor_name: String,
    notes: String,
    status: String,
    requestType: String,
    ChannelID: String,
});

function loadModel(modelName, modelSchema) {
    return mongoose.models[modelName] // Check if the model exists
      ? mongoose.model(modelName) // If true, only retrieve it
      : mongoose.model(modelName, modelSchema) // If false, define it
  }

module.exports = () => loadModel('tickets', ticketSchema);

