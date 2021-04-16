const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Publication = require('../models/publication')

// @route    GET /all
// @desc     get all profs
// @access   Public

router.get('/', (req, res) => {
    Profile.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// @route    GET /profile/:id
// @desc     get profile by id
// @access   Public

router.get('/:id', (req, res) => {
    var profData = {}
    var articles = []
    Profile.findById(req.params.id)
        .lean()
        .then((result) => {
            Publication.find()
                .lean()
                .then((papers) => {
                    papers.forEach((paper) => {
                        paper.authors = paper.authors.slice(1)
                    })
                    console.log(result)
                    res.render('../views/profile', {
                        profData: result,
                        articles: papers,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
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
})

module.exports = router
