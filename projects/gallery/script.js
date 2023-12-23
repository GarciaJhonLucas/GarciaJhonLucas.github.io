const imageElement = document.getElementById("image");
const imageFolder = "fotos/";

// Hacer una solicitud AJAX para obtener la lista de imágenes en la carpeta
const xhr = new XMLHttpRequest();
xhr.open("GET", imageFolder);
xhr.onload = function () {
    if (xhr.status === 200) {
        const responseHTML = xhr.responseText;

        // Crear un elemento temporal para analizar el HTML
        const tempElement = document.createElement('div');
        tempElement.innerHTML = responseHTML;

        // Obtener todas las etiquetas de imagen (img)
        const imageElements = tempElement.querySelectorAll('a');

        // Obtener los nombres de las imágenes
        const imageNames = Array.from(imageElements).map(imgElement => {
            const src = imgElement.getAttribute('href');
            // Puedes procesar 'src' aquí para obtener el nombre si es necesario.
            return src;
        });

        // imageNames ahora contiene los nombres de las imágenes
        console.log(imageNames);
        imageNames.shift()
        loadImages(imageNames);
    } else {
        console.error("Error al cargar la lista de imágenes.");
    }
};
xhr.send();

let currentIndex = 0;

function loadImages(imageList) {
    function changeImage() {
        imageElement.src = imageFolder + imageList[currentIndex];
        currentIndex = (currentIndex + 1) % imageList.length;
    }

    setInterval(changeImage, 3000); // Cambia la imagen cada 3 segundos
    changeImage(); // Carga la primera imagen
}