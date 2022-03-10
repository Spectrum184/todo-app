import Users from '../models/userModel';
import { IUser } from '../interfaces/user';
import { hash } from 'argon2';


const UserService = {
    createUser:async (user:IUser) => {
        try {
            const hashedPassword = await hash(user.password ? user.password : "")
            const newUser = new Users({
                ...user,
                password: hashedPassword

            })

            await newUser.save();
            return newUser
        } catch (error) {
            throw error;
            
        }
    },

    updateUser: async (id: string, user: Partial<IUser> ) =>{
        try {
            const updateUser = await Users.findByIdAndUpdate(
                id,
                {
                    ...user,
                },
                {new:true} 
            )

            return updateUser
        } catch (error) {
            throw error;
        }
    },

    getUser: async (username: string) => {
        try {
            const user = await Users.findOne({
                username,
            })

            return user._doc;
            
        } catch (error) {
            throw error;
            
        }
    },

    deleteUser:async (id:string) => {
        try {
            const user = Users.findByIdAndDelete(id);

            if(!user) return false;

            return true
        } catch (error) {
            throw error
        }
        
    }

}

export default UserService