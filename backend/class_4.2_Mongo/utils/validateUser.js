
const UserData = require("./models/user.js"); 
const validator = require("validator");


async function validateUser(req, res) {
    const mandatoryFields = ["firstName", "email", "age", "password"];

    const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

    if(!isAllowed)
        throw new Error ("Fields are missing");

    if(!validator.isEmail(data.email))
        throw new Error ("Invalid email");

    if(!validator.isStrongPassword(data.password))
        throw new Error ("weak password");





    // // Check if all mandatory fields are present in the request body
    // const missingFields = mandatoryFields.filter(field => !req.body.hasOwnProperty(field));

    // if (missingFields.length > 0) {
    //     return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
    // }

    // Check if the email already exists
    const existingUser = await UserData.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists!" });
    }
}

module.exports = validateUser;
