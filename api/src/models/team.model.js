import { sequelize } from "../data/sequelize/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Team extends Model {}

Team.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "teams",
  }
);
