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
      th.textContent = cat.replace(/([A-Z])/g, ' $1').trim(); // formatação 
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

    function exportarTabelaParaXML() {
  const tabela = document.getElementById("ementaTable");
  const linhas = tabela.querySelectorAll("tbody tr");

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<ementa>\n`;

  linhas.forEach(linha => {
    const colunas = linha.querySelectorAll("td, th");
    const categoria = colunas[0].textContent.trim();
    xml += `  <categoria nome="${categoria}">\n`;
    const dias = ["segunda", "terca", "quarta", "quinta", "sexta"];
    for (let i = 1; i < colunas.length; i++) {
      xml += `    <${dias[i - 1]}>${colunas[i].textContent.trim()}</${dias[i - 1]}>\n`;
    }
    xml += `  </categoria>\n`;
  });

  xml += `</ementa>`;

  // Criar um blob e fazer o download
  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ementa_semana.xml";
  a.click();
  URL.revokeObjectURL(url);
}
