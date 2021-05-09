const express = require("express");
const router = express.Router();
const Publication = require("../models/publication");
const Profile = require("../models/profile");

// @route    GET /papers
// @desc     get all papers
// @access   Public

router.get("/search", async (req, res) => {
	try {
		const facult = await Profile.find().lean();
		
		if(req.query.department) {
			Profile.find({department: req.query.department}, {"name":1,"_id":0}, (err, docs) => {
				const faculty = []
				for (index in docs) {
					faculty.push({
						"mainAuthor": docs[index].name
					})
				}
				// console.log(faculty)
 				Publication.find({
					"$or": faculty
				}, (err, papers) => {
					res.render("../views/search.hbs", { papers: papers });
				}).lean()
			}).lean()
		}
		// Search for Authors
		else if (req.query.faculty) {
			Publication.find({ mainAuthor: req.query.faculty }, (err, docs) => {
				res.render("../views/search.hbs", { papers: docs });
			}).lean();
		}
		// Search by title and tag
		else if (req.query.query) {
			const regex = new RegExp(req.query.query, "i");
			Publication.find(
				{ 
					$or: [
						{title: regex},
						{ keywords: { $in: regex } }
					]
				}, (err, docs) => {
				res.render("../views/search.hbs", {
					papers: docs,
					faculties: facult,
				});
			}).lean();
			
		} else if (req.query.year) {
			// console.log(typeof(req.query.year))
			Publication.find({ year: req.query.year }, (err, docs) => {
				res.render("../views/search.hbs", {
					papers: docs,
					faculties: facult,
				});
			}).lean();
		} else {
			// Return all papers in paginated format
			const page = parseInt(req.query.page)
			const limit = parseInt(req.query.limit)
		
			const startIndex = (page - 1) * limit
			const endIndex = page * limit
		
			const results = {}
		
			if (endIndex < await Publication.countDocuments().exec()) {
				results.next = {
					page: page + 1,
					limit: limit
				}
			}
			
			if (startIndex > 0) {
				results.previous = {
					page: page - 1,
					limit: limit
				}
			}
			try {
				results.results = await Publication.find().lean().limit(limit).skip(startIndex).exec()
			} catch (e) {
				res.status(500).json({ message: e.message })
			}

			Publication.find((err, docs) => {
				res.render("../views/search.hbs", {
					papers: results.results,
					faculties: facult,
				});
			}).lean();
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

// router.get("/seearch", paginatedResults(Publication), async (req, res) => {
// 	try {
// 		res.json(res.paginatedResults)
// 	} catch (error) {
// 		console.error(error.mesage);
// 		res.status(500).json({ msg: "Server Error" });
// 	}
// })

// Middleware
// will need for pagination
// function paginatedResults(model){
// 	return async (req, res, next) => {
// 		const page = parseInt(req.query.page)
// 		const limit = parseInt(req.query.limit)
	
// 		const startIndex = (page - 1) * limit
// 		const endIndex = page * limit
	
// 		const results = {}
	
// 		if (endIndex < await model.countDocuments().exec()) {
// 		  results.next = {
// 			page: page + 1,
// 			limit: limit
// 		  }
// 		}
		
// 		if (startIndex > 0) {
// 		  results.previous = {
// 			page: page - 1,
// 			limit: limit
// 		  }
// 		}
// 		try {
// 		  results.results = await model.find().limit(limit).skip(startIndex).exec()
// 		  res.paginatedResults = results
// 		  next()
// 		} catch (e) {
// 		  res.status(500).json({ message: e.message })
// 		}
// 	}
// }


module.exports = router;

// search query
// search input css