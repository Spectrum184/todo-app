import {ITask, Status} from "../interfaces/task";
import Joi from "Joi"

const validateTasks = {
    validateCreate: (taskData: ITask) => {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            deadline: Joi.date().required(),
        })
        .with("title","deadline");
        const value = schema.validate(taskData);
        return value;
    },

    validateUpdate: ( taskData: Partial<ITask> ) => {
        const schema = Joi.object().keys({
            title: Joi.string(),
            deadline: Joi.date(),
        })
        .with("title","deadline");
        const value = schema.validate(taskData);
        return value;
    }
}

export default validateTasks