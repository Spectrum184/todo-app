import Subtasks from '../models/subtaskModel';
import { ISubTask } from '../interfaces/task';

const SubtaskService = {
    createSubtask: async (subtask: ISubTask) =>{
        try {
            const newSubtask =new Subtasks({
                ...subtask,
            })

            await newSubtask.save();
            return newSubtask
        } catch (error) {
            throw error
        }
    },

    updateSubtask: async (id: string, subtask: Partial<ISubTask>)=>{
        try {
            const updateSubTask = await Subtasks.findByIdAndUpdate(
                id,
                {
                    ...subtask,
                },
                { new: true }
            )

            return updateSubTask
        } catch (error) {
            throw error;
        }

    },

    getSubtask:async (id:string) => {

        try {
            const subtask = await Subtasks.findById(id)

            return subtask._doc;
        } catch (error) {
            throw error
        }
        
    },

    deleteSubtask:async (id: string ) => {
        try {
            const subtask = await Subtasks.findByIdAndDelete(id);

            if(!subtask) return false

            return true
        } catch (error) {
            throw error
            
        }
        
    }

}

export default SubtaskService
