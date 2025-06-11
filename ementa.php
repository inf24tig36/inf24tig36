<?php
if (isset($_FILES['ficheiroxml'])) {
    $xml = simplexml_load_file($_FILES['ficheiroxml']['tmp_name']);
    $htmlPath = 'ementa.html';

    if (!file_exists($htmlPath)) {
        die("Ficheiro HTML não encontrado.");
    }

    $html = file_get_contents($htmlPath);

    $categorias = ['sopa' => 'Sopa', 'carne' => 'Prato de Carne', 'peixe' => 'Prato de Peixe', 'fruta' => 'Fruta', 'sobremesa' => 'Sobremesa'];
    $dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

    $novaTabela = '<table id="ementaTable">
<thead>
  <tr>
    <th>Categoria</th>
    <th>Segunda</th>
    <th>Terça</th>
    <th>Quarta</th>
    <th>Quinta</th>
    <th>Sexta</th>
  </tr>
</thead>
<tbody>';

    foreach ($categorias as $key => $label) {
        $novaTabela .= "<tr><th>$label</th>";
        foreach ($dias as $dia) {
            $valor = htmlspecialchars((string)$xml->$dia->$key ?? '-');
            $novaTabela .= "<td>$valor</td>";
        }
        $novaTabela .= "</tr>";
    }

    $novaTabela .= '</tbody></table>';

    // Substitui entre os marcadores
    $htmlAtualizado = preg_replace(
        '/<!-- INICIO_TABELA -->.*<!-- FIM_TABELA -->/s',
        "<!-- INICIO_TABELA -->\n$novaTabela\n<!-- FIM_TABELA -->",
        $html
    );

    file_put_contents($htmlPath, $htmlAtualizado);

    echo "<p>Ementa atualizada com sucesso! <a href='ementa.html'>Ver página</a></p>";
} else {
    echo "Nenhum ficheiro recebido.";
}
?>
