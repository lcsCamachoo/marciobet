//imports
import express from "express";
import cors from "cors";
import { routerUsuario } from "./routes/router.usuario";
import { routerRodada } from "./routes/router.rodada";
import { routerResposta } from "./routes/router.resposta";

//app
const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use(routerUsuario);
app.use(routerRodada);
app.use(routerResposta);

//teste
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
