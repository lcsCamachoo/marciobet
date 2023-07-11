import { Router } from "express";

import {
  inserir,
  listar,
  atualizar,
  deletar,
  buscar,
} from "../controller/rodadas";

export const routerRodada = Router();

routerRodada.post("/rodada/inserir", inserir);

routerRodada.get("/rodada/listar", listar);

routerRodada.put("/rodada/atualizar/:id", atualizar);

routerRodada.delete("/rodada/deletar/:id", deletar);

routerRodada.get("/rodada/buscar/:id", buscar);
