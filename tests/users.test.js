import request from "supertest";
import app from "../app.js";
import { sequelize } from "../database/models/index.js";

describe("Users API", () => {
    let createdUserId;

    const newUser = {
        name: "Test User",
        username: "testuser",
        email: "test@test.com",
        phone: "123",
        website: "test.com",
        address: {
            street: "street",
            suite: "suite",
            city: "city",
            zipcode: "123",
            geo: { lat: "10", lng: "20" }
        },
        company: {
            name: "company",
            catchPhrase: "phrase",
            bs: "bs"
        }
    };

    const updatedUser = {
        name: "Updated User",
        username: "updateduser",
        email: "updated@test.com",
        phone: "456",
        website: "updated.com",
        address: {
            street: "new street",
            suite: "new suite",
            city: "new city",
            zipcode: "456",
            geo: { lat: "30", lng: "40" }
        },
        company: {
            name: "new company",
            catchPhrase: "new phrase",
            bs: "new bs"
        }
    };

    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("GET /api/users returns users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/users creates a user", async () => {
        const res = await request(app).post("/api/users").send(newUser);

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test User");

        createdUserId = res.body.id;
        expect(createdUserId).toBeDefined();
    });

    it("POST /api/users with invalid data returns 400", async () => {
        const res = await request(app).post("/api/users").send({ name: "" });
        expect(res.statusCode).toBe(400);
    });

    it("PUT /api/users/:id updates the created user", async () => {
        const res = await request(app).put(`/api/users/${createdUserId}`).send(updatedUser);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Updated User");
        expect(res.body.address.city).toBe("new city");
    });

    it("PUT /api/users/:id with invalid id returns 400", async () => {
        const res = await request(app).put(`/api/users/invalidid`).send(updatedUser);
        expect(res.statusCode).toBe(400);
    });

    it("PUT /api/users/:id for non-existent user returns 404", async () => {
        const res = await request(app).put(`/api/users/999999`).send(updatedUser);
        expect(res.statusCode).toBe(404);
    });

    it("DELETE /api/users/:id deletes the created user", async () => {
        const res = await request(app).delete(`/api/users/${createdUserId}`);
        expect(res.statusCode).toBe(204);

        const getRes = await request(app).get("/api/users");
        const exists = getRes.body.some(u => u.id === createdUserId);
        expect(exists).toBe(false);
    });

    it("DELETE /api/users/:id with invalid id returns 400", async () => {
        const res = await request(app).delete("/api/users/invalidid");
        expect(res.statusCode).toBe(400);
    });

    it("DELETE /api/users/:id for non-existent user returns 404", async () => {
        const res = await request(app).delete("/api/users/999999");
        expect(res.statusCode).toBe(404);
    });
});