let cuentaUsuario = JSON.parse(localStorage.getItem('cuentaUsuario')) || [];
let productos = [
  { equipo: 'Teléfono', precio: 50000 },
  { equipo: 'Computadora', precio: 150000 },
  { equipo: 'TV', precio: 100000 },
  { equipo: 'Pochoclo', precio: 100000 }
];

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("crearcuenta").addEventListener("click", function() {
    abrirFormularioCrearCuenta();
  });

  document.getElementById("iniciarsesion").addEventListener("click", function() {
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    iniciar(usuario, contraseña);
  });

  document.getElementById("Checkdarkmode").addEventListener("change", function() {
    document.body.classList.toggle('dark-mode');
  });
 
});

document.addEventListener("DOMContentLoaded", function() {
 document.getElementById("salir").addEventListener("click", function() {
  mostrarMensajesalir("Te gustaría cerrar sesión?");
});

});

function abrirFormularioCrearCuenta() {
  Swal.fire({
    title: 'Crear cuenta',
    html:
    `<form id="swal-form">
    <div class="mb-3">
      <label for="swal-input-usuario" class="form-label">Nombre de usuario</label>
      <input id="swal-input-usuario" class="form-control" placeholder="Nombre de usuario">
    </div>
    <div class="mb-3">
      <label for="swal-input-contraseña" class="form-label">Contraseña</label>
      <input id="swal-input-contraseña" type="password" class="form-control" placeholder="Contraseña">
    </div>
  </form>`,
    focusConfirm: false,
    preConfirm: () => {
      const usuario = Swal.getPopup().querySelector('#swal-input-usuario').value;
      const contraseña = Swal.getPopup().querySelector('#swal-input-contraseña').value;
      if (!usuario || !contraseña) {
        Swal.showValidationMessage('Por favor, ingresa tanto el nombre de usuario como la contraseña.');
        return false;
      }
      return { usuario: usuario, contraseña: contraseña };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { usuario, contraseña } = result.value;
      if (verificarCuentaExistente(usuario)) {
        mostrarMensajecuentacreada("Ya existe una cuenta con ese nombre de usuario.");
      } else {
        crearCuentaUsuario(usuario, contraseña);
      }
    }
  });
}

function mostrarMensajecuentacreada(mensaje) {
  Swal.fire({
    title: mensaje,
    icon: 'error',
    confirmButtonText: 'Aceptar',
    customClass: {
      icon: 'swal2-x'
    }
  });
}

function verificarCuentaExistente(usuario) {
  return cuentaUsuario.some(cuenta => cuenta.usuario === usuario);
}

function crearCuentaUsuario(usuario, contraseña) {
  let cuenta = {
    usuario: usuario,
    contraseña: contraseña
  };
  cuentaUsuario.push(cuenta);
  localStorage.setItem('cuentaUsuario', JSON.stringify(cuentaUsuario));

  mostrarMensaje("Cuenta creada exitosamente. ¡Bienvenido " + usuario + "!");
}

function mostrarMensaje(mensaje) {
  Swal.fire({
    title: mensaje,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

function verificarCuenta(usuario, contraseña) {
  return cuentaUsuario.some(cuenta => cuenta.usuario === usuario && cuenta.contraseña === contraseña);
}

async function iniciar(usuario, contraseña) {
  if (!usuario || !contraseña) {
    mostrarMensajecompletausuario("Por favor, ingresa tanto el nombre de usuario como la contraseña.");
    return;
  }

  await login(usuario, contraseña);
}

async function login(usuario, contraseña) {
  if (verificarCuenta(usuario, contraseña)) {
    console.log("¡Inicio de sesión exitoso, " + usuario + "!");
    mostrarMensaje("¡Inicio de sesión exitoso! ¡Bienvenido, " + usuario + "!");
    window.location.href = "index.html";
  } else {
    console.log("Te equivocaste, vuelve a intentar -.-!");
    mostrarMensajecompletausuario("Te equivocaste, vuelve a intentar -.-!");
  }
}

function mostrarMensajecompletausuario(mensaje) {
  Swal.fire({
    title: mensaje,
    icon: 'error',
    confirmButtonText: 'Aceptar'
  });
}

function mostrarMensajesalir(mensaje2) {
  Swal.fire({
    title: mensaje2, 
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Quedarme comprando",
    denyButtonText: `Cerrar sesión`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Sigue disfrutando");
    } else if (result.isDenied) {
      Swal.fire("Chao");
      localStorage.removeItem('cuentaUsuario');
      window.location.href = "iniciarsesion.html";
    }
  });
}

// function mostrarProductos() {
//   let listaProductos = "Mis productos disponibles son:\n";
//   for (let i = 0; i < productos.length; i++) {
//     listaProductos += `${i + 1}. ${productos[i].equipo} - Precio: $${productos[i].precio}\n`;
//   }
//   alert(listaProductos);
// }

// function agregarProducto() {
//   let productoBuscado = prompt("Ingresa el nombre del producto que buscas (Pochoclo, Teléfono, Computadora, TV):");

//   if (productoBuscado === null) {
//     console.log("Operación Cancelada");
//     alert("Operación Cancelada");
//     gestionarProductos();
//     return;
//   }

//   let productoEncontrado = productos.find(producto => producto.equipo.toLowerCase() === productoBuscado.trim().toLowerCase());

//   if (productoEncontrado) {
//     console.log("Encontramos el producto:", productoEncontrado.equipo, "Precio:", productoEncontrado.precio);
//     alert("Encontramos el producto: " + productoEncontrado.equipo + " - Precio: $" + productoEncontrado.precio);
//   } else {
//     let agregarProducto = confirm("No conseguí el producto. ¿Deseas agregarlo?");
//     if (agregarProducto) {
//       let nuevoPrecio;
//       do {
//         nuevoPrecio = prompt("Ingresa el precio del producto:");
//         if (nuevoPrecio === null) {
//           console.log("Operación Cancelada");
//           alert("Operación Cancelada");
//           gestionarProductos();
//           return;
//         }
//         if (isNaN(nuevoPrecio) || nuevoPrecio.trim() === "") {
//           alert("El precio debe ser un número válido. Por favor, intenta nuevamente.");
//         }
//       } while (isNaN(nuevoPrecio) || nuevoPrecio.trim() === "");

//       productos.push({ equipo: productoBuscado.trim(), precio: parseFloat(nuevoPrecio) });
//       console.log("Producto agregado exitosamente:", productoBuscado.trim(), "Precio:", parseFloat(nuevoPrecio));
//       alert("Producto agregado exitosamente: " + productoBuscado.trim() + " - Precio: $" + parseFloat(nuevoPrecio));
//       mostrarProductos();
//     } else {
//       console.log("El producto no fue agregado");
//       alert("El producto no fue agregado");
//     }
//   }

//   gestionarProductos();
// }

// function gestionarProductos() {
//   mostrarProductos();
//   agregarProducto();
// }
