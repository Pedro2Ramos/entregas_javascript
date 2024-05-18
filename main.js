let cuentaUsuario = [];
let productos = [
  { equipo: 'Teléfono', precio: 50000 },
  { equipo: 'Computadora', precio: 150000 },
  { equipo: 'TV', precio: 100000 },
  { equipo: 'Pochoclo', precio: 100000 }
];

function crearCuentaUsuario() {
  let usuario;
  let contraseña;

  do {
    usuario = prompt("Ingresa tu nuevo nombre de usuario:");
    if (usuario === null) {
      console.log("Creación de cuenta cancelada");
      alert("Creación de cuenta cancelada");
      iniciar();
      return;
    }
    if (usuario.trim() === "") {
      alert("El nombre de usuario no puede estar vacío. Por favor, intenta nuevamente.");
    }
  } while (usuario.trim() === "");

  do {
    contraseña = prompt("Ingresa tu nueva contraseña:");
    if (contraseña === null) {
      console.log("Creación de cuenta cancelada");
      alert("Creación de cuenta cancelada");
      iniciar();
      return;
    }
    if (contraseña.trim() === "") {
      alert("La contraseña no puede estar vacía. Por favor, intenta nuevamente.");
    }
  } while (contraseña.trim() === "");

  let cuenta = {
    usuario: usuario,
    contraseña: contraseña
  };
  cuentaUsuario.push(cuenta);

  console.log("Cuenta creada exitosamente");
  alert("Cuenta creada exitosamente. ¡Bienvenido " + usuario + "!");
}

function verificarCuenta(usuario, contraseña) {
  for (let i = 0; i < cuentaUsuario.length; i++) {
    let cuentaActual = cuentaUsuario[i];
    if (cuentaActual.usuario === usuario && cuentaActual.contraseña === contraseña) {
      return true;
    }
  }
  return false;
}

async function login() {
  let intentos = 0;

  while (intentos < 3) {
    let usuario = prompt("Ingresa tu cuenta:");
    let contraseña = prompt("Ingresa tu contraseña:");

    if (usuario === null || contraseña === null) {
      console.log("Inicio de sesión cancelada");
      alert("Inicio de sesión cancelada");
      iniciar();
      return;
    }

    if (verificarCuenta(usuario, contraseña)) {
      console.log("¡Inicio de sesión exitoso, " + usuario + "!");
      alert("¡Inicio de sesión exitoso! ¡Bienvenido, " + usuario + "!");
      gestionarProductos(); 
      break;
    } else {
      console.log("Vuelve a ingresar!");
      alert("Te equivocaste, vuelve a intentar -.-!");
      intentos++;

      if (intentos === 3) {
        console.log("Usuario se equivocó 3 veces, lo hago esperar 25 segundos.");
        alert("Bueno, ya te equivocaste 3 veces, espera 25 segundos...");
        await sleep(25000);
        intentos = 0;
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarProductos() {
  let listaProductos = "Mis productos disponibles son:\n";
  for (let i = 0; i < productos.length; i++) {
    listaProductos += `${i + 1}. ${productos[i].equipo} - Precio: $${productos[i].precio}\n`;
  }
  alert(listaProductos);
}

function agregarProducto() {
  let productoBuscado = prompt("Ingresa el nombre del producto que buscas (Pochoclo, Teléfono, Computadora, TV):");

  if (productoBuscado === null) {
    console.log("Operación Cancelada");
    alert("Operación Cancelada");
    gestionarProductos(); 
    return;
  }

  let productoEncontrado = productos.find(producto => producto.equipo.toLowerCase() === productoBuscado.trim().toLowerCase());

  if (productoEncontrado) {
    console.log("Encontramos el producto:", productoEncontrado.equipo, "Precio:", productoEncontrado.precio);
    alert("Encontramos el producto: " + productoEncontrado.equipo + " - Precio: $" + productoEncontrado.precio);
  } else {
    let agregarProducto = confirm("No consegui el producto ¿Deseas agregarlo?");
    if (agregarProducto) {
      let nuevoPrecio;
      do {
        nuevoPrecio = prompt("Ingresa el precio del producto:");
        if (nuevoPrecio === null) {
          console.log("Operación Cancelada");
          alert("Operación Cancelada");
          gestionarProductos();
          return;
        }
        if (isNaN(nuevoPrecio) || nuevoPrecio.trim() === "") {
          alert("El precio debe ser un número válido. Por favor, intenta nuevamente.");
        }
      } while (isNaN(nuevoPrecio) || nuevoPrecio.trim() === "");

      productos.push({ equipo: productoBuscado.trim(), precio: parseFloat(nuevoPrecio) });
      console.log("Producto agregado exitosamente:", productoBuscado.trim(), "Precio:", parseFloat(nuevoPrecio));
      alert("Producto agregado exitosamente: " + productoBuscado.trim() + " - Precio: $" + parseFloat(nuevoPrecio));
      mostrarProductos();
    } else {
      console.log("El producto no fue agregado");
      alert("El producto no fue agregado");
    }
  }

  gestionarProductos();
}

function gestionarProductos() {
  mostrarProductos();
  agregarProducto();
}

function iniciar() {
  let opcion = prompt("¿Deseas crear una cuenta o iniciar sesión? Escribe 'crear' para crear una cuenta o 'ingresar' para iniciar sesión:");

  if (opcion === null) {
    console.log("Operación cancelada por el usuario.");
    alert("Operación cancelada por el usuario.");
    return;
  }

  if (opcion.toLowerCase() === 'crear') {
    crearCuentaUsuario();
    login();
  } else if (opcion.toLowerCase() === 'ingresar') {
    login();
  } else {
    console.log("Opción no válida, por favor intenta nuevamente.");
    alert("Opción no válida, por favor intenta nuevamente.");
    iniciar();
  }
}

iniciar();
