import { Router } from "express";

import {
  inserir,
  listar,
  atualizar,
  deletar,
  buscar,
} from "../controller/respostas";

export const routerResposta = Router();

routerResposta.post("/resposta/inserir", inserir);

routerResposta.get("/resposta/listar", listar);

routerResposta.put("/resposta/atualizar/:id", atualizar);

routerResposta.delete("/resposta/deletar/:id", deletar);

routerResposta.get("/resposta/buscar/:id", buscar);
