import jwt from "jsonwebtoken"
import { NextFunction, Response } from "express";
import { JWT_SECRET_TOKEN } from "../config/env";
import Users from "../models/userModel";
import { IDecodedToken } from "../interfaces/user";
import { ILoginRequest } from "../interfaces/customRequest";

export async function authenticate(req: ILoginRequest, res: Response, next: NextFunction) {
    try {
        const accessToken = req.header("Authorization");
        if (!accessToken) return res.status(403).json({
            message: "This action requires login!"
        })
        const decoded = jwt.verify(accessToken, JWT_SECRET_TOKEN) as IDecodedToken
        if (decoded.role !== "Admin")
            return res.status(403).json({
                message: "Admin only!"
            })
        if (decoded.id !== "") {
            const user = await Users.findById(decoded.id);
            if (decoded.username !== user.username || decoded.role !== user.role) {
                return res.status(403).json({
                    message: "Invalid access token"
                })
            }
            req.user = decoded;
        } else {
            return res.status(403).json({
                message: "Invalid access token"
            })
        }
        next();
    } catch (error) {
        console.error(error)
    }
}