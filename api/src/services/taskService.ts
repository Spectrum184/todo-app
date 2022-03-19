import Tasks from "../models/taskModel";
import { ITask } from "../interfaces/task";

const TaskServices = {
    createTask: async (task: ITask) => {
        try {
            const newTask = new Tasks({
                ...task
            })

            await newTask.save();
            return newTask;
        } catch (error) {
            throw error
        }
    },

    updateTask: async (id: string, task: Partial<ITask>) => {
        try {
            const updateTask = await Tasks.findByIdAndUpdate(
                id, {
                ...task,
            },
                { new: true }
            )

            return updateTask;
        } catch (error) {
            throw error
        }

    },

    getTask: async (id: string) => {
        try {
            const task = await Tasks.findById(id);

            return task._doc;
        } catch (error) {
            throw error;
        }

    },

    deleteTask: async (id:string) => {
        try {
            const task = await Tasks.findByIdAndDelete(id)

            if(!task) return false;

            return true
        } catch (error) {
            throw error
        }
    }

}

export default TaskServices