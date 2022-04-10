import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE || 'localhost',
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "crud",
    synchronize: true,
    logging: true,
    entities: ["entity/*{.js,.ts}"],
    subscribers: [],
    migrations: [],
})
