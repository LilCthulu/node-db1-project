const getAll = () => {
    const accounts = await db('accounts')
    console.log(accounts)
    return accounts
}

const getById = id => {
    const accounts = await db('accounts').where('id', id).first()
    return accounts
}

const create = account => {
    return db('actions')
        .insert(account)
        .then(([id]) => getById(id));
}

const updateById = (id, account) => {
    return db('accounts')
        .where('id', id)
        .update(account)
        .then((count) => (count > 0 ? getById(id) : null));
}

const deleteById = id => {
    return db('accounts').where('id', id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}