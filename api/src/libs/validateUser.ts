import { IUser, Role } from "../interfaces/user"
import Joi from "joi"

const validateUsers = {
    validateCreate: (userData: IUser) => {
        const schema = Joi.object().keys({
            username: Joi.string().min(6).max(30).required(),
            password: Joi.string().min(8).required(),
            role: Joi.string().valid(...Object.values(Role)),
            firstName: Joi.string().max(20),
            lastName: Joi.string().max(20),
            email: Joi.string().email(),
            telephoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
        })
            .with("username", "password")
            .with("firstName", "lastName");

        const value = schema.validate(userData);
        return value
    },

    validateLogin: (accountData: Pick<IUser, "username" | "password">)=>{
        const schema = Joi.object().keys({
            username: Joi.string().min(6).max(30).required(),
            password: Joi.string().min(8).required()
        })
        const value = schema.validate(accountData)

        return value;
    },

    validateUpdate: (userData: Partial<IUser>) =>{
        const schema = Joi.object().keys({
            username: Joi.string().min(6).max(30),
            password: Joi.string().min(8),
            role: Joi.string().valid(...Object.values(Role)),
            firstName: Joi.string().max(20),
            lastName: Joi.string().max(20),
            email: Joi.string().email(),
            telephoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/),
        }).with("username", "password")
        const value = schema.validate(userData);
        return value
    }

}
export default validateUsers