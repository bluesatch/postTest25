const router = require('express').Router()
const axios = require('axios')

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

router.patch('/update', (req, res)=> {
    dao.update(req, res, dao.table, req.params.userId)
})

module.exports = router