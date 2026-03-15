import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define("User", {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        website: DataTypes.STRING
    });