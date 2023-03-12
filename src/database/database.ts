import { Dialect, Sequelize } from "sequelize";
import * as dotenv from "dotenv";

// TODO: This should be external config
export let sequelize = new Sequelize("sqlite::memory:");

const environment = process.env.NODE_ENV?.trim() || "dev";
dotenv.config({  path: `.env.${environment}` });

if (process.env.NODE_ENV?.trim() !== "test") {
	sequelize = new Sequelize(
		process.env.DB_NAME ?? "MISSING_DB_NAME_CONFIG",
		process.env.DB_USERNAME ?? "MISSING_DB_USERNAME_CONFIG",
		process.env.DB_PASSWORD ?? "MISSING_DB_PASSWORD_CONFIG",
		{
			host: process.env.DB_HOST ?? "MISSING_DB_HOST_CONFIG",
			port: parseInt(process.env.DB_PORT as string) ??  "MISSING_DB_PORT_CONFIG",
			dialect: (process.env.DB_DIALECT as Dialect) ?? "postgres",
		}
	);
}
