const mongoose = require('mongoose');
const eventiSchema = new mongoose.Schema({
    Alleanza: String,
    NomeEvento: String,
    DataUTC: String,
    AggiornaUnOra: Number,
    AggiornaMezzora: Number,
});

function loadModel(modelName, modelSchema) {
    return mongoose.models[modelName] // Check if the model exists
      ? mongoose.model(modelName) // If true, only retrieve it
      : mongoose.model(modelName, modelSchema) // If false, define it
  }

module.exports = () => loadModel('eventi', eventiSchema);

