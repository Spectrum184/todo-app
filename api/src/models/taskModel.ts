import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true
    },
    subtasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subtasks"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
},{
    timestamps: true
})

const Tasks = mongoose.model("tasks", TaskSchema)

export default Tasks;