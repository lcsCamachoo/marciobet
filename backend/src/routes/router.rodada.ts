import { Router } from "express";

import {
  inserir,
  listar,
  atualizar,
  deletar,
  buscar,
  listarPremioFinal,
  atualizarPremioFinal,
} from "../controller/rodadas";

export const routerRodada = Router();

routerRodada.post("/rodada/inserir", inserir);

routerRodada.get("/rodada/listar", listar);

routerRodada.get(
  "/rodada/listar/premiofinal/:id",
  listarPremioFinal,
);

routerRodada.put(
  "/rodada/atualizar/premiofinal/:id",
  atualizarPremioFinal,
);

routerRodada.put("/rodada/atualizar/:id", atualizar);

routerRodada.delete("/rodada/deletar/:id", deletar);

routerRodada.get("/rodada/buscar/:id", buscar);
