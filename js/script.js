function sendMail (){
    let parms = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                telefone: document.getElementById("telefone").value,
                morada: document.getElementById("morada").value,
                disciplina: document.getElementById("disciplina").value
    }
    emailjs.send("service_6awn0jx", "template_ipeo0fl", parms).then(alert("Email Enviado!"))
}

  function mostrarFormulario() {
    document.getElementById("formEmenta").style.display = "block";
  }

  function carregarEmenta() {
    const ficheiro = document.getElementById('ficheiroxml').files[0];
    if (!ficheiro) {
      alert("Por favor selecione um ficheiro XML.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const textoXML = e.target.result;
      const parser = new DOMParser();
      const xml = parser.parseFromString(textoXML, "application/xml");
      atualizarTabelaComXML(xml);
    };
    reader.readAsText(ficheiro);
  }

  function atualizarTabelaComXML(xml) {
    const categorias = ["Sopa", "PratoDeCarne", "PratoDePeixe", "Fruta", "Sobremesa"];
    const dias = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta"];
    const tbody = document.querySelector("#ementaTable tbody");

    tbody.innerHTML = ""; // Limpar tabela atual

    categorias.forEach(cat => {
      const linha = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = cat.replace(/([A-Z])/g, ' $1').trim(); // formatação bonitinha
      linha.appendChild(th);

      dias.forEach(dia => {
        const td = document.createElement("td");
        const valor = xml.querySelector(`${cat} > ${dia}`);
        td.textContent = valor ? valor.textContent : "-";
        linha.appendChild(td);
      });

      tbody.appendChild(linha);
    });
  }

      function toggleMenu() {
      const nav = document.getElementById("menuNav");
      nav.classList.toggle("ativo");
    }