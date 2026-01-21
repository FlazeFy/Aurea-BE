import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

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
