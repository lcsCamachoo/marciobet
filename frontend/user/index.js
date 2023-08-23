const username = document.querySelector(".username");
const saldo = document.querySelector(".saldo");
const tbodyTabelaPontuacao = document.querySelector("#tabelaPontuacao tbody");
let usuario = {};

const copyPix = async () => {
  const codePix = document.getElementById("codePix");
  const codePixText = codePix.innerText;
  await navigator.clipboard.writeText(codePixText);
  alert("Código copiado com sucesso!");
};
//utils
const inserirCredito = (valor) => {
  // Aqui você pode adicionar a lógica para processar a inserção de crédito
  // Pode ser uma requisição AJAX para o servidor ou qualquer outra ação necessária
  const codePixContainer = document.getElementById("codePixContainer");
  const loader = document.querySelector(".c-modal-loader");
  codePixContainer.classList.remove("hide");
  loader.classList.add("hide");
  codePixContainer.addEventListener("click", copyPix);
  const codigoPixElement = document.getElementById("codePix");
  const link = getLinkWhatsapp(usuario, valor, "inserção de crédito");
  window.open(link, "_blank");

  if (valor == 10) {
    codigoPixElement.innerHTML = `00020126580014BR.GOV.BCB.PIX013655f384af-8aa0-431a-9b56-7655ebc1919c520400005303986540510.005802BR5925MARCIO MARQUES DE SOUZA 06009SAO PAULO61080540900062250521z1qv6VVSa8bJmGZ12zebu6304D4BF`;
    return;
  }
  if (valor == 50) {
    codigoPixElement.innerHTML = `00020126580014BR.GOV.BCB.PIX013655f384af-8aa0-431a-9b56-7655ebc1919c520400005303986540550.005802BR5925MARCIOMARQUES DE SOUZA 06009SAO PAULO61080540900062250521og3gJmHjP0gXPJt12zebu630453B0`;
    return;
  }
  if (valor == 100) {
    codigoPixElement.innerHTML = `00020126580014BR.GOV.BCB.PIX013655f384af-8aa0-431a-9b56-7655ebc1919c5204000053039865406100.005802BR5925MARCIO MARQUES DE SOUZA 06009SAO PAULO61080540900062250521qkQ3BZmiaWqbnCj12zebu63047CA3`;
    return;
  }
};

const sacarSaldo = () => {
  // Aqui você pode adicionar a lógica para processar o saque de saldo
  // Pode ser uma requisição AJAX para o servidor ou qualquer outra ação necessária
  const valor = window.prompt("Digite o valor que deseja sacar");
  if (!valor) return;
  if (valor > usuario.creditos) return alert("Saldo insuficiente");
  const link = getLinkWhatsapp(usuario, valor, "saque");
  window.open(link, "_blank");
  // Redirecionar o usuário para a página desejada após o saque de saldo
};
const getCookies = () => {
  const cookies = document.cookie.split(";");
  return cookies;
};

const mostrarOpcoes = () => {
  const opcoesDiv = document.getElementById("opcoes");
  opcoesDiv.classList.toggle("hide");
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

const getLinkWhatsapp = (usuario, valor, operacao) => {
  const link = `
      https://api.whatsapp.com/send?phone=5581999438465&text=Solicitação%20de%20${operacao}\n\r%20Pix:${usuario.chavePix}\n\r%20Email:${usuario.email}\n\r%20Nome:${usuario.nomeCompleto}\r\n%20Apelido:${usuario.apelido}\r\n%20Valor:${valor}%20
      `;
  return link;
};

const getUsuario = async () => {
  verificaLogin();
  const { idFormatado: id } = getIdUserCookie();
  const response = await api.get("/usuario/buscar/" + id);
  const _usuario = response.data.usuario;
  usuario = _usuario;
  return _usuario;
};

const showUsuario = async () => {
  const usuario = await getUsuario();
  username.innerHTML = "Bem-vindo, " + usuario.nomeCompleto + "!";
  saldo.innerHTML = "Seu saldo de créditos: " + usuario.creditos;
};

const getRespostas = async () => {
  const usuario = await getUsuario();
  return usuario;
};

const getRodada = async () => {
  const response = await api.get("/rodada/buscarAtual");
  return response.data.rodada;
};

const showRespostas = async () => {
  const { Respostas: respostas } = await getRespostas();
  const rodada = await getRodada();

  tbodyTabelaPontuacao.innerHTML = "";

  const pontuacaoArray = respostas.map((resp) => {
    let pontuacaoFinal = 0;
    const pontuacao = {
      data: resp.criado,
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
      pontuacao.pontuacaoFinal = pontuacaoFinal;
    }
    return pontuacao;
  });

  pontuacaoArray.sort((a, b) => {
    return new Date(a.data) - new Date(b.data);
  });

  pontuacaoArray.forEach((resp, index) => {
    const data = new Date(resp.data).toLocaleString();
    console.log();
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${data}</td>
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
  setTimeout(() => {
    document.querySelector(".c-loader").classList.add("hide");
    document.querySelector(".tabelaPontuacao").classList.remove("hide");
  }, 1000);
};

const main = async () => {
  const isLogged = verificaLogin();
  if (!isLogged) {
    window.location.href = "/login";
    return;
  }
  document.querySelector("body").classList.remove("hide");
  await Promise.all([showUsuario(), showRespostas()]);
};
main();
