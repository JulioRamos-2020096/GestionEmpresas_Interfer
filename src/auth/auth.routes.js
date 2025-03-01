import { Router } from "express";
import { loginValidator, registerValidator } from "../middlewares/admin-validator.js";
import { login, register } from "./auth.controller.js";

const router = Router();


router.post(
    "/register",
    registerValidator,
    register
);

router.post(
    "/login",
    loginValidator,
    login
);

export default router;