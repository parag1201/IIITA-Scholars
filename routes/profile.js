const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Publication = require('../models/publication')

// @route    GET /all
// @desc     get all profs
// @access   Public

router.get('/all', async (req, res) => {
    Profile.find()
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// @route    GET /profile/:id
// @desc     get profile by id
// @access   Public

router.get('/:id', (req, res) => {
    var profData
    var articles = []
    Profile.findById(req.params.id)
        .lean()
        .then((result) => {
            profData = result
        })
        .catch((err) => {
            console.log(err)
        })

    // Publication.find()
    //     .lean()
    //     .then((result) => {
    //         result.forEach((article) => {
    //             if (article.authors[0] == profData.name) {
    //                 articles.push(article)
    //             }
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    console.log(profData)
    res.render('../views/profile', { profData, articles })
})

module.exports = router
