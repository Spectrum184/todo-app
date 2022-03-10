import {ISubTask, Status} from "../interfaces/task";
import Joi from "Joi"

const validateSubtasks = {
    validateCreate: (subtask :ISubTask ) =>{
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            startedAt: Joi.date().required(),
            completedAt: Joi.date().required(),
            status: Joi.string().valid(...Object.values(Status))
        })
        
        const value = schema.validate(subtask);
        return value;
    },

    validateUpdate: (subtask: Partial<ISubTask> ) =>{
        const schema = Joi.object().keys({
            name: Joi.string(),
            startedAt: Joi.date(),
            completedAt: Joi.date(),
            status: Joi.string().valid(...Object.values(Status))
        })
        
        const value = schema.validate(subtask);
        return value;
    }
}

export default validateSubtasks