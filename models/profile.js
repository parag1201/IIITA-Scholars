const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    scholar_id: {
        type: String,
    },
    orcid_id: {
        type: String,
    },
    microsoft_id: {
        type: String,
    },
    avatar: {
        type: String,
    },
    expertise: [],
    countCitations: {
        type: Number,
        required: true,
    },
    countPublications: {
        type: Number,
        required: true,
    },
})

module.exports = Prof = mongoose.model('profile', ProfileSchema)
