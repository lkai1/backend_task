import { DataTypes } from "sequelize";

export default (sequelize) =>
    sequelize.define("Location", {
        street: DataTypes.STRING,
        suite: DataTypes.STRING,
        city: DataTypes.STRING,
        zipcode: DataTypes.STRING,
        lat: DataTypes.STRING,
        lng: DataTypes.STRING
    });