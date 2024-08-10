const {body} = require("express-validator");

const userCreateValidation = () => {
    // return if the username is not string
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório!")
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um email válido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({min: 5})
            .withMessage("A senha precisa ter no mínimo 5 caracteres.")
            .isAlphanumeric()
            .withMessage("A senha precisa conter letras e números"),
        body("confirmPassword")
            .isString()
            .withMessage("É obrigatório confirmar a senha")
            .custom((value, {req}) => {
                if(value != req.body.password) {
                    throw new Error("As senhas não são iguais.")
                }
                return true;
            })
    ] 
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("o e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido.")
            .isLength({min: 3})
            .withMessage("O email precisa ter no mínimo 3 caracteres."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isAlphanumeric()
            .withMessage("A senha precisa conter letras e números")
            .isLength({min: 5})
            .withMessage("A senha precisa ter no mínimo 3 caracteres."),
    ];
};

module.exports = {
    userCreateValidation,
    loginValidation,
}