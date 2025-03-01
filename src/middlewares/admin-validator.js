import { body } from "express-validator";
import { emailExistsA, usernameExists } from "../helpers/db-validator.js";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";

export const adminValidator = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("The email is required."),
    body("email").isEmail().withMessage("Not a valid email."),
    body("email").custom(emailExistsA),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols."),
    validarCampos,
    deleteFileOnError,
    handleErrors,
];