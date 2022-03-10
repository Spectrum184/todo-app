import { verify } from 'argon2';
import { Response, Request } from 'express';
import { IUser } from '../interfaces/user';
import validateUsers from '../libs/validateUser';
import UserService from '../services/userService';
import jwt from "jsonwebtoken"
import { JWT_SECRET_TOKEN } from '../config/env';

const UserController ={
    createUser: async (req: Request, res:Response)=>{
        try {
            const userData : IUser = req.body;

            const validateUser = validateUsers.validateCreate(userData);

            if (validateUser.error) return res.status(400).json(
                 validateUser.error.details[0]
            )
            const user = await UserService.createUser(userData);
            return res.status(200).json({
                validateUser,
                user
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({error})
        }
    },
    
    UserLogin: async(req: Request, res: Response) => {
        try {
            const accountData : Pick<IUser, "username" | "password"> = req.body;
            const validateAccount = validateUsers.validateLogin(accountData);
            if (validateAccount.error) return res.status(400).json(
                validateAccount.error.details[0]
            );

            const user = await UserService.getUser(accountData.username);
            if (!user) return res.status(400).json({
                message: "Username does not exist"
            })

            if (await verify(user.password, accountData.password ? accountData.password : "")){
                const accessToken = jwt.sign({
                    id: user._id,
                    username: user.username,
                    role: user.role
                }, JWT_SECRET_TOKEN, { expiresIn: 60 * 60 });

                res.cookie("accessToken", accessToken, {
                    maxAge: 60 * 60 * 1000,
                    httpOnly: true
                })                
                return res.status(200).json({
                    message: "Welcome back!",
                    accessToken,
                    ...user,
                    password: "",
                })
            } else {
                return res.status(400).json({
                    message: "Password does not match"
                })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error })
        }
    },

    userUpdate: async (req: Request, res: Response) => {
        try {
            const userData: Partial<IUser> = req.body;

            const validateUser = validateUsers.validateUpdate(userData);

            if (validateUser.error) return res.status(400).json(
                validateUser.error.details[0]
            )
            const user = await UserService.updateUser(req.params.id, userData);
            return res.status(200).json({
                validateUser,
                user
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error })

        }

    },

    userDelete: async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const userData = await UserService.deleteUser(id);

            if (!userData) return res.status(400).json({ msg: 'not found' });

            return res.status(200).json({ deleted: userData })
        } catch (error) {
            console.error(error)
            return res.status(500).json(error)

        }
    },

    userGet: async (req: Request, res: Response) => {
        try {
            const  username  = req.params.username;

            if (!username) return res.status(400).json({msg:"not found"})
            const userData = await UserService.getUser(username);
            return res.status(200).json({
                userData
            })
        } catch (error) {

            console.error(error)
            return res.status(500).json(error)
        }

    }
}
export default UserController