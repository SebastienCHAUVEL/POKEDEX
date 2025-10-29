import { sequelize } from "../data/sequelize/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Pokemon extends Model {}

Pokemon.init(
  {
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    atk_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pokemon",
  }
);
