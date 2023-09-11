//imports
import express from "express";
import cors from "cors";
import { routerUsuario } from "./routes/router.usuario";
import { routerRodada } from "./routes/router.rodada";
import { routerResposta } from "./routes/router.resposta";
import { routerFrontPage } from "./routes/router.frontPage";


//app
const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use(routerUsuario);
app.use(routerRodada);
app.use(routerResposta);
app.use(routerFrontPage);

//teste
app.listen(3777, () => {
  console.log("Server running on port 3777");
});
