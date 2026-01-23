import { Request, Response } from "express"
import { extractUserFromAuthHeader } from "../helpers/auth.helper"
import { getAdminByIdService } from "../services/admin.service"
import { loginService, refreshTokenService } from "../services/auth.service"
import { getUserByIdService } from "../services/user.service"

export const postLogin = async (req: Request, res: Response) => {
    try {
        // Body
        const { email, password } = req.body

        // Service : Login
        const result = await loginService(email, password)
        if (!result) {
            return res.status(401).json({
                message: "Invalid email or password",
            })
        }

        // Success response
        return res.status(200).json({
            message: "Login successful",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}

export const getRefreshToken = async (req: Request, res: Response) => {
    try {
        // Auth header
        const authHeader = req.headers.authorization
        const refreshToken = authHeader?.split(" ")[1]

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh token required",
            })
        }

        // Service : Refresh token
        const result = await refreshTokenService(refreshToken)
        if (!result) {
            return res.status(401).json({
                message: "Invalid refresh token",
            })
        }

        // Success response
        return res.status(200).json({
            message: "Token refreshed successfully",
            data: result,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}

export const getMyProfile = async (req: Request, res: Response) => {
    try {
        // Get user id
        const { userId, role } = extractUserFromAuthHeader(req.headers.authorization)
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
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}