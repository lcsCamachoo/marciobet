import { Router } from "express";

import {
  inserir,
  listar,
  atualizar,
  deletar,
  buscar,
  login,
} from "../controller/usuario";

export const routerUsuario = Router();

routerUsuario.post("/usuario/inserir", inserir);

routerUsuario.get("/usuario/listar", listar);

routerUsuario.put("/usuario/atualizar/:id", atualizar);

routerUsuario.delete("/usuario/deletar/:id", deletar);

routerUsuario.get("/usuario/buscar/:id", buscar);

routerUsuario.post("/usuario/login", login);
