import { body } from "express-validator";
import { enterpriseExists } from "../helpers/validar-db.js";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validar-jwt.js";

const impactLevels = ["HIGH_IMPACT", "MEDIUM_IMPACT", "LOW_IMPACT"];
const categories = ["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"];

export const addEnterpriseValidator = [
    validateJWT,
    body("name")
        .notEmpty().withMessage("El nombre de la empresa es requerido")
        .isLength({ max: 70 }).withMessage("El nombre de la empresa no debe superar los 70 caracteres")
        .custom(enterpriseExists),
    body("description")
        .notEmpty().withMessage("La descripción es requerida")
        .isLength({ max: 200 }).withMessage("La descripción no debe superar los 200 caracteres"),
    body("impactLevel")
        .isIn(impactLevels).withMessage("El impacto de la empresa debe ser uno de los siguientes: HIGH_IMPACT, MEDIUM_IMPACT, LOW_IMPACT"),
    body("foundingDate")
        .isDate().withMessage("La fecha de fundación debe ser una fecha válida en formato YYYY-MM-DD"),
    body("email")
        .notEmpty().withMessage("El correo de la empresa es requerido")
        .isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("phone")
        .notEmpty().withMessage("El teléfono de la empresa es requerido")
        .isLength({ max: 8 }).withMessage("El teléfono no debe superar los 8 caracteres"),
    body("category")
        .isIn(categories).withMessage("La categoría debe ser una de las siguientes: TECNOLOGIA, ALIMENTOS, SALUD, SERVICIOS, CONSTRUCCION, FINANZAS, OTROS"),
    body("address")
        .notEmpty().withMessage("La dirección de la empresa es requerida")
        .isLength({ max: 100 }).withMessage("La dirección no debe superar los 100 caracteres"),
    validarCampos,
    handleErrors
];

export const updateEnterpriseValidator = [
    validateJWT,
    body("name")
        .optional()
        .isLength({ max: 70 }).withMessage("El nombre de la empresa no debe superar los 70 caracteres")
        .custom(enterpriseExists),
    body("description")
        .optional()
        .isLength({ max: 200 }).withMessage("La descripción no debe superar los 200 caracteres"),
    body("impactLevel")
        .optional()
        .isIn(impactLevels).withMessage("El impacto de la empresa debe ser uno de los siguientes: HIGH_IMPACT, MEDIUM_IMPACT, LOW_IMPACT"),
    body("foundingDate")
        .optional()
        .isDate().withMessage("La fecha de fundación debe ser una fecha válida en formato YYYY-MM-DD"),
    body("email")
        .optional()
        .isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("phone")
        .optional()
        .isLength({ max: 8 }).withMessage("El teléfono no debe superar los 8 caracteres"),
    body("category")
        .optional()
        .isIn(categories).withMessage("La categoría debe ser una de las siguientes: TECNOLOGIA, ALIMENTOS, SALUD, SERVICIOS, CONSTRUCCION, FINANZAS, OTROS"),
    body("address")
        .optional()
        .isLength({ max: 100 }).withMessage("La dirección no debe superar los 100 caracteres"),
    validarCampos,
    handleErrors
];

export const getEnterprisesValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const generateExcelValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];
