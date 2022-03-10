import { Response, Request } from 'express'
import { ISubTask } from '../interfaces/task'
import validateSubtasks from '../libs/validateSubtask'
import SubtaskService  from '../services/subtaskService'

const SubtaskController = {
    createSubtask:async (req: Request, res: Response) => {
        try {
            const subtaskData:ISubTask = req.body;

            const validateSubtask = validateSubtasks.validateCreate(subtaskData);

            if(validateSubtask.error) return res.status(400).json(
                validateSubtask.error.details[0]
            )
            const subtask = await SubtaskService.createSubtask(subtaskData)
            return res.status(200).json({
                validateSubtask,
                subtask
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({error})
        }
    },

    updateSubtask:async (req:Request, res: Response) => {
        try {
            const subtaskData: Partial<ISubTask> = req.body;

            const validateSubtask = validateSubtasks.validateUpdate(subtaskData)

            if(validateSubtask.error) return res.status(400).json(
                validateSubtask.error.details[0]
            )

            const subtask = await SubtaskService.updateSubtask(req.params.id, subtaskData)
            return res.status(200).json({
                validateSubtask,
                subtask
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({error})
            
        }
    },

    deleteSubtask:async (req:Request, res: Response) => {
        try {
            const id = req.params.id;

            const subtaskData = await SubtaskService.deleteSubtask(id);

            if(!subtaskData) return res.status(400).json({msg:'not found'});

            return res.status(200).json({deleted:subtaskData})
        } catch (error) {
            console.error(error);
            return res.status(500).json(error)
        }
        
    },
    getSubtask:async (req:Request, res: Response) => {
        
        try {
            const {id} = req.params;
            if(!id) return res.status(400).json({msg:"not found"})

            const subtaskData = await SubtaskService.getSubtask(id);

            return res.status(200).json({
                subtaskData
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)
        }
    }
}

export default SubtaskController