
const imageFolder = "fotos/";
const imageNames = ['image_1.jpg', 'image_2.jpg', 'image_3.jpg'];

function deprecirader() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageFolder);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const responseHTML = xhr.responseText;
            tempElement.innerHTML = responseHTML;
            console.log(imageNames);
            imageNames.shift()
            loadImages(imageNames);
        } else {
            console.error("Error al cargar la lista de imágenes.");
        }
    };
    xhr.send();
}


const rutaCarpeta = "./fotos/";
const galeriaContainer = document.getElementById("gallery-container");

imageNames.forEach(nombreFoto => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("img-box");
    imgBox.onclick = function () {
        mostrarModal(this);
    };

    const img = document.createElement("img");
    img.src = rutaCarpeta + nombreFoto;

    const transparentBox = document.createElement("div");
    transparentBox.classList.add("transparent-box");

    const caption = document.createElement("div");
    caption.classList.add("caption");
    caption.innerHTML = `<p>${nombreFoto}</p>`;
    transparentBox.appendChild(caption);

    imgBox.appendChild(img);
    imgBox.appendChild(transparentBox);
    galeriaContainer.appendChild(imgBox);
});


function loadImages(imageNames) {
    imageNames.forEach(nombreFoto => {
        const imgBox = document.createElement("div");
        imgBox.classList.add("img-box");
        imgBox.onclick = function () {
            mostrarModal(this);
        };

        const img = document.createElement("img");
        img.src = rutaCarpeta + nombreFoto;

        const transparentBox = document.createElement("div");
        transparentBox.classList.add("transparent-box");

        const caption = document.createElement("div");
        caption.classList.add("caption");
        caption.innerHTML = `<p>${nombreFoto}</p>`;
        transparentBox.appendChild(caption);
        imgBox.appendChild(img);
        imgBox.appendChild(transparentBox);
        galeriaContainer.appendChild(imgBox);
    });
}

function mostrarModal(div) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("imagenModal");
    const img = div.querySelector('img');
    modal.style.display = "block";
    modalImg.src = img.src;

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
}

function cerrarModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onload = cargarFotos;