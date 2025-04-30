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

// user single
router.get('/user/:id', (req, res, next)=> {

    const id = req.params.id

    if (isNaN(id)) {
        res.render('pages/error', {
            title: 'Error',
            name: 'Error',

        })

        try {
            throw new Error('invalid id')
        } catch (err) {
            next(err)
        }

    } else {
        const url = `http://localhost:${PORT}/api/user/${id}`
    
        axios.get(url)
            .then(resp => {
                res.render('pages/userSingle', {
                    title: `${resp.data.first_name} ${resp.data.last_name}`,
                    name: `${resp.data.first_name} ${resp.data.last_name}`,
                    data: resp.data
                })
            })
    }

})

// userForm
router.get('/userForm', (req, res)=> {

    res.render('pages/userForm', {
        title: 'Create Account',
        name: 'Create Account'
    })

})

// editPassword 
router.get('/editPassword/:userId', (req, res)=> {
    const userId =  req.params.userId

    res.render('pages/editPassword', {
        title: 'Edit Password',
        name: 'Edit Password',
        userId
    })
})

router.post('/update/:userId', (req, res)=> {


    axios.patch(`http://localhost:${PORT}/api/user/update`, {
        user_id: req.params.userId,
        password: req.body.password
        
    }).then(resp => {
        res.render('pages/editSuccess', {
            title: 'Success',
            name: 'Success'
        })
    }).catch(error => console.log(error))
})


// use app.all('/{*any}', func) for 404 error handling
router.all('/{*any}', (req, res, next)=> {
    // res.status(404).send('<h1>404 Page not found</h1>')
    res.render('pages/error', {
        title: '404 Error',
        name: '404 Error'
    })
})

module.exports = router