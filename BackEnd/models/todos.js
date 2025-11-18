const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
    todoTitle: {
        type: String,
        required: true,
    },
    todoCompleted: {
        type: Boolean,
        default: false
    },
    pinTodo: {
        type: Boolean,
        default: false
    },
    email: {                  
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Todo", todosSchema);
