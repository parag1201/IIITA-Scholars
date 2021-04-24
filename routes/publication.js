const express = require("express");
const router = express.Router();
const Publication = require("../models/publication");

// @route    GET /papers
// @desc     get all papers
// @access   Public


router.get("/search", async (req, res) => {
	try {
		const query = req.query.tag;

		const result = await Publication.find().lean();
		if (result.length === 0) {
			return res.status(400).json({ msg: "No papers found" });
		}
		Publication.find({keywords: {"$in": [query]}}, (err, docs) => {
			res.render('../views/search.hbs', {papers: docs})
		}).lean();
		// Publication.find({ year: {$gte:year} }, (err, docs) => {
		// 	console.log(docs);
		// })
		// console.log(result);
		// console.log(year);
		// console.log(typeof(year));
		// if (year.length() > 0) {
		// 	result = result.filter((p) => p.year.toString() === year);
		// }

		// if (tag) {
		// 	result = result.filter((p) => {
		// 		p.keywords.
		// 	});
		// }
		// if (faculty) {
		// }
		// if (title) {
		// }
		// console.log(result);
		// res.render("../views/search.hbs", { papers: result });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const result = await Publication.find().lean();
		if (result.length === 0) {
			return res.status(400).json({ msg: "No papers found" });
		}
		// console.log(result);
		res.render("../views/search.hbs", { papers: result });
	} catch (error) {
		console.error(error.mesage);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;
