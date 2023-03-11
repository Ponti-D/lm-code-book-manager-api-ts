import * as dotenv from "dotenv";
import { app } from "./app";
import { populateDummyData } from "./database/database_seed";

const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

const PORT = process.env.PORT;

console.log(`🌍 Running in ${environment} environment`);

app.listen(PORT, () => {
	console.log(`🚂 Express started on port ${PORT}`);

	// Seed the database with some data
	if (environment === "dev") {
		populateDummyData();
	}
});
