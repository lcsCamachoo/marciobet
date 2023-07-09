import { Request, Response } from "express";

export const inserir = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    console.log(nome, email, senha);

    res.status(200).send("Usuário inserido com sucesso");
  } catch (error) {
    // res.status(400).send(error.message);
  }
};

export const listar = async (req: Request, res: Response) => {};

export const atualizar = async (req: Request, res: Response) => {};

export const deletar = async (req: Request, res: Response) => {};

export const buscar = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {};
