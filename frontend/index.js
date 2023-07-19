//variables
let usuario = {};
let premioFinalNumber = 0;
let rodadaId = "";

const premioFinalElement = document.querySelector("#premioFinal");
const cred = document.querySelector("#creditos");
const userNameElement = document.querySelector("#userName");
const userContainerElement = document.querySelector(".userContainer");
const headerContainerElement = document.querySelector(".headerContainer");
const btnLogoutElement = document.querySelector("#btnLogout");
const enviarBtn = document.querySelector("#btnEnviar");

//utils
const getCookies = () => {
  const cookies = document.cookie.split(";");
  return cookies;
};

const getIdUserCookie = () => {
  const cookies = getCookies();
  const idUser = cookies.find((item) => item.includes("id-user"));
  if (!idUser) return { idFormatado: null, idUser: null };
  const idFormatado = idUser.substring(9);
  return { idFormatado, idUser };
};

const verificaLogin = () => {
  const { idUser } = getIdUserCookie();
  return idUser ? true : false;
};

const logout = () => {
  document.cookie = "id-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "token-bet=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  usuario = {};
  window.location.reload();
};

//gets
const getUltimaRodada = async () => {
  const res = await api.get("/rodada/listarUltima");
  rodadaId = res.data.rodada.id;
  return res.data.rodada;
};

const getUsuario = async () => {
  const isLogged = verificaLogin();
  const loader = document.querySelector(".custom-loader");
  if (!isLogged) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttonsContainer");
    const buttonLogin = document.createElement("button");
    const buttonCadastro = document.createElement("button");
    buttonLogin.innerHTML = "Login";
    buttonCadastro.innerHTML = "Cadastro";
    buttonLogin.className = "btnLogin btn btn-primary";
    buttonCadastro.className = "btnCadastro btn btn-primary";
    loader.classList.add("hide");
    headerContainerElement.appendChild(buttonsContainer);
    buttonsContainer.appendChild(buttonLogin);
    buttonsContainer.appendChild(buttonCadastro);
    buttonLogin.addEventListener("click", () => {
      window.location.href = "/login";
    });
    buttonCadastro.addEventListener("click", () => {
      window.location.href = "/register";
    });
    return;
  }
  document.querySelector("#btnLinkPerfil").classList.remove("hide");
  loader.classList.add("hide");
  userContainerElement.style.display = "flex";

  const { idFormatado } = getIdUserCookie();
  const res = await api.get("/usuario/buscar/" + idFormatado);
  usuario = res.data.usuario;
  cred.innerHTML = `Créditos: ${usuario.creditos}`;
  userNameElement.innerHTML = usuario.apelido;
};

const getPremioFinal = async () => {
  const res = await api.get("/rodada/listar/premiofinal/" + rodadaId);
  console.log(res);
  const premioFinal = res.data.premioFinal;
  const premioFinalFormatado = premioFinal.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  premioFinalElement.innerHTML = premioFinalFormatado;
  premioFinalNumber = premioFinal;
};

const getRespostas = () => {
  const options = document.querySelectorAll(".options");
  const respostas = {};
  options.forEach((option, index) => {
    const time1Input = option.querySelector(".time1Input");
    const empateInput = option.querySelector(".empateInput");
    const time2Input = option.querySelector(".time2Input");
    if (time1Input.checked) {
      respostas["jogo" + index] = time1Input.value;
    } else if (empateInput.checked) {
      respostas["jogo" + index] = empateInput.value;
    } else if (time2Input.checked) {
      respostas["jogo" + index] = time2Input.value;
    }
  });

  return respostas;
};

//edits
const editarPremio = async (premioFinal) => {
  const res = await api.put("/rodada/atualizar/premioFinal/" + rodadaId, {
    premioFinal,
  });
  console.log(res);
};

const editarCredito = async (userId, creditosUsuario) => {
  // Enviar a requisição para atualizar o crédito do usuário
  const res = await api.put("/usuario/creditos/" + userId, {
    creditos: creditosUsuario - 5,
  });
  console.log(res);
};

//posts
const enviarRespostas = async () => {
  const { idUser, idFormatado } = getIdUserCookie();
  if (!idUser) {
    alert("Você precisa estar logado para enviar as respostas!");
    return;
  }

  const respostas = getRespostas();
  const respostasLength = Object.keys(respostas).length;
  if (respostasLength < 10) {
    alert("Você precisa responder todas as perguntas!");
    return;
  }

  if (usuario.creditos < 5) {
    alert("Você não possui créditos suficientes para apostar!");
    return;
  }
  await Promise.all([
    api.post("/resposta/inserir", {
      respostas,
      usuarioId: idFormatado,
      rodadaId,
    }),
    editarPremio(premioFinalNumber + 2),
    editarCredito(idFormatado, usuario.creditos),
    getUsuario(),
    getPremioFinal(),
  ]);
  alert("Respostas enviadas com sucesso!");
  window.location.href = "/user";
};

//first load
const main = async () => {
  await getUltimaRodada();
  await Promise.all([getUsuario(), getPremioFinal()]);
};

//events
enviarBtn.addEventListener("click", enviarRespostas);
btnLogoutElement.addEventListener("click", logout);
window.addEventListener("load", main);

//utils
const addEventToClickOption = () => {
  const option = document.querySelectorAll(".option");
  option.forEach((option) => {
    option.addEventListener("click", (e) => {
      const input = option.querySelector("input");
      if (input.checked) {
        input.checked = false;
        toogleColorOption();
        return;
      }
      input.checked = true;
      toogleColorOption();
    });
  });
};
const toogleColorOption = () => {
  const option = document.querySelectorAll(".option");
  option.forEach((option) => {
    const input = option.querySelector("input");
    if (input.checked) {
      option.classList.add("checked");
      return;
    }
    option.classList.remove("checked");
  });
};
addEventToClickOption();
