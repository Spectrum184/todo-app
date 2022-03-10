import { Response, Request } from 'express';
import { ITask } from '../interfaces/task';
import validateTasks from '../libs/validateTask';
import TaskServices from '../services/taskService';

const TaskController = {
    createTask:async (req:Request, res: Response) => {
        try {
            const taskData: ITask = req.body;

            const validateTask = validateTasks.validateCreate(taskData);

            if (validateTask.error) return res.status(400).json(
                validateTask.error.details[0]
            )
            const task = await TaskServices.createTask(taskData);
            return res.status(200).json({
                validateTask,
                task
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({error})
            
        }
        
    },

    updateTask:async (req:Request, res: Response) => {
        try {
            const taskData: Partial<ITask> = req.body;

            const validateTask = validateTasks.validateUpdate(taskData);

            if (validateTask.error) return res.status(400).json(
                validateTask.error.details[0]
            )
            const task = await TaskServices.updateTask(req.params.id, taskData);
            return res.status(200).json({
                validateTask,
                task
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({error})
            
        }
        
    },

    deleteTask:async (req:Request, res: Response) => {
        try {
            const id = req.params.id;

            const taskData = await TaskServices.deleteTask(id);

            if(!taskData) return res.status(400).json({msg:'not found'});

            return res.status(200).json({deleted:taskData})

        } catch (error) {
            console.error(error);
            return res.status(500).json(error)
        }
        
    },

    getTask:async (req:Request, res: Response) => {
        try {
            const id = req.params.id;

            if(!id) return res.status(400).json({msg:"not found"})

            const taskData = await TaskServices.getTask(id);

            return res.status(200).json({
                taskData
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
    }

}
export default TaskController