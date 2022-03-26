import mongoose from "mongoose"
import { Role } from "../interfaces/user";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        length: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Role,
        default: Role.USER
    },
    firstName: {
        type: String,
        length: 20,
    },
    lastName: {
        type: String,
        length: 20,
    },
    email: {
        type: String,
        required: false,
    },
    telephoneNumber: {
        type: String,
        required: false,
    }
});
UserSchema.virtual("fullName")
    .get(function (this: { firstName: string, lastName: string }) {
        return `${this.firstName} ${this.lastName}`
    })
const Users = mongoose.model("users", UserSchema);

export default Users;