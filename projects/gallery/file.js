document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const imageContainer = document.getElementById('imageContainer');

    // Verifica si se ha seleccionado una imagen
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const formData = new FormData();
        formData.append('image', file);

        // Envía la imagen al servidor (puedes cambiar la URL a tu servidor)
        fetch('/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const imageUrl = data.imageUrl;
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageContainer.appendChild(imageElement);
            } else {
                alert('Error al subir la imagen.');
            }
        });
    } else {
        alert('Selecciona una imagen antes de subirla.');
    }
});
