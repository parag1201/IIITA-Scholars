const express = require('express')
const router = express.Router()
const Publication = require('../models/publication')

router.get('/abstract/:id', (req, res) => {
    Publication.findById(req.params.id)
        .lean()
        .then((article) => {
            res.send({ abstract: article.abstract })
        })
})

router.get('/summary/:id', (req, res) => {
    Publication.findById(req.params.id)
        .lean()
        .then((article) => {
            res.send({ summary: article.summary })
        })
})

module.exports = router
