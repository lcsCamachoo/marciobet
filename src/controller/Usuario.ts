import { Request, Response } from "express";
import { prisma } from "../../prisma/client";

export const inserir = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    console.log(nome, email, senha);

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
    const usuarios = await prisma.usuario.findMany();

    res.status(200).send({
      message: "Listagem de usuários",
      data: usuarios,
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
    const { nome, email, senha } = req.body;

    const usuario = await prisma.usuario.update({
      where: {
        id: String(id),
      },
      data: {
        nomeCompleto: nome,
        email: email,
        senha: senha,
      },
    });

    res.status(200).send({
      message: "Usuário atualizado com sucesso",
      data: usuario,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao atualizar o usuário",
      error: true,
      success: false,
    });
  }
};

export const deletar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).send({
      message: "Usuário deletado com sucesso",
      data: usuario,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao deletar o usuário",
      error: true,
      success: false,
    });
  }
};

export const buscar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findFirst({
      where: {
        id: String(id),
      },
    });

    if (usuario) {
      res.status(200).send({
        message: "Usuário encontrado",
        data: usuario,
        error: false,
        success: true,
      });
    } else {
      res.status(400).send({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao buscar o usuário",
      error: true,
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });

    if (usuario) {
      res.status(200).send({
        message: "Login realizado com sucesso",
        data: usuario,
        error: false,
        success: true,
      });
    } else {
      res.status(400).send({
        message: "Usuário ou senha inválidos",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao realizar o login",
      error: true,
      success: false,
    });
  }
};
