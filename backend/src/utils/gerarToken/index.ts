import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const gerarToken = (usuarioId: string) => {
  const segredo = process.env.SECRET || "segredo"; // Chave secreta para assinar o token (deve ser mantida em segredo)
  const token = jwt.sign({ id: usuarioId }, segredo, {
    expiresIn: "24hr",
  }); // Gera o token com uma validade de 1 hora

  return token;
};
