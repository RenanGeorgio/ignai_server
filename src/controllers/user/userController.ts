import { NextFunction, Response } from "express";
import { CustomRequest } from "../../helpers/customRequest";
import User from "../../models/user/userModel";
import authApi from "../../services/authApi";
import { isValid } from "../../helpers/validCpfCnpj";
import SessionService from "../../services/sessionService";

export const info = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(403).send({ message: "Unauthorized" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).send({ message: "Unauthorized" });
        }
        const info = {
            _id: user._id,
            name: user.name,
            company: user.company,
            companyId: user.companyId,
            email: user.email
        }
        return res.status(200).send(info);
    } catch (error) {
        next(error);
    }
};

export const find = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(501).send({ message: "Not implemented" });
    } catch (error) {
        next(error);
    }
};

export const list = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(501).send({ message: "Not implemented" });
    } catch (error) {
        next(error);
    }
};

export const create = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!isValid(req.body.cpf)) {
            return res.status(400).send({ message: "Invalid CPF or CNPJ" });
        }
        const { email, password, key, cpf, name } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send({ message: "Usuário já cadastrado." });
        }
        const response = await authApi("/ignai_clients", {
            method: "POST",
            data: {
                username: email,
                password: password,
                key: key,
                cpf: cpf,
            },
        });
        if (response.status === 201) {
            const newUser = await User.create({
                email,
                name,
                cpf,
                company: response.data.company,
                companyId: response.data.company_id,
            });
            const { token, refreshToken } = await SessionService({
              userId: newUser._id,
              name,
            });
            return res.status(200).send({ token });
        } else {
            return res.status(400).send(response.data);
        }
    } catch (error) {
        next(error);
    }
};

export const update = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(403).send({ message: "Update unauthorized" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).send({ message: "Unauthorized" });
        }
        const conflict = await User.findOne({
            name: req.body.name,
            _id: { $ne: req.params.id },
        });
        if (conflict) {
            return res.status(400).send({ message: "User with this name already exists" });
        }
        const client = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf
            },
            { new: true }
        );
        return res.status(201).send({ client });
    } catch (error) {
        next(error);
    }
};

export const del = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(501).send({ message: "Not implemented" });
    } catch (error) {
        next(error);
    }
};