const express = require("express");
const router = express.Router();
const Publication = require("../models/publication");

// @route    GET /papers
// @desc     get all papers
// @access   Public

router.get("/", async (req, res) => {
	try {
		const papers = await Publication.find();
		if (papers.length === 0) {
			return res.status(400).json({ msg: "No papers found" });
		}
		res.json(papers);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;
