const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

mongoose.connect(db);
module.exports = connectDB;
