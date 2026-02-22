const { body, validationResult } = require("express-validator");

const signupRules = [
    
    body("username").notEmpty().withMessage("Username required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
];

const employeeRules = [
    
    body("first_name").notEmpty().withMessage("First name required"),
    body("last_name").notEmpty().withMessage("Last name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("salary").isFloat({ min: 1000 }).withMessage("Salary must be ≥ 1000"),
];

const runValidation = async (rules, data) => {
    
    for (let rule of rules) {
        await rule.run({ body: data });
    }

    const errors = validationResult({ body: data });

    if (!errors.isEmpty()) {
        return errors.array().map(e => e.msg).join(", ");
    }

    return null;
};

module.exports = {
    signupRules,
    employeeRules,
    runValidation,
};
