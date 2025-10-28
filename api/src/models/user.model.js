import { sequelize } from "../data/sequelize/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
);
