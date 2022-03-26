import Users from '../models/userModel';
import { IUser } from '../interfaces/user';
import { hash } from 'argon2';

const UserService = {
  createUser: async (user: IUser) => {
    try {
      const hashedPassword = await hash(user.password ? user.password : '');
      const newUser = new Users({
        ...user,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id: string, user: Partial<IUser>) => {
    try {
      const hashedPassword = await hash(user.password ? user.password : '');
      const updateUser = await Users.findByIdAndUpdate(id, {
        ...user,
        password: hashedPassword,
      });
      console.log(updateUser);
      return updateUser;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (username: string) => {
    try {
      const user = await Users.findOne({
        username,
      });

      if (!user) return undefined;
      return user._doc;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const user = await Users.findByIdAndDelete(id)
        .select(['username', 'role', 'email'])
        .exec();

      if (!user) return undefined;
      return user;
    } catch (error) {
      throw error;
    }
  },

  getAllUser: async (role: string) => {
    try {
      const allUser = await Users.find({ role: role }).then((result) => {
        return result.map((r) => ({ ...r._doc, password: undefined }));
      });
      console.log(allUser);
      return allUser;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
