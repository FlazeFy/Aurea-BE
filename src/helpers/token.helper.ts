import jwt from "jsonwebtoken";

export const createToken = (data: any) => {
    return jwt.sign(data, process.env.SECRET || "secret", { expiresIn: "24h" })
}
