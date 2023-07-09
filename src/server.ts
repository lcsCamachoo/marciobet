//imports
import express from "express";
import cors from "cors";
import { routerUsuario } from "./routes/router.usuario";

//app
const app = express();
app.use(cors());
app.use(express.json());
app.use(routerUsuario);

//teste
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
