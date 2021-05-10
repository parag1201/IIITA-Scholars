const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const Publication = require('../models/publication')

router.get('/', async (req, res) => {
    var yearwiseArticles = []
    var yearwiseCitations = []
    var deptWise = []
    var depts = []
    var types = []
    
    const facult = await Profile.find().lean();

    Publication.find()
        .lean()
        .then((result) => {
            Profile.find()
                .lean()
                .then((profiles) => {
                    cntYearwise = {}
                    cntType = {}
                    cntCitations = {}
                    cntDepts = {}
                    var pp = 0
                    result.forEach((paper) => {
                        if (!cntYearwise[paper.year])
                            cntYearwise[paper.year] = 0
                        if (parseInt(paper.citations)) {
                            pp += parseInt(paper.citations)
                        }
                        cntYearwise[paper.year]++
                        if (paper.type) {
                            if (!cntType[paper.type]) cntType[paper.type] = 0
                            cntType[paper.type]++
                        }
                    })

                    profiles.forEach((profile) => {
                        profile.citationHistory.forEach((data) => {
                            year = data.split(' ')[0]
                            cnt = parseInt(data.split(' ')[1])
                            if (!cntCitations[year]) cntCitations[year] = 0
                            cntCitations[year] += cnt
                        })
                        if (!cntDepts[profile.department])
                            cntDepts[profile.department] = [0, 0]
                        cntDepts[profile.department][0] +=
                            profile.countPublications
                        cntDepts[profile.department][1] += parseInt(
                            profile.countCitations
                        )
                    })

                    for (year in cntYearwise) {
                        yearwiseArticles.push([year, cntYearwise[year]])
                    }
                    yearwiseArticles.sort()
                    for (type in cntType) {
                        types.push([type, cntType[type]])
                    }
                    for (year in cntCitations) {
                        yearwiseCitations.push([year, cntCitations[year]])
                    }
                    yearwiseCitations.sort()
                    for (department in cntDepts) {
                        depts.push(department)
                        deptWise.push(cntDepts[department])
                    }
                    res.render('../views/home', {
                        profData: profiles,
                        articles: yearwiseArticles,
                        citations: yearwiseCitations,
                        departments: depts,
                        deptData: deptWise,
                        types: types,
                        countFaculties: profiles.length,
                        countPublications: result.length,
                        countDepartments: depts.length,
                        countOfCitation: pp,
                        faculties: facult,
                    })
                })
        })
})

module.exports = router
