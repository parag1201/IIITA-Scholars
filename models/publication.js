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
    mainAuthor: {
        type: String,
    },
    authors: [],
    keywords: [],
    type: {
        type: String,
    },
    source: {
        type: String,
    },
    year: {
        type: String,
        required: true,
    },
    citations: {
        type: Number,
        required: true,
    },
})

module.exports = Publication = mongoose.model('publication', PublicationSchema)
