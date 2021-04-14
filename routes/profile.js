const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

// @route    GET /all
// @desc     get all profs
// @access   Public

router.get("/", (req, res) => {
	Profile.find()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});

// @route    GET /profile/:id
// @desc     get profile by id
// @access   Public

router.get("/:id", (req, res) => {
	Profile.findById(req.params.id)
		.lean()
		.then((result) => {
			res.render("../views/profile", { profData: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
