
class Producto {
    constructor(id, nombre, precio, categoria, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
      this.imagen = imagen;
    }
  }
  class BaseDeDatos {
    constructor() {
      this.productos = [];     
      this.agregarRegistro(1, "Shucko", 800, "Insumos", "./shuko.jpeg");
      this.agregarRegistro(2, "Tres en Linea", 500, "Insumos", "./tres en linea.jpeg");
      this.agregarRegistro(3, "Lampara Smart", 600, "Insumos", "./lampara.jpeg");
      this.agregarRegistro(4, "Pack lamparas Smart", 1500, "Insumos", "./pack lamparas.jpeg");
      this.agregarRegistro(5, "Extensor Wifi", 3200, "Insumos", "./extensorwifi.jpeg");
      this.agregarRegistro(6, "Purificador de Aire", 4000, "Insumos", "./purificador.jpeg");
      this.agregarRegistro(7, "Purificador de Agua", 2600, "Insumos", "./purificador de agua.jpeg");
      this.agregarRegistro(8, "TV Box", 4400, "Insumos", "./tvbox.jpeg");
    }
      agregarRegistro(id, nombre, precio, categoria, imagen) {
      const producto = new Producto(id, nombre, precio, categoria, imagen);
      this.productos.push(producto);
    } 
     traerRegistros() {
      return this.productos;
    }
  
    registroPorId(id) {
      return this.productos.find((producto) => producto.id === id);
    }
  
        registrosPorNombre(palabra) {
      return this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(palabra.toLowerCase())
      );
    }
  }
  
  //EL CARRITO
  class Carrito {
    constructor() {
      const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
      this.carrito = carritoStorage || [];
      this.total = 0; 
      this.cantidadProductos = 0; 
      this.listar();
    }
  
    estaEnCarrito({ id }) {
      return this.carrito.find((producto) => producto.id === id);
    }
    agregar(producto) {
      const productoEnCarrito = this.estaEnCarrito(producto);
      if (!productoEnCarrito) {
        this.carrito.push({ ...producto, cantidad: 1 });
      } else {
        productoEnCarrito.cantidad++;
      }
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
      this.listar();
    }
  
    quitar(id) {
      const indice = this.carrito.findIndex((producto) => producto.id === id);
      if (this.carrito[indice].cantidad > 1) {
        this.carrito[indice].cantidad--;
      } else {
        this.carrito.splice(indice, 1);
      }
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
      this.listar();
    }
    listar() {
      this.total = 0;
      this.cantidadProductos = 0;
      divCarrito.innerHTML = "";
      for (const producto of this.carrito) {
        divCarrito.innerHTML += `
          <div class="productoCarrito">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
          </div>
        `;
        this.total += producto.precio * producto.cantidad;
        this.cantidadProductos += producto.cantidad;
      }
       const botonesQuitar = document.querySelectorAll(".btnQuitar");
      for (const boton of botonesQuitar) {
        boton.addEventListener("click", (event) => {
          event.preventDefault();
          const idProducto = Number(boton.dataset.id);
          this.quitar(idProducto);
        });
      }
      spanCantidadProductos.innerText = this.cantidadProductos;
      spanTotalCarrito.innerText = this.total;
    }
  }
  
//BASEDATOS
  const bd = new BaseDeDatos();
  
  const spanCantidadProductos = document.querySelector("#cantidadProductos");
  const spanTotalCarrito = document.querySelector("#totalCarrito");
  const divProductos = document.querySelector("#productos");
  const divCarrito = document.querySelector("#carrito");
  const inputBuscar = document.querySelector("#inputBuscar");
  const botonCarrito = document.querySelector("section h1");
  
  const carrito = new Carrito();
  
//CATALOGO
  cargarProductos(bd.traerRegistros());
  
  function cargarProductos(productos) {
    divProductos.innerHTML = "";
    for (const producto of productos) {
      divProductos.innerHTML += `
        <div class="producto">
          <h2>${producto.nombre}</h2>
          <p class="precio">$${producto.precio}</p>
          <div class="imagen">
            <img src="imagenes${producto.imagen}" />
          </div>
          <a href="#" class="btnAgregar" data-id="${producto.id}">Agregar al carrito</a>
        </div>
      `;
    }
  
        const botonesAgregar = document.querySelectorAll(".btnAgregar");

    for (const boton of botonesAgregar) {
      boton.addEventListener("click", (event) => {
                event.preventDefault();
                const idProducto = Number(boton.dataset.id);
                const producto = bd.registroPorId(idProducto);
                carrito.agregar(producto);
      });
    }
  }
 
 
 //CARRITO ENTRA Y SALE
  botonCarrito.addEventListener("click", (event) => {
    document.querySelector("section").classList.toggle("ocultar");
  });