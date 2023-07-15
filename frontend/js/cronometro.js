// <div id="countdown"></div>

// Define a data final do cronômetro (1 hora a partir do momento em que a página é carregada)
const countDownDate = new Date("2023-07-25T15:59:59").getTime();

// Atualiza o cronômetro a cada segundo
const x = setInterval(() => {
  // Obtem a data atual
  const now = new Date().getTime();

  // Calcula a diferença entre a data final e a data atual
  const distance = countDownDate - now;

  // Calcula o tempo restante em dias, horas, minutos e segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Exibe o tempo restante em um elemento com o ID "countdown"
  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // Desabilita o botão de envio se o tempo acabou
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("submit").disabled = true;
    document.getElementById("countdown").innerHTML = "TEMPO ESGOTADO";
  }
}, 1000);
