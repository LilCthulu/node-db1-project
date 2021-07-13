const getAll = () => {
    // DO YOUR MAGIC
}

const getById = id => {
    // DO YOUR MAGIC
}

const create = account => {
    // DO YOUR MAGIC
}

const updateById = (id, account) => {
    return db('accounts')
        .where('id', id)
        .update(account)
        .then((count) => (count > 0 ? get(id) : null));
}

const deleteById = id => {
    // DO YOUR MAGIC
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}