import { Request, Response } from "express"
import { loginService, refreshTokenService } from "../services/auth.service"

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