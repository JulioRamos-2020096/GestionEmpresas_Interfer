import { hash } from "argon2";
import User from "./user.model.js";

export const createDefaultUser = async () => {
    try {
        const existingUser = await User.findOne({
 role: "ADMIN_ROLE" });
        if (existingUser) {
            return;        }

        await User.create({
            username: "ADMINDEFAULT",
            email: "ADMINDEFAULT@kinal.edu.gt",
            password: await hash("Poll2Granj#ro"),
            role: "ADMIN_ROLE"
        });

    } catch (err) {
    }
};