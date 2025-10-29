import { sequelize } from "../data/sequelize/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Type extends Model {}

Type.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    color: {
      type: DataTypes.CHAR(7),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "type",
  }
);
