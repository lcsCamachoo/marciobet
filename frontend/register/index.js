const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  api
    .post("https://bet-marcio.onrender.com/usuario/inserir", data)
    .then((response) => {
      alert("Usuário registrado com sucesso!");
      window.location.href = "/";
    })
    .catch((error) => {
      alert("Erro ao registrar usuário!");
      console.log(error);
    });
});
