const express = require("express");
const router = express.Router();
const Publication = require("../models/publication");

// @route    GET /papers
// @desc     get all papers
// @access   Public

router.get("/", async (req, res) => {
	try {
		const result = await Publication.find().lean();
		if (result.length === 0) {
			return res.status(400).json({ msg: "No papers found" });
		}
		console.log(result);
		res.render('../views/search.hbs', {papers: result});
	} catch (error) {
		console.error(error.mesage);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;
