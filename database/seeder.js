import axios from "axios";
import models, { sequelize } from "./models/index.js";

export default async function seedUsers() {
    const count = await models.User.count();

    if (count > 0) return;

    const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
    );

    for (const u of data) {
        const t = await sequelize.transaction();

        try {
            const user = await models.User.create({
                name: u.name,
                username: u.username,
                email: u.email,
                phone: u.phone,
                website: u.website
            }, { transaction: t });

            await models.Location.create({
                userId: user.id,
                street: u.address.street,
                suite: u.address.suite,
                city: u.address.city,
                zipcode: u.address.zipcode,
                lat: u.address.geo.lat,
                lng: u.address.geo.lng
            }, { transaction: t });

            await models.Company.create({
                userId: user.id,
                name: u.company.name,
                catchPhrase: u.company.catchPhrase,
                bs: u.company.bs
            }, { transaction: t });

            await t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    console.log("Seeded initial users");
}