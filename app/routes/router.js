const express = require('express')
const router = express.Router()
const axios = require('axios')
const PORT = process.env.PORT || 3000

router.use(express.static('public'))

// root route 
router.get('/api', (req, res)=> {
    res.json({
        "all users": `http://localhost:${PORT}/api/user`
    })
})

router.use('/api/user', require('./api/userRoutes'))

router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Home',
        name: 'Home'
    })
})

// all users 
router.get('/user', (req, res)=> {

    const url = `http://localhost:${PORT}/api/user`

    axios.get(url)
        .then(resp => {
            res.render('pages/allUser', {
                title: 'Users',
                name: 'All Users',
                data: resp.data
            })
        })
})

// userForm
router.get('/userForm', (req, res)=> {

    res.render('pages/userForm', {
        title: 'Create Account',
        name: 'Create Account'
    })

})

router.get('/user/post', (req, res)=> {

    
})

module.exports = router