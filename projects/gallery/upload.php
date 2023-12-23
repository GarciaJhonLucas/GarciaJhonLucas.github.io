<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDirectory = 'fotos/'; // Carpeta donde deseas almacenar las imÃ¡genes
    $uploadedFile = $_FILES['image'];

    if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
        $destination = $uploadDirectory . $uploadedFile['name'];

        if (move_uploaded_file($uploadedFile['tmp_name'], $destination)) {
            $response = [
                'success' => true,
                'imageUrl' => $destination
            ];
        } else {
            $response = [
                'success' => false,
                'error' => 'No se pudo mover el archivo.'
            ];
        }
    } else {
        $response = [
            'success' => false,
            'error' => 'Error en la carga del archivo.'
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
