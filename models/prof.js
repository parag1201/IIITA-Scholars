const mongoose = require("mongoose");

const ProfSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	scholar_id: {
		type: String,
		required: true,
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
	education: [
		{
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			degree: {
				type: String,
				required: true,
			},
			university: {
				type: String,
				required: true,
			},
		},
	],
	countCitations: {
		type: Number,
		required: true,
	},
	countPublications: {
		type: Number,
		required: true,
	},
	publications: [
		{
			title: {
				type: String,
				required: true,
			},
			authors: [],
			conference: {
				type: String,
			},
			year: {
				type: Date,
				required: true,
			},
		},
	],
	citations: [
		{
			title: {
				type: String,
				required: true,
			},
			conference: {
				type: String,
			},
			year: {
				type: Date,
				required: true,
			},
		},
	],
});

module.exports = Prof = mongoose.model("prof", ProfSchema);
