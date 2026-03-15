import models, { sequelize } from "../database/models/index.js";

const { User, Location, Company } = models;

export const getAllUsers = async () => {
    const users = await User.findAll({ include: [Location, Company] });
    return users;
};

export const createUser = async (userData) => {

    const t = await sequelize.transaction();

    try {
        const { name, username, email, phone, website, address, company } = userData;

        const user = await User.create({ name, username, email, phone, website }, { transaction: t });

        await Location.create({
            userId: user.id,
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
            lat: address.geo.lat,
            lng: address.geo.lng
        }, { transaction: t });

        await Company.create({
            userId: user.id,
            name: company.name,
            catchPhrase: company.catchPhrase,
            bs: company.bs
        }, { transaction: t });

        await t.commit();

        return await User.findByPk(user.id, { include: [Location, Company] });

    } catch (err) {
        await t.rollback();
        throw err;
    }
};

export const updateUser = async (id, userData) => {

    const t = await sequelize.transaction();

    try {
        const { name, username, email, phone, website, address, company } = userData;

        const user = await User.findByPk(id, { transaction: t });
        if (!user) {
            await t.rollback();
            return null;
        }

        await user.update({ name, username, email, phone, website }, { transaction: t });

        await Location.update({
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
            lat: address.geo.lat,
            lng: address.geo.lng
        }, { where: { userId: id }, transaction: t });

        await Company.update({
            name: company.name,
            catchPhrase: company.catchPhrase,
            bs: company.bs
        }, { where: { userId: id }, transaction: t });

        await t.commit();

        return await User.findByPk(id, { include: [Location, Company] });

    } catch (err) {
        await t.rollback();
        throw err;
    }
};

export const deleteUser = async (id) => {
    const deleted = await User.destroy({ where: { id } });
    return deleted;
};