const router = require('express').Router()

const dao = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

router.post('/post', (req, res)=> {
    dao.create(req, res, dao.table)
})

module.exports = router