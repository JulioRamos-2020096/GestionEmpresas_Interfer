import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const encryptedPassword = await hash(password);

        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
            role: "ADMIN_ROLE"
        });

        return res.status(201).json({
            message: "Admin has been registered.",
            admin: {
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Admin registration failed.",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "User or email not found"
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            adminDetails: {
                token: token
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};