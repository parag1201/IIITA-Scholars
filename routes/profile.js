const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Publication = require('../models/publication')

// @route    GET /all
// @desc     get all profs
// @access   Public

router.get('/', (req, res) => {
    Profile.find()
        .lean()
        .then((result) => {
            // console.log(result)
            res.render('../views/facultiesPage', { profData: result })
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// @route    GET /profile/:id
// @desc     get profile by id
// @access   Public

router.get('/:id', (req, res) => {
    Profile.findById(req.params.id)
        .lean()
        .then((result) => {
            Publication.find()
                .lean()
                .then((papers) => {
                    profPapers = []
                    papers.forEach((paper) => {
                        if (paper.mainAuthor == result.name) {
                            profPapers.push(paper)
                        }
                    })
                    res.render('../views/profile', {
                        profData: result,
                        articles: profPapers,
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
