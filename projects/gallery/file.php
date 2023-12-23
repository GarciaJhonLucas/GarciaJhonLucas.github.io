<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subir Imágenes</title>
</head>
<body>
    <form id="uploadForm" enctype="multipart/form-data">
        <input type="file" id="imageInput" name="image" accept="image/*">
        <button type="submit" id="uploadButton">Subir Imagen</button>
    </form>
    <div id="imageContainer"></div>

    <script src="file.js"></script>
</body>
</html>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDirectory = 'fotos/'; // Carpeta donde deseas almacenar las imágenes
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
