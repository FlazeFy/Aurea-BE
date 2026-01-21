import { compare } from "bcrypt"
import { createToken } from "../helpers/token.helper"
import { findAdminByEmailRepo } from "../repositories/admin.repository"
import { findUserByEmailRepo } from "../repositories/user.repository"

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
