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
  definirAtual,
  findAtual,
  inserirJogos,
  listarJogosRodadaAtual
} from "../controller/rodadas";

export const routerRodada = Router();

routerRodada.post("/rodada/inserir", inserir);

routerRodada.post("/rodada/inserirJogos", inserirJogos);

routerRodada.get("/rodada/listarUltima", buscarUltimaRodada);

routerRodada.get("/rodada/listarJogosRodadaAtual", listarJogosRodadaAtual);

routerRodada.get("/rodada/buscarAtual", findAtual);

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

routerRodada.put("/rodada/definirAtual/:id", definirAtual)

routerRodada.delete("/rodada/deletar/:id", deletar);
