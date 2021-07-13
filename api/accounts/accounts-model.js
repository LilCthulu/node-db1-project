const db = require('../../data/db-config')

async function getAll() {
    const accounts = await db('accounts')
    console.log(accounts)
    return accounts
}

async function getById(id) {
    const accounts = await db('accounts').where('id', id).first()
    return accounts
}

async function create(account) {
    return db('actions')
        .insert(account)
        .then(([id]) => getById(id));
}

async function updateById(id, account) {
    return db('accounts')
        .where('id', id)
        .update(account)
        .then((count) => (count > 0 ? getById(id) : null));
}

async function deleteById(id) {
    return db('accounts').where('id', id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}