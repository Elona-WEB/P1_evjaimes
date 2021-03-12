carrito = [];

const URL = "restaurant.json";
//CARGA

const t = callback => {
  fetch(URL).then(element => {
    const a = element.json();
    a.then(r => {
      callback(r);
    });
  });
};

//FUNCIONES AUXILIARES

//LIMPIEZA DE PANTALLA
function limpiarPantalla() {
  var node = document.getElementById("cartasProductos");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  var node = document.getElementById("tituloProductos");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

//LIMPIEZA DE CARRITO

function limpiarCarritoPantalla(){
  var node = document.getElementById("cartasProductos");
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

//FUNCIÓN DE MANIPULACIÓN DE DOM
//CAMBIO CHIQUITO
//PRODUCTOS
function ponerProductos(comida, section) {
  // //Agarramos el div de los productos
  let divProductos = document.getElementById("cartasProductos");
  let divNombre = document.getElementById("tituloProductos");

  //Productos ordenados
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

//CARRITO
function tablaCarrito(pedido) {
  const conte = document.getElementById("cartasProductos");
  let divNombre = document.getElementById("tituloProductos");

  //Nombre
  let nom = document.createElement("h1");
  nom.innerText = "Order detail";
  nom.className = "text-center";
  divNombre.appendChild(nom);

  //TABLA
  var tbl = document.createElement("table");
  tbl.style.width = "100%";
  tbl.setAttribute("class", "table table-striped");

  var primera = document.createElement("tr");

  var thead1 = document.createElement("th");
  var l = document.createTextNode("Item");
  thead1.appendChild(l);
  var thead2 = document.createElement("th");
  var n = document.createTextNode("Qty.");
  thead2.appendChild(n);

  var thead3 = document.createElement("th");
  var o = document.createTextNode("Description");
  thead3.appendChild(o);

  var thead4 = document.createElement("th");
  var z = document.createTextNode("Unit Price");
  thead4.appendChild(z);

  var thead5 = document.createElement("th");
  var j = document.createTextNode("Amount");
  thead5.appendChild(j);

  primera.appendChild(thead1);
  primera.appendChild(thead2);
  primera.appendChild(thead3);
  primera.appendChild(thead4);
  primera.appendChild(thead5);

  tbl.appendChild(primera);

  //Arreglo bonito

  let arregloFinal = [];

  var tbdy = document.createElement("tbody");
  let i = 0;
  let total = 0;
  for (let key in pedido) {
    let element = pedido[key];
    total += parseInt(element.quantity) * parseInt(element.unitPrice);
    var hilera = document.createElement("tr");

    var celda = document.createElement("td");
    var num = document.createTextNode(i + 1);
    celda.appendChild(num);
    hilera.appendChild(celda);

    var celda = document.createElement("td");
    var num = document.createTextNode(element.quantity);
    celda.appendChild(num);
    hilera.appendChild(celda);

    var celda = document.createElement("td");
    var num = document.createTextNode(element.description);
    celda.appendChild(num);
    hilera.appendChild(celda);

    var celda = document.createElement("td");
    var num = document.createTextNode(element.unitPrice);
    celda.appendChild(num);
    hilera.appendChild(celda);

    var celda = document.createElement("td");
    var num = document.createTextNode(element.amount);
    celda.appendChild(num);
    hilera.appendChild(celda);

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tbdy.appendChild(hilera);

    //Arreglo final

    let pp= new Object;
    pp['item']=i+1;
    pp['quantity']=element.quantity;
    pp['description']=key;
    pp['unitPrice']=element.unitPrice;

    arregloFinal.push(pp);

    i = i + 1;
  }
  tbl.appendChild(tbdy);

  //VAMOS A HACER DIVS
  let uno = document.createElement("div");
  uno.className = "row";
  uno.appendChild(tbl);
  conte.appendChild(uno);

  let dos = document.createElement("div");
  dos.className = "row";

  //Total
  let col1 = document.createElement("div");
  col1.className = "col-8";
  let tot = document.createElement("h5");
  tot.innerHTML = "Total: $ " + total;
  col1.appendChild(tot);
  dos.appendChild(col1);

  //Botones
  let col2 = document.createElement("div");
  col2.className = "col-2";

  let boton1 = document.createElement("a");
  boton1.className = "btn btn-primary";
  boton1.innerText = "Cancel";

  let col3 = document.createElement("div");
  col3.className = "col-2";

  let boton2 = document.createElement("a");
  boton2.className = "btn btn-primary";
  boton2.innerText = "Confirm order";
  col2.appendChild(boton1);
  col3.appendChild(boton2);

  dos.appendChild(col2);
  dos.appendChild(col3);

  conte.appendChild(dos);

  //BOTONES A FUNCIONAR

  //BOTON DE CONFIRMAR ORDEN
  boton2.onclick = () => {
    limpiarCarritoPantalla();
    console.log(arregloFinal);
    carrito = [];
    let num = document.getElementById("numero");
    num.innerHTML = carrito.length + " Items";
  };
}

//FUNCIONES DE CLICK

//PRODUCTOS
let burguers = document.getElementById("burguers");
burguers.onclick = () => {
  limpiarPantalla();
  t(datos => {
    comida = datos[0].products;
    ponerProductos(comida, "Burguers");
  });
};

let tacos = document.getElementById("tacos");
tacos.onclick = () => {
  limpiarPantalla();
  t(datos => {
    comida = datos[1].products;
    ponerProductos(comida, "Tacos");
  });
};

let salads = document.getElementById("salads");
salads.onclick = () => {
  limpiarPantalla();
  t(datos => {
    comida = datos[2].products;
    ponerProductos(comida, "Salads");
  });
};

let desserts = document.getElementById("desserts");
desserts.onclick = () => {
  limpiarPantalla();
  t(datos => {
    comida = datos[3].products;
    ponerProductos(comida, "Desserts");
  });
};

let drinks = document.getElementById("drinks");
drinks.onclick = () => {
  limpiarPantalla();
  t(datos => {
    comida = datos[4].products;
    ponerProductos(comida, "Drinks & Slides");
  });
};

//CARRITO
let carr = document.getElementById("carritoFoto");

carr.onclick = () => {
  limpiarPantalla();
  //Vamos a procesar la lista del carrito
  let dict = {};
  for (let i = 0; i < carrito.length; i++) {
    if (dict[carrito[i].name] == null) {
      let h = new Object();
      h["quantity"] = 1;
      h["description"] = carrito[i].name;
      h["unitPrice"] = carrito[i].price;
      h["amount"] = carrito[i].price;
      dict[carrito[i].name] = h;
    } else {
      dict[carrito[i].name]["quantity"] += 1;
      dict[carrito[i].name]["amount"] += carrito[i].price;
    }
  }
  tablaCarrito(dict);
};
