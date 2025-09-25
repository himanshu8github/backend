const UserData = require("../models/user.js");
const validator = require("validator");

async function validateUser(data) {  // Accept `data` as parameter instead of directly using `req`
    const mandatoryFields = ["firstName", "email", "age", "password"];

    // Validate if mandatory fields are included in the data
    const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

    if (!isAllowed)
        throw new Error("Fields are missing");

    // Validate email
    if (!validator.isEmail(data.email))
        throw new Error("Invalid email");

    // Validate password strength
    if (!validator.isStrongPassword(data.password))
        throw new Error("Weak password");

    // Check if the email already exists in the database
    const existingUser = await UserData.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("Email already exists!");
    }
}

module.exports = validateUser;
