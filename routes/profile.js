const express = require("express");
const router = express.Router();
const Prof = require("../models/prof");
const Publication = require("../models/publication");

// @route    GET /all
// @desc     get all profs
// @access   Public

router.get("/all", async (req, res) => {
	try {
		const profiles = await Prof.find();
		if (profiles.length === 0) {
			return res.status(400).json({ msg: "No profiles found" });
		}
		res.json(profiles);
	} catch (error) {
		console.error(error.mesage);
		res.status(500).json({ msg: "Server Error" });
	}
});

// @route    GET /profile/:id
// @desc     get profile by id
// @access   Public

router.get("/:id", async (req, res) => {
	try {
		const profile = Prof.findOne({ id: req.params.id });
		if (!profile) {
			return res.status(404).json({ msg: "Profile not found" });
		}
		res.json(profile);
	} catch (error) {
		console.error(error.mesage);
		res.status(500).json({ msg: "Server Error" });
	}
});

module.exports = router;