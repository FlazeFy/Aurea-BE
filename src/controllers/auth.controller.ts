import { NextFunction, Request, Response } from "express"
import { extractUserFromLocals } from "../helpers/auth.helper"
import { getAdminByIdService } from "../services/admin.service"
import { loginService, refreshTokenService } from "../services/auth.service"
import { getUserByIdService } from "../services/user.service"

export const postLoginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Body
        const { email, password } = req.body

        // Service : Login
        const result = await loginService(email, password)
        if (!result) throw { code: 401, message: "Invalid email or password" }

        // Success response
        return res.status(200).json({
            message: "Login successful",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}

export const getRefreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Auth header
        const authHeader = req.headers.authorization
        const refreshToken = authHeader?.split(" ")[1]

        if (!refreshToken) throw { code: 400, message: "Refresh token required" }

        // Service : Refresh token
        const result = await refreshTokenService(refreshToken)
        if (!result) throw { code: 401, message: "Invalid refresh token" }

        // Success response
        return res.status(200).json({
            message: "Token refreshed successfully",
            data: result,
        })
    } catch (error: any) {
        next(error)
    }
}

export const getMyProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user id
        const { userId, role } = extractUserFromLocals(res)
        let result 

        switch (role) {
            case "user":
                // Service : Get user by id
                result = await getUserByIdService(userId)
                break;
            case "admin":
                // Service : Get admin by id
                result = await getAdminByIdService(userId)
                break;
            default:
                res.status(409).json({
                    message: "Role not valid"
                })
                break;
        }

        if (!result) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const { password, ...finalRes } = result

        // Success response
        res.status(200).json({
            message: "Get user successful",
            data: finalRes
        })
    } catch (error: any) {
        next(error)
    }
}