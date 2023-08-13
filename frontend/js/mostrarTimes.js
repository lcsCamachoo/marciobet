const times = {
  PALMEIRAS: {
    img: "https://static.wixstatic.com/media/83bf78_bfe37adf863e43c5a089447624e7925d~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-sociedade-esportiva-palmeiras-campeonato-brasileiro-serie-a-campeonato-pau.png",
  },
  CUIABÁ: {
    img: "https://static.wixstatic.com/media/83bf78_752b1705061247279959cc273043ccfd~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Escudo-Cuiaba-Png.png",
  },
  FLUMINENSE: {
    img: "https://static.wixstatic.com/media/83bf78_82a4ee4cdfbc4bc29632d9f4cfc3b286~mv2.png/v1/fill/w_67,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-fluminense-fc-fluminense-de-feira-futebol-clube-sociedade-desportiva-juaze.png",
  },
  "AMÉRICA-MG": {
    img: "https://static.wixstatic.com/media/83bf78_96addafcc464441d9aaaaddedd173af5~mv2.png/v1/fill/w_66,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-america-futebol-clube-minas-gerais-campeonato-mineiro-campeonato-brasileir.png",
  },
  "SÃO PAULO": {
    img: "https://static.wixstatic.com/media/83bf78_198b745b16bf415f95199610c7301dbd~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-sao-paulo-f-c-hd-logo-thumbnail.png",
  },
  BOTAFOGO: {
    img: "https://static.wixstatic.com/media/83bf78_565c842723f8437b8b3a88878990199b~mv2.png/v1/fill/w_67,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-black-and-white-star-sheild-illustration-botafogo-de-futebol-e-regatas-dre.png",
  },
  BRAGANTINO: {
    img: "https://static.wixstatic.com/media/83bf78_79b5070acbb9423e92d558659270b640~mv2.png/v1/crop/x_49,y_17,w_147,h_132/fill/w_101,h_91,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/83bf78_79b5070acbb9423e92d558659270b640~mv2.png",
  },
  BAHIA: {
    img: "https://static.wixstatic.com/media/83bf78_48507a0e4df54aa3af34f90c87d7fd13~mv2.png/v1/crop/x_0,y_9,w_337,h_319/fill/w_82,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-esporte-clube-bahia-esporte-clube-vitoria-campeonato-brasileiro-serie-a-ca.png",
  },
  GOIÁS: {
    img: "https://static.wixstatic.com/media/83bf78_3dc930f83e654d32a56cee7fd99f7c5f~mv2.png/v1/crop/x_60,y_20,w_134,h_134/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/goias-esporte-clube-250x170.png",
  },
  "ATHLETICO-PR": {
    img: "https://static.wixstatic.com/media/83bf78_7d51e289ba8444dba144374a4d5db6eb~mv2.png/v1/fill/w_58,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/83bf78_7d51e289ba8444dba144374a4d5db6eb~mv2.png",
  },
  FORTALEZA: {
    img: "https://static.wixstatic.com/media/83bf78_ce9ffbbc28234c81bdbd6b95fecbaf21~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-fortaleza-esporte-clube-de-fortaleza-ce-hd-logo-thumbnail.png",
  },
  "INTER-RS": {
    img: "https://static.wixstatic.com/media/83bf78_9a8cccc5b7594fa7955e7418486824c2~mv2.png/v1/fill/w_79,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-sport-club-internacional-estadio-beira-rio-campeonato-brasileiro-serie-a-g.pngg",
  },
  "ATLÉTICO-MG": {
    img: "https://static.wixstatic.com/media/83bf78_9db7dea72dfa4c5f954594a36cfed188~mv2.png/v1/fill/w_64,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-clube-atletico-mineiro-campeonato-mineiro-belo-horizonte-campeonato-brasil.png",
  },
  VASCO: {
    img: "https://frontendapiapp.blob.core.windows.net/images/88x88/vasco.png",
  },
  FLAMENGO: {
    img: "https://static.wixstatic.com/media/83bf78_224be6a875fa4be49489d316ee2ad2ec~mv2.png/v1/fill/w_63,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-black-and-red-striped-shield-logo-clube-de-regatas-do-flamengo-flamengo-ba.png",
  },
  CORITIBA: {
    img: "https://static.wixstatic.com/media/83bf78_fd87f937a6304c4c86250dad6fd7227e~mv2.png/v1/crop/x_4,y_0,w_352,h_359/fill/w_76,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-coritiba-hd-logo-thumbnail.png",
  },
  CORINTHIANS: {
    img: "https://static.wixstatic.com/media/83bf78_259b114ad40c4a16933f0fc20cbfccc2~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-sport-club-corinthians-paulista-corinthians-arena-esporte-clube-corinthian.png",
  },
  CRUZEIRO: {
    img: "https://static.wixstatic.com/media/83bf78_4b79f62bd7644775a26231fb47e69641~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-cruzeiro-esporte-clube-parana-clube-2018-campeonato-brasileiro-serie-a-bra.png",
  },
  GRÊMIO: {
    img: "https://static.wixstatic.com/media/83bf78_f02b88d3ae1c4b66ad769a254288e6c7~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-gremio-hd-logo-thumbnail.png",
  },
  SANTOS: {
    img: "https://static.wixstatic.com/media/83bf78_12e7eda0cabc44ab9f862da75c98dd24~mv2.png/v1/fill/w_78,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-santos-fc-santos-sao-paulo-esporte-clube-bahia-sport-club-corinthians-paul.png",
  },
  INTERNACIONAL: {
    img: "https://static.wixstatic.com/media/83bf78_9a8cccc5b7594fa7955e7418486824c2~mv2.png/v1/fill/w_79,h_78,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/png-transparent-sport-club-internacional-estadio-beira-rio-campeonato-brasileiro-serie-a-g.png",
  },
};
const jogo1 = {
  dia: "SÁBADO 12 DE AGOSTO",
  desc: "JOGO-1 SÁB 12/08/2023 NILTON SANTOS (ENGENHÃO) 21:00",
  horario: "21:00",
  time1: "BOTAFOGO",
  time2: "INTERNACIONAL",
};
const jogo2 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-2 DOM 13/08/2023 MINEIRÃO 11:00",
  horario: "11:00",
  time1: "ATLÉTICO-MG",
  time2: "BAHIA",
};
const jogo3 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-3 DOM 13/08/2023 NEO QUÍMICA ARENA 16:00",
  horario: "16:00",
  time1: "CORINTHIANS",
  time2: "CORITIBA",
};
const jogo4 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-4 DOM 13/08/2023 ARENA DO GRÊMIO 16:00",
  horario: "16:00",
  time1: "GRÊMIO",
  time2: "FLUMINENSE",
};

const jogo5 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-5 DOM 13/08/2023 INDEPENDÊNCIA 16:00",
  horario: "16:00",
  time1: "AMÉRICA-MG",
  time2: "GOIÁS",
};
const jogo6 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-6 DOM 13/08/2023 MARACANÃ 18:30",
  horario: "18:30",
  time1: "FLAMENGO",
  time2: "SÃO PAULO",
};
const jogo7 = {
  dia: "DOMINGO 13 DE AGOSTO",
  desc: "JOGO-7 DOM 13/08/2023 CASTELÃO (CE) 18:30",
  horario: "18:30",
  time1: "FORTALEZA",
  time2: "SANTOS",
};
const jogo8 = {
  dia: "SEGUNDA 14 DE AGOSTO",
  desc: "JOGO-8 SEG 14/08/2023 ALLIANZ PARQUE 19:00",
  horario: "19:00",
  time1: "PALMEIRAS",
  time2: "CRUZEIRO",
};
const jogo9 = {
  dia: "SEGUNDA 14 DE AGOSTO",
  desc: "JOGO-9 SEG 14/08/2023 ALLIANZ PARQUE 19:00",
  horario: "19:00",
  time1: "BRAGANTINO",
  time2: "VASCO",
};
const jogo10 = {
  dia: "TERÇA 15 DE AGOSTO",
  desc: "JOGO-10 TER 15/08/2023 LIGA ARENA 20:00",
  horario: "20:00",
  time1: "ATHLETICO-PR",
  time2: "CUIABÁ",
};

const getJogos = async () => {
  const res = await fetch("http://localhost:3777/rodada/listarJogosRodadaAtual");
  const data = await res.json();
  console.log(data);
  return data.jogos;
}
// const jogos = [
//   jogo1,
//   jogo2,
//   jogo3,
//   jogo4,
//   jogo5,
//   jogo6,
//   jogo7,
//   jogo8,
//   jogo9,
//   jogo10,
// ];

const questions = document.querySelector(".questions");
const questionModel = document.querySelector(".questionModel");

const showJogos = async () => {
  const jogos = await getJogos();
  jogos.forEach((jogo, index) => {
    const question = questionModel.cloneNode(true);
    question.querySelector(".dia").innerHTML = jogo.dia;
    if (index > 0) {
      if (jogo.dia === jogos[index - 1].dia) {
        question.querySelector(".dia").remove();
      } else {
        question.querySelector(".dia").innerHTML = jogo.dia;
      }
    }
    question.querySelector(".horario").innerHTML = `(${jogo.horario})`;
    question.querySelector(".indexJogo").innerHTML += String(
      " " + Number(index + 1)
    );
    question.querySelector(".time1Radio").innerHTML = jogo.time1;
    question.querySelector(".time2Radio").innerHTML = jogo.time2;
    question.querySelector(".labelTime1 img").src = times[jogo.time1].img;
    question.querySelector(".labelTime2 img").src = times[jogo.time2].img;
    question.querySelectorAll("input").forEach((input, indexInput) => {
      input.setAttribute("name", `question${index + 1}`);
      if (indexInput === 0) input.setAttribute("value", `${jogo.time1}`);

      if (indexInput === 2) input.setAttribute("value", `${jogo.time2}`);
    });
    question.classList.remove("questionModel");
    question.classList.add("question");
    question.setAttribute("id", `q${index + 1}`);
    questions.appendChild(question);
  });
};
showJogos();
