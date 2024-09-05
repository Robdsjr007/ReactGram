const {body} = require('express-validator');

const photoInsertValidation = () => {
    return [
        body("title")
        .not()
        .equals("undefined")
        .withMessage("O título é obrigatório.")
        .isString()
        .withMessage("O título precisa ser apenas texto")
        .isLength({min: 3})
        .withMessage("Tamanho mínimo do título é de 3 caracteres"),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória");
            }
            return true;
        }),
    ];
};

module.exports = {
    photoInsertValidation,
}