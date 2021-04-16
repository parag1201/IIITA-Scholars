const mongoose = require('mongoose')

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        reqired: true,
    },
    summary: {
        type: String,
        reqired: true,
    },
    googleScholarLink: {
        type: String,
        required: true,
    },
    publicationLink: {
        type: String,
        required: true,
    },
    authors: [],
    keywords: [],
    conference: {
        type: String,
    },
    journal: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    citations: {
        type: Number,
        required: true,
    },
})

module.exports = Publication = mongoose.model('publication', PublicationSchema)
