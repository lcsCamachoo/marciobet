import { Router } from "express";

import {
  inserir,
  atualizar,
  listar,
  listarPorId
} from "../controller/frontPage";

export const routerFrontPage = Router();

routerFrontPage.get("/frontpage/listar", listar);

routerFrontPage.get("/frontpage/listar/:id", listarPorId);

routerFrontPage.post("/frontpage/inserir", inserir);

routerFrontPage.put("/frontpage/atualizar/:id", atualizar);

