import express from "express";
import cors from "cors";
import { sequelize } from "./database/models/index.js";
import seeder from "./database/seeder.js"
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

const start = async () => {
    await sequelize.sync();
    await seeder();

    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
}

start();