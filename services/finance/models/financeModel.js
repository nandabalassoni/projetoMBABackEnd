const mongoose = require('../database/connection')

const financeSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  bankName: { type: String, required: true },
  accountType: { type: String, required: true },
  cardholderName: { type: String, required: true },
  cardLimit: { type: Number, required: true },
})

const FinanceModel = mongoose.model('finance', financeSchema)

module.exports = FinanceModel
