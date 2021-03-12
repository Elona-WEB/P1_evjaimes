carrito = [];

const URL ="restaurant.json"
//CARGA
const t = callback => {
  fetch(URL).then(element => {
    const a = element.json();
    a.then(r => {
      callback(r);
    });
  });
};

//FUNCIÓN GENERALIZADA, TODOS SON LOS MISMOS
function ponerProductos(comida, section) {
  // //Agarramos el div de los productos
  let divProductos = document.getElementById("cartasProductos");
  let divNombre = document.getElementById("tituloProductos");
  let divContainerRow = document.createElement("div");
  divContainerRow.className = "row";

  //Nombre
  let nom = document.createElement("h1");
  nom.innerText = section;
  nom.className = "text-center";
  divNombre.appendChild(nom);

  for (let i = 0; i < comida.length; i++) {
    let yes = comida[i];

    //Creamos la carta
    let card = document.createElement("div");
    card.className = "card";

    //Creamos el cuerpo de la carta
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    //Ahora los elementos de la carta

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = yes.image;
    imagen.className = "card-img-top";

    //Titulo
    let title = document.createElement("h5");
    title.innerText = yes.name;
    title.className = "card-title";

    //Descrip
    let desc = document.createElement("p");
    desc.innerText = yes.description;
    desc.className = "card-text";

    //Price
    let price = document.createElement("p");
    price.innerText = yes.price;
    price.className = "card-text";

    //Boton de carrito
    let botoncarrito = document.createElement("a");
    botoncarrito.className = "btn btn-dark";
    botoncarrito.innerText = "Add to car";
    //Apendiamos
    cardBody.appendChild(imagen);
    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(price);
    cardBody.appendChild(botoncarrito);

    //Apend sobre carta
    card.appendChild(cardBody);

    //Append al div
    divContainerRow.appendChild(card);
    divProductos.appendChild(divContainerRow);

    //Boton funcional
    botoncarrito.onclick = () => {
      carrito.push(yes);
      let num = document.getElementById("numero");
      num.innerHTML = carrito.length + " Items";
    };
  }
}

let burguers = document.getElementById("burguers");
burguers.onclick = () => {
  t(datos => {
    comida = datos[0].products;
    ponerProductos(comida, "Burguers");
  });
};
