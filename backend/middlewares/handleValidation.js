const {validationResult} = require("express-validator");

const validate = (req, res, next) => {
    
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    const extractedErros = []

    // All errors on application
    errors.array().map((err) => extractedErros.push(err.msg))

    // return connection error status
    return res.status(422).json({
        errors: extractedErros
    })

}

module.exports = validate;