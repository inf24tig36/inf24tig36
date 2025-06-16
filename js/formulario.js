console.log("emailjs:", window.emailjs);
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("GdtMYIQbxTJcT9Dxd");

  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const templateParams = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      morada: document.getElementById("morada").value,
      disciplina: document.getElementById("disciplina").value
    };

    emailjs.send("service_6awn0jx", "template_ipeo0fl", templateParams).then(alert("Email Enviado!"))
      .then(function () {
        alert("Formulário enviado com sucesso!");
      }, function (error) {
        alert("Erro ao enviar. Verifica os dados.");
        console.error("Erro:", error);
      });
  });
});

