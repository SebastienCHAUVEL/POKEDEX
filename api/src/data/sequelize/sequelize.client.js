import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

await sequelize.authenticate();
console.log("Database connected successfully.");
