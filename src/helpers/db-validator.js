import User from "../user/user.model.js";
import Company from "../company/company.model.js";

export const emailExistsUser = async (email = "") => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const emailExistsCompany = async (email = "") => {
    const exists = await Company.findOne({ email });
    if (exists) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({ username });
    if (exists) {
        throw new Error(`The username ${username} is already registered`);
    }
};

export const companyExists = async (name = "") => {
    const exists = await Company.findOne({ name });
    if (exists) {
        throw new Error(`The company ${name} is already registered`);
    }
};

export const userExists = async (uid = "") => {
    const exists = await User.findById(uid);
    if (!exists) {
        throw new Error("There is no user with that ID");
    }
};

export const companyExistsById = async (id = "") => {
    const exists = await Company.findById(id);
    if (!exists) {
        throw new Error("There is no company with that ID");
    }
};