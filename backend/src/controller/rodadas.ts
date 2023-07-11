import { Request, Response } from "express";
import { prisma } from "../../prisma/client";

export const inserir = async (req: Request, res: Response) => {
  try {
    const {
      jogo1,
      jogo2,
      jogo3,
      jogo4,
      jogo5,
      jogo6,
      jogo7,
      jogo8,
      jogo9,
      jogo10,
    } = req.body;

    const rodadas = await prisma.rodada.create({
      data: {
        jogo1,
        jogo2,
        jogo3,
        jogo4,
        jogo5,
        jogo6,
        jogo7,
        jogo8,
        jogo9,
        jogo10,
      },
    });

    res.status(200).send({
      message: "Usuário inserido com sucesso",
      date: new Date(),
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao inserir o usuário",
      error: true,
      success: false,
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const rodadas = await prisma.rodada.findMany();

    res.status(200).send({
      message: "Listagem de Rodadas",
      data: rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao listar os Rodadas",
      error: true,
      success: false,
    });
  }
};

export const atualizar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      jogo1,
      jogo2,
      jogo3,
      jogo4,
      jogo5,
      jogo6,
      jogo7,
      jogo8,
      jogo9,
      jogo10,
    } = req.body;

    const rodadas = await prisma.rodada.update({
      where: {
        id: String(id),
      },
      data: {
        jogo1,
        jogo2,
        jogo3,
        jogo4,
        jogo5,
        jogo6,
        jogo7,
        jogo8,
        jogo9,
        jogo10,
      },
    });

    res.status(200).send({
      message: "Rodada atualizada com sucesso",
      data: rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar a rodada",
      error: true,
      success: false,
    });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rodadas = await prisma.rodada.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Rodada deletada com sucesso",
      data: rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao deletar a rodada",
      error: true,
      success: false,
    });
  }
};

export const buscar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rodadas = await prisma.rodada.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Rodada encontrada",
      data: rodadas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao buscar a rodada",
      error: true,
      success: false,
    });
  }
};
