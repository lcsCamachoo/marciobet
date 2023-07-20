const tabelaUsuario = document.getElementById("tabelaUsuario"),
  tbodyTabelaUsuario = tabelaUsuario.querySelector("tbody"),
  tabelaRodada = document.getElementById("tabelaRodada"),
  tbodyTabelaRodada = tabelaRodada.querySelector("tbody"),
  tabelaPontuacao = document.getElementById("tabelaPontuacao"),
  tbodyTabelaPontuacao = tabelaPontuacao.querySelector("tbody");

let rodadaId = "";

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

const showRespostas = async () => {
  const rodada = await getRodada();
  const respostas = await getRespostas();

  tbodyTabelaPontuacao.innerHTML = "";

  const pontuacaoArray = respostas.map((resp) => {
    let pontuacaoFinal = 0;
    console.log(resp);
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
            icon: '<i class="fas fa-check success"></i>',
          }
        : {
            acerto,
            icon: '<i class="fas fa-times error"></i>',
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
  console.log(pontuacaoArray);
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
  $(document).ready(() => {
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

const showRodadas = async () => {
  const rodada = await getRodada();
  rodadaId = rodada.id;
  tbodyTabelaRodada.innerHTML = "";
  const tr = document.createElement("tr");
  tr.innerHTML = `

            <td class="jogoRodada">${rodada.jogo1} </td>
            <td class="jogoRodada">${rodada.jogo2}</td>
            <td class="jogoRodada">${rodada.jogo3}</td>
            <td class="jogoRodada">${rodada.jogo4}</td>
            <td class="jogoRodada">${rodada.jogo5}</td>
            <td class="jogoRodada">${rodada.jogo6}</td>
            <td class="jogoRodada">${rodada.jogo7}</td>
            <td class="jogoRodada">${rodada.jogo8}</td>
            <td class="jogoRodada">${rodada.jogo9}</td>
            <td class="jogoRodada">${rodada.jogo10}</td>
            <td id="actionRodada"><button class="btn btn-primary" id="btnEditRodada" onclick="hcEditarRodada()">Editar rodada</button></td>
          `;
  tbodyTabelaRodada.appendChild(tr);
  $(document).ready(() => {
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
  $(document).ready(() => {
    $("#tabelaUsuario").DataTable({
      responsive: true,
      fixedHeader: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Portuguese-Brasil.json",
      },
    });
  });
};

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
  console.log(res);
  if (res.status === 200) {
    alert("Rodada atualizada com sucesso!");
    await main();
  }
};

const editarCredito = (userId) => {
  const creditos = prompt("Digite o novo valor de crédito:");
  if (creditos !== null) {
    // Enviar a requisição para atualizar o crédito do usuário
    api
      .put("/usuario/creditos/" + userId, { creditos })
      .then((response) => {
        console.log("Crédito atualizado com sucesso!");
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
        console.log("Usuário excluído com sucesso!");
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
