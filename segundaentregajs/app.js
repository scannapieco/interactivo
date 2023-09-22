
class Item {
    constructor(nombre, precio, imagen) {
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
    }
  }
  
  const Stellaartoislitro = new Item("Stellaartoislitro", 350, "Stellaartoislitro");
  const stellaartoislata = new Item("stellaartoislata", 180, "stellaartoislata");
  const fernet = new Item("fernet", 200, "fernet.png");
  const gintonic = new Item("gintonic", 180, "gintonic.png");
  const whisky = new Item("whisky", 180, "whisky.png");
  const cigarros = new Item("cigarros", 200, "cigarros.png");
  
  const inventario = [];
  
  let saldo = 5000;
  
  
  const elsaldo = document.querySelector("#saldo span");
  elsaldo.innerText = saldo; 
  const elInventario = document.getElementById("inventario");
  
  
  function comprar(itemDelJuego) {
    if (saldo - itemDelJuego.precio >= 0) {
      inventario.push(itemDelJuego);
      saldo -= itemDelJuego.precio; 
      actualizarHTML();
    } else {
      alert(`No tienes saldo suficiente para comprar ${itemDelJuego.nombre}.`);
    }
  }
  
  function vender(nombreDelItem) {
    
    const itemEncontrado = inventario.find((item) => item.nombre === nombreDelItem);
  
    
    if (itemEncontrado) {
      saldo += itemEncontrado.precio;
      const indice = inventario.indexOf(itemEncontrado);
      inventario.splice(indice, 1);
      actualizarHTML();
    }
  }
  
  
  function actualizarHTML() {
    elInventario.innerHTML = "";
    for (const itemDelJuego of inventario) {
      const li = `
      <li onclick="vender('${itemDelJuego.nombre}')">
        <img src="img/${itemDelJuego.imagen}" alt="${itemDelJuego.nombre}" />
      </li>
      `;
      
      elInventario.innerHTML += li;
    }
  
    elsaldo.innerText = saldo;
  }
  