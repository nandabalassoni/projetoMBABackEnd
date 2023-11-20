const mongoose = require('../database/connection')

const clientSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  cpf: { type: String, unique: true, require: true },
  telephone: { type: String },
  address: { type: String },
  age: { type: Number, require: true },
  financialInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'FinancialInfo' },
})

const ClientModel = mongoose.model('client', clientSchema)

module.exports = ClientModel
