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
  const isLogged = idUser ? true : false;
  if (!isLogged) {
    window.location.href = "/login";
    return false;
  }
  return isLogged;
};

const getUser = async () => {
  const { idFormatado: id } = getIdUserCookie();
  const urlRender = "https://bet-marcio.onrender.com";
  const urlDev = "http://localhost:3777";
  const res = await fetch(`${urlDev}/usuario/buscar/` + id);
  const resJson = await res.json();
  const { usuario } = resJson;
  console.log(resJson);
  return usuario;
};

const verificaRole = (usuario) => {
  if (!usuario) return false;
  const isAdm = usuario.role == "ADMIN";
  return isAdm;
};

const validacaoInicial = async () => {
  verificaLogin();
  const usuario = await getUser();
  const idAdm = verificaRole(usuario);
  if (!idAdm) {
    window.location.href = "/login";
    return;
  }
  document.querySelector("body").classList.remove("hide");
};
validacaoInicial();
