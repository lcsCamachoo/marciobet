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
      usuarioId,
    } = req.body;

    const resposta = await prisma.respostas.create({
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
        usuario: {
          connect: {
            id: usuarioId,
          },
        },
      },
    });

    res.status(200).send({
      message: "Usuário inserido com sucesso",
      date: new Date(),
      response: resposta,
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
    const respostas = await prisma.respostas.findMany();

    res.status(200).send({
      message: "Listagem de usuários",
      data: respostas,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao listar os usuários",
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

    const resposta = await prisma.respostas.update({
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
      message: "Resposta atualizado com sucesso",
      date: new Date(),
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar a Resposta",
      error: true,
      success: false,
    });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resposta = await prisma.respostas.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Resposta deletado com sucesso",
      date: new Date(),
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao deletar a Resposta",
      error: true,
      success: false,
    });
  }
};

export const buscar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resposta = await prisma.respostas.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Resposta encontrado com sucesso",
      data: resposta,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao buscar a Resposta",
      error: true,
      success: false,
    });
  }
};
