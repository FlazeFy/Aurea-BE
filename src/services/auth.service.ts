import { compare } from "bcrypt"
import { createToken } from "../helpers/token.helper"
import { findAdminByEmailRepo, findAdminByIdRepo } from "../repositories/admin.repository"
import { findUserByEmailRepo, findUserByIdRepo } from "../repositories/user.repository"
import jwt from "jsonwebtoken"

export const loginService = async (email: string, password: string) => {
    // Repo : Check admin first
    const admin = await findAdminByEmailRepo(email)
    if (admin) {
        const validPassword = await compare(password, admin.password)
        if (!validPassword) return null

        const token = createToken({ id: admin.id, role: "admin" })
        return {
            name: admin.username,
            email: admin.email,
            role: "admin",
            token,
        }
    }

    // Repo : Check user if not admin
    const user = await findUserByEmailRepo(email)
    if (user) {
        const validPassword = await compare(password, user.password)
        if (!validPassword) return null

        const token = createToken({ id: user.id, role: "user" })
        return {
            name: user.username,
            email: user.email,
            role: "user",
            token
        }
    }

    return null
}

export const refreshTokenService = async (refreshToken: string) => {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.SECRET || "secret")
    if (typeof decoded === "string" || !("id" in decoded)) {
        return null
    }

    const id = decoded.id

    // Repo : Check admin first
    const admin = await findAdminByIdRepo(id)
    if (admin) {
        const token = createToken({ id: id, role: "admin" })
        return {
            name: admin.username,
            email: admin.email,
            role: "admin",
            token,
        }
    }

    // Repo : Check user if not admin
    const user = await findUserByIdRepo(id)
    if (user) {
        const token = createToken({ id: id, role: "user" })
        return {
            name: user.username,
            email: user.email,
            role: "user",
            token
        }
    }

    return null
}