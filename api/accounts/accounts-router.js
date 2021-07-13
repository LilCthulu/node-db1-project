const Accounts = require("./accounts-model")
const router = require('express').Router()
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./Accounts-middleware')



router.get("/", (req, res, next) => {
    Accounts.getAll()
        .then((accounts) => res.json(accounts))
        .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
    res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
    Accounts.create(req.body)
        .then((newAccount) => {
            res.status(201).json(newAccount)
        })
        .catch(next)
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
    Accounts.update(req.params.id, req.body)
        .then((updatedAccount) => {
            res.json(updatedAccount)
        })
        .catch(next)
})

router.delete('/:id', checkAccountId, async(req, res, next) => {
    try {
        await Accounts.remove(req.params.id)
        res.json(req.account)
    } catch (error) {
        next(error)
    }

})
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;