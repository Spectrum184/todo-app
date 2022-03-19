import { Status } from "../interfaces/task"
import mongoose from "mongoose"

const subtaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    startedAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: Status,
        default: Status.NOT_STARTED
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
    timestamps: true
})

const Subtasks = mongoose.model("subtasks", subtaskSchema);

export default Subtasks;