import { Sequelize } from "sequelize";
import User from "./User.js";
import Location from "./Location.js";
import Company from "./Company.js";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false
});

const models = {
    User: User(sequelize),
    Location: Location(sequelize),
    Company: Company(sequelize)
};

models.User.hasOne(models.Location, { foreignKey: "userId", onDelete: "CASCADE" });
models.Location.belongsTo(models.User, { foreignKey: "userId" });

models.User.hasOne(models.Company, { foreignKey: "userId", onDelete: "CASCADE" });
models.Company.belongsTo(models.User, { foreignKey: "userId" });

export { sequelize };
export default models;