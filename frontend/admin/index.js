const tabelaUsuario = document.getElementById("tabelaUsuario"),
  tbodyTabelaUsuario = tabelaUsuario.querySelector("tbody"),
  tabelaRodada = document.getElementById("tabelaRodada"),
  tbodyTabelaRodada = tabelaRodada.querySelector("tbody"),
  tabelaPontuacao = document.getElementById("tabelaPontuacao"),
  tbodyTabelaPontuacao = tabelaPontuacao.querySelector("tbody"),
  selectRodada = document.getElementById("selectRodada"),
  selectRodadaAtual = document.getElementById("selectRodadaAtual"),
  btnDefinirRodadaAtual = document.querySelector(".btnDefinirRodada");

let initTabelaUser = false;
let initTabelaRodada = false;
let initTabelaPontuacao = false;
let rodadaId = "";
let respostas = [];

const getRodadas = async () => {
  const response = await api.get("/rodada/listar");
  const rodadas = response.data.rodadas.reverse();
  rodadas.forEach((rodada) => {
    const option = document.createElement("option");
    option.value = rodada.id;
    option.innerHTML = rodada.nome;
    selectRodada.appendChild(option);
    selectRodadaAtual.appendChild(option.cloneNode(true));
  });
  return rodadas;
};
getRodadas();

const handleChangeSelectRodada = async () => {
  rodadaId = selectRodada.value;
  await showRespostas(true);
  await showRodadas(true);
};

selectRodada.addEventListener("change", handleChangeSelectRodada);

const getRodada = async () => {
  const response = await api.get("/rodada/listarUltima");
  rodadaId = response.data.rodada.id;
  return response.data.rodada;
};

const getUsuarios = async () => {
  const response = await api.get("/usuario/listar");
  return response.data.usuarios;
};

const getRespostas = async () => {
  const response = await api.get("/resposta/listarPorRodada/" + rodadaId);
  return response.data.respostas;
};

const getRodadaById = async (id) => {
  const response = await api.get("/rodada/buscar/" + id);
  return response.data.rodada;
};

const definirRodada = async () => {
  const response = await api.get("/rodada/definirAtual/" + rodadaId);
  await showRodadas(true);
}

const showRespostas = async (porId = false) => {
  let rodada = {};
  if (!porId) rodada = await getRodada();
  if (porId) rodada = await getRodadaById(rodadaId);
  const respostas = await getRespostas();

  tbodyTabelaPontuacao.innerHTML = "";

  const pontuacaoArray = respostas.map((resp) => {
    let pontuacaoFinal = 0;
    const pontuacao = {
      nome: resp.usuario.nomeCompleto,
      data: resp.criado,
      pontuacaoFinal: 0,
    };
    for (let i = 1; i <= 10; i++) {
      const key = `jogo${i}`;
      const jogo = rodada[key];
      const resposta = resp[key];
      const acerto = resposta == jogo;
      pontuacaoFinal += acerto ? 1 : 0;
      pontuacao[key] = acerto
        ? {
            acerto,
            icon: '<i class="fas fa-check success text-success"></i>',
          }
        : {
            acerto,
            icon: '<i class="fas fa-times error text-danger"></i>',
          };
    }
    pontuacao.pontuacaoFinal = pontuacaoFinal;
    return pontuacao;
  });
  pontuacaoArray.sort((a, b) => {
    if (a.pontuacaoFinal > b.pontuacaoFinal) return -1;
    if (a.pontuacaoFinal < b.pontuacaoFinal) return 1;
    return 0;
  });
  pontuacaoArray.forEach((resp, index) => {
    const i = index + 1;
    const data = new Date(resp.data).toLocaleString();
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${i}</td>
    <td>${resp.nome}</td>
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
    <td>${resp.pontuacaoFinal}</td>
    <td>${data}</td>
    `;
    tbodyTabelaPontuacao.appendChild(tr);
  });
  if (!initTabelaPontuacao)
    $(document).ready(() => {
      initTabelaPontuacao = true;
      $("#tabelaPontuacao").DataTable({
        responsive: true,
        fixedHeader: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
        },
      });
    });
  // document.querySelector(".c-loader").classList.add("hide");
  // document.querySelector(".tabelaPontuacao").classList.remove("hide");
};

const showRodadas = async (porId = false) => {
  let rodada = {};
  if (!porId) rodada = await getRodada();
  if (porId) rodada = await getRodadaById(rodadaId);
  rodadaId = rodada.id;
  tbodyTabelaRodada.innerHTML = "";
  const tr = document.createElement("tr");
  tr.innerHTML = `

            <td class="jogoRodada">${rodada.jogo1 || "Nulo"} </td>
            <td class="jogoRodada">${rodada.jogo2 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo3 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo4 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo5 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo6 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo7 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo8 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo9 || "Nulo"}</td>
            <td class="jogoRodada">${rodada.jogo10 || "Nulo"}</td>
            <td id="actionRodada"><button class="btn btn-primary" id="btnEditRodada" onclick="hcEditarRodada()">Editar rodada</button></td>
          `;
  tbodyTabelaRodada.appendChild(tr);
  if (!initTabelaRodada)
    $(document).ready(() => {
      initTabelaRodada = true;
      $("#tabelaRodada").DataTable({
        responsive: true,
        fixedHeader: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
        },
      });
    });
};

const showUsuarios = async () => {
  const usuarios = await getUsuarios();
  tbodyTabelaUsuario.innerHTML = "";
  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${usuario.nomeCompleto}</td>
            <td>${usuario.creditos}</td>
            <td>${usuario.chavePix}</td>
            <td>
              <button class="btn btn-primary" onclick="excluirUsuario('${usuario.id}')">Excluir Usuário</button>
            </td>
            <td>
              <button class="btn btn-primary" onclick="editarCredito('${usuario.id}')">Editar Crédito</button>
            </td>
          `;
    tbodyTabelaUsuario.appendChild(tr);
  });
  if (!initTabelaUser)
    $(document).ready(() => {
      initTabelaUser = true;
      $("#tabelaUsuario").DataTable({
        responsive: true,
        fixedHeader: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
        },
      });
    });
};
const submitRodadaAtual = async () => {
  const res = await api.put(`/rodada/definirAtual/${selectRodadaAtual.value }`);
  console.log(res)
}
btnDefinirRodadaAtual.addEventListener("click", submitRodadaAtual);


const hcEditarRodada = async () => {
  const jogosElement = document.querySelectorAll(".jogoRodada");
  const actionRodada = document.getElementById("actionRodada");
  jogosElement.forEach((jogo) => {
    jogo.setAttribute("contenteditable", "true");
  });
  // botao cancelar
  const btnCancel = document.createElement("button");
  btnCancel.setAttribute("onclick", "cancelarEdicaoRodada()");
  btnCancel.innerHTML = "Cancelar";
  btnCancel.classList.add("btn");
  btnCancel.classList.add("btn-primary");

  actionRodada.appendChild(btnCancel);
  // fim botao cancelar
  // botao editar
  const btnEditRodada = document.getElementById("btnEditRodada");
  btnEditRodada.innerHTML = "Salvar";
  btnEditRodada.setAttribute("onclick", "salvarRodadaEditada()");
  // fim botao editar
};

const cancelarEdicaoRodada = async () => {
  await showRodadas();
};

const salvarRodadaEditada = async () => {
  const jogosElement = document.querySelectorAll(".jogoRodada");
  const jogos = {};
  jogosElement.forEach((jogo, index) => {
    jogos[`jogo${index + 1}`] = jogo.innerHTML;
  });

  // Enviar a requisição para atualizar o crédito do usuário
  const res = await api.put("/rodada/atualizar/jogos/" + rodadaId, jogos);
  if (res.status === 200) {
    alert("Rodada atualizada com sucesso!");
    window.location.reload();
  }
};

const editarCredito = (userId) => {
  const creditos = prompt("Digite o novo valor de crédito:");
  if (creditos !== null) {
    // Enviar a requisição para atualizar o crédito do usuário
    api
      .put("/usuario/creditos/" + userId, { creditos })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o crédito:", error);
      });
  }
};

const excluirUsuario = (userId) => {
  if (confirm("Tem certeza que deseja excluir esse usuário?")) {
    // Enviar a requisição para excluir o usuário
    api
      .delete("/usuario/deletar/" + userId)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao excluir o usuário:", error);
      });
  }
};
const main = async () => {
  await showRodadas();
  await Promise.all([showUsuarios(), showRespostas()]);
};
main();
