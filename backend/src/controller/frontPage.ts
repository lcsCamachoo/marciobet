import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { FrontPage } from "@prisma/client";

export const inserir = async (req: Request<FrontPage>, res: Response) => {
    try {
        const resposta = await prisma.frontPage.create({
        data: req.body,
        });
        res.status(201).json(resposta);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const atualizar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resposta = await prisma.frontPage.update({
        where: { id },
        data: req.body,
        });
        res.status(200).json(resposta);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const listar = async (req: Request, res: Response) => {
    try {
        const resposta = await prisma.frontPage.findMany();
        res.status(200).json(resposta);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const listarPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const resposta = await prisma.frontPage.findUnique({
        where: { id },
        });
        res.status(200).json(resposta);
    } catch (error) {
        res.status(400).json(error);
    }
}