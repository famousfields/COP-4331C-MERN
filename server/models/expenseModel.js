const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Please enter a type of expense"]
        },
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
)

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;