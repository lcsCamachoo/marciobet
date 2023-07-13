import { Router } from "express";

import {
  inserir,
  listar,
  atualizar,
  deletar,
  buscar,
  listarPremioFinal,
  atualizarPremioFinal,
  buscarUltimaRodada,
  atualizarJogos,
} from "../controller/rodadas";

export const routerRodada = Router();

routerRodada.post("/rodada/inserir", inserir);

routerRodada.get("/rodada/listarUltima", buscarUltimaRodada);

routerRodada.get("/rodada/listar", listar);

routerRodada.get("/rodada/buscar/:id", buscar);

routerRodada.get(
  "/rodada/listar/premiofinal/:id",
  listarPremioFinal,
);

routerRodada.put(
  "/rodada/atualizar/premiofinal/:id",
  atualizarPremioFinal,
);

routerRodada.put("/rodada/atualizar/:id", atualizar);

routerRodada.put("/rodada/atualizar/jogos/:id", atualizarJogos);

routerRodada.delete("/rodada/deletar/:id", deletar);
