import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define("Company", {
        name: DataTypes.STRING,
        catchPhrase: DataTypes.STRING,
        bs: DataTypes.STRING
    });