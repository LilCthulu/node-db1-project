const Accounts = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
    const { name, budget } = req.body
    if (name === undefined || name === null ||
        budget === undefined || budget === null) {
        res.status(400).json({
            message: "name and budget are required"
        })
    } else if (typeof name === !"string") {
        res.status(400).json({
            message: "name of account must be a string"
        })
    } else if (name.trim().length > 101 || name.trim().length < 3) {
        res.status(400).json({
            message: "name of account must be between 3 and 100"
        })
    } else if (typeof budget === !"number") {
        res.status(400).json({
            message: "budget of account must be a number"
        })
    } else if (budget > 1000000 || budget < 0) {
        res.status(400).json({
            message: "budget of account is too large or too small"
        })
    } else {
        next()
    }
}

exports.checkAccountNameUnique = async(req, res, next) => {
    try {
        const existingName = await Accounts.getAll().name
        existingName.forEach(names => {
            const newName = req.body.name
            if (newName === names) {
                res.status(400).json({
                    message: "that name is taken"
                })
            } else { req.name = newName }
        })
    } catch (err) {
        next(err)
    }
}

exports.checkAccountId = async(req, res, next) => {
    try {
        const account = await Accounts.getById(req.params.id)
        if (!account) {
            res.status(404).json({
                message: 'account not found'
            })
        } else {
            req.account = account
            next()
        }
    } catch {
        res.status(500).json({
            message: 'problem finding account'
        })
    }
}

exports.logger = (req, res, next) => {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`${timestamp} ${method} ${url}`)
    next()
}