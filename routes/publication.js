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
			Publication.find((err, docs) => {
				res.render("../views/search.hbs", {
					papers: docs,
					faculties: facult,
				});
			}).lean();
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.get("/page/:page_number", async (req, res) => {
	try {
		var page = req.params.page_number;
		const result = await Publication.find()
			.skip((page - 1) * 30)
			.limit(30)
			.lean();
		if (result.length === 0) {
			return res.status(400).json({ msg: "No papers found" });
		}
		const facult = await Profile.find().lean();

		// const d = Publication.find().sort({year:-1}).limit(1);
        // console.log(d);

		result.forEach((paper) => {
			var list = [];
			for (
				let index = 0;
				index < Math.min(4, paper.authors.length);
				index++
			) {
				const author = paper.authors[index];
				list.push(author);
			}
			paper.authors = list;
		});

		res.render("../views/search.hbs", {
			papers: result,
			highLight: page,
			faculties: facult,
		});
	} catch (error) {
		console.error(error.mesage);
		res.status(500).json({ msg: "Server Error" });
	}
});


module.exports = router;

// deaprtment
// Prof