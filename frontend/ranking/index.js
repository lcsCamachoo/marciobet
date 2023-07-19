const username = document.querySelector(".username");
const saldo = document.querySelector(".saldo");
const tbodyTabelaPontuacao = document.querySelector("#tabelaPontuacao tbody");
let rodadaId = "";

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

  return isLogged;
};

const getUsuario = async () => {
  verificaLogin();
  const { idFormatado: id } = getIdUserCookie();
  const response = await api.get("/usuario/buscar/" + id);
  return response.data.usuario;
};

const getRespostas = async () => {
  const response = await api.get("/resposta/listarPorRodada/" + rodadaId);
  return response.data.respostas;
};

const getRodada = async () => {
  const response = await api.get("/rodada/listarUltima");
  rodadaId = response.data.rodada.id;

  return response.data.rodada;
};

const showRespostas = async () => {
  const rodada = await getRodada();
  const respostas = await getRespostas();

  tbodyTabelaPontuacao.innerHTML = "";

  const pontuacaoArray = respostas.map((resp) => {
    let pontuacaoFinal = 0;
    const pontuacao = {};

    for (let i = 1; i <= 10; i++) {
      const key = `jogo${i}`;
      const jogo = rodada[key];
      const resposta = resp[key];
      const acerto = resposta == jogo;
      pontuacaoFinal += acerto ? 1 : 0;
      pontuacao[key] = acerto
        ? {
            nome: resp.usuario.nomeCompleto,

            pontuacaoFinal,
            acerto,
            icon: '<i class="fas fa-check success"></i>',
          }
        : {
            nome: resp.usuario.nomeCompleto,

            pontuacaoFinal,
            acerto,
            icon: '<i class="fas fa-times error"></i>',
          };
    }
    return pontuacao;
  });
  pontuacaoArray.sort((a, b) => {
    if (a.jogo10.pontuacaoFinal > b.jogo10.pontuacaoFinal) return -1;
    if (a.jogo10.pontuacaoFinal < b.jogo10.pontuacaoFinal) return 1;
    return 0;
  });
  pontuacaoArray.forEach((resp, index) => {
    const i = index + 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${i}</td>
    <td>${resp.jogo1.nome}</td>
    <td>${resp.jogo1.icon}</td>
    <td>${resp.jogo2.icon}</td>
    <td>${resp.jogo3.icon}</td>
    <td>${resp.jogo4.icon}</td>
    <td>${resp.jogo5.icon}</td>
    <td>${resp.jogo6.icon}</td>
    <td>${resp.jogo7.icon}</td>
    <td>${resp.jogo8.icon}</td>
    <td>${resp.jogo9.icon}</td>
    <td>${resp.jogo10.icon}</td>
    <td>${resp.jogo10.pontuacaoFinal}</td>
    `;
    tbodyTabelaPontuacao.appendChild(tr);
  });
  $(document).ready(() => {
    $("#tabelaPontuacao").DataTable({
      responsive: true,
      fixedHeader: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
      },
    });
  });
  document.querySelector(".c-loader").classList.add("hide");
  document.querySelector(".tabelaPontuacao").classList.remove("hide");
};

const main = async () => {
  await Promise.all([showRespostas()]);
};
main();
