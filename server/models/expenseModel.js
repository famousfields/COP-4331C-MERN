const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Please enter a type of expense"]
        },
        // number of times expense occurs each month.
        quantity: {
            type: Number,
            required: [true, "Please enter the quantity"],
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

// TODO?: write middleware function to update price on quantity.

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;