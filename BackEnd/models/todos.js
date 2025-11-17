const mongoose = require('mongoose');
const todosSchema = mongoose.Schema({
    todoTitle:{
        type : String,
        required : true,
    },
    todoCompleted : {
        type : Boolean
    },
    pinTodo : {
        type : Boolean
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Todo",todosSchema);