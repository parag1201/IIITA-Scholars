const express = require('express')
const router = express.Router()
const Publication = require('../models/publication')

// @route    GET /papers
// @desc     get all papers
// @access   Public

router.get('/search', async (req, res) => {
    try {
        // Search for Authors
        if (req.query.faculty) {
            const regex = new RegExp(req.query.faculty, 'i')

            Publication.find({ authors: { $in: regex } }, (err, docs) => {
                res.render('../views/search.hbs', { papers: docs })
            }).lean()
        }
        // Search by title
        else if (req.query.name) {
            const regex = new RegExp(req.query.name, 'i')

            Publication.find({ title: regex }, (err, docs) => {
                res.render('../views/search.hbs', { papers: docs })
            }).lean()
        } else if (req.query.year) {
            Publication.find({ year: '2018' }, (err, docs) => {
                res.render('../views/search.hbs', { papers: docs })
            }).lean()
        } else {
            Publication.find((err, docs) => {
                res.render('../views/search.hbs', { papers: docs })
            }).lean()
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await Publication.find().lean()
        if (result.length === 0) {
            return res.status(400).json({ msg: 'No papers found' })
        }

        result.forEach((paper) => {
            var list = []
            for (
                let index = 0;
                index < Math.min(4, paper.authors.length);
                index++
            ) {
                const author = paper.authors[index]
                list.push(author)
            }
            paper.authors = list
        })

        res.render('../views/search.hbs', { papers: result })
    } catch (error) {
        console.error(error.mesage)
        res.status(500).json({ msg: 'Server Error' })
    }
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

module.exports = router
