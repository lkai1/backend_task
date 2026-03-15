import * as userService from "../services/usersServices.js";
import { transformUser } from "../utils/transformUser.js";
import { validateUserData, validateUserId } from "../utils/validateUser.js"

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users.map(u => transformUser(u)));
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const createUser = async (req, res) => {
    try {
        const isValid = validateUserData(req.body);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid data." });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json(transformUser(user));
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const updateUser = async (req, res) => {
    try {

        const userId = req.params.id
        const isValidUserData = validateUserData(req.body);
        const isValidUserId = validateUserId(userId)

        if (!isValidUserData || !isValidUserId) {
            return res.status(400).json({ message: "Invalid data." });
        }

        const user = await userService.updateUser(userId, req.body);
        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json(transformUser(user));
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const deleteUser = async (req, res) => {
    try {

        const userId = req.params.id
        const isValidUserId = validateUserId(userId)

        if (!isValidUserId) {
            return res.status(400).json({ message: "Invalid user id." });
        }

        const deleted = await userService.deleteUser(userId);
        if (!deleted) return res.status(404).json({ message: "User not found." });
        res.status(204).send({ message: "User deleted." });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error!" });
    }
};