import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import {
  comparePasswords,
  hashPassword,
} from "../utils/criptografia";
import { gerarToken } from "../utils/gerarToken";

export const alterarCreditos = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { creditos } = req.body;

    const usuario = await prisma.usuario.update({
      where: {
        id: String(id),
      },
      data: {
        creditos: Number(creditos),
      },
    });

    res.status(200).send({
      message: "Créditos alterados com sucesso",
      data: usuario,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: "Ocorreu um erro ao alterar os créditos",
      error: true,
      success: false,
    });
  }
};

export const inserir = async (req: Request, res: Response) => {
  try {
    const { nomeCompleto, email, senha, chavePix, apelido } =
      req.body;
    console.log(nomeCompleto, email, senha);

    const usuario = await prisma.usuario.create({
      data: {
        nomeCompleto,
        email,
        senha: await hashPassword(senha),
        apelido,
        chavePix,
        creditos: 0,
        role: req.body.role || "USER",
      },
    });

    res.status(200).send({
      message: "Usuário inserido com sucesso",
      date: new Date(),
      response: usuario,
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
      usuarios,
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
      usuario: usuario,
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
      usuario: usuario,
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
      include: {
        Respostas: true,
      },
    });

    if (usuario) {
      res.status(200).send({
        message: "Usuário encontrado",
        usuario: usuario,
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
    console.log(email, senha);
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });
    if (!usuario)
      return res.status(400).send({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    const senhaCorreta = await comparePasswords(
      senha,
      usuario.senha,
    );
    if (senhaCorreta) {
      const token = gerarToken(usuario.id);
      res.header("auth-token-bet-legal", token);
      res.cookie("auth-token-bet-legal", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      res.status(200).send({
        message: "Login realizado com sucesso",
        usuario: usuario,
        token,
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
