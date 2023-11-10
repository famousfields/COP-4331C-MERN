const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expense: String,
    price: Int32
});

module.exports = mongoose.model('userExpense',expenseSchema);