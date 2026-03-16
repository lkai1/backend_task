import app from "./app.js";
import { sequelize } from "./database/models/index.js";
import seeder from "./database/seeder.js";

const start = async () => {
    try {
        await sequelize.sync();
        await seeder();

        app.listen(3001, () => {
            console.log("Server running on port 3001");
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

start();