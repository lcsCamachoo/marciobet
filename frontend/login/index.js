const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    const res = await api.post("/usuario/login", data);
    if (res.data.success) {
      alert("Login realizado com sucesso!");
      document.cookie = `token-bet=${res.data.token}; path=/`;
      document.cookie = `id-user=${res.data.usuario.id}; path=/`;
      window.location.href = "/";
    } else {
      throw new Error(res.data.message);
    }
    console.log(res);
  } catch (error) {
    console.log(error);
    alert("Usuário ou senha incorretos!");
  }
});
