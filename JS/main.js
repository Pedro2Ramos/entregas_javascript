let cuentaUsuario = JSON.parse(localStorage.getItem('cuentaUsuario')) || [];

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

let productos = [
  { id: 1, equipo: 'Skateboard Element', precio: 100000 },
  { id: 2, equipo: 'Skateboard Santa Cruz', precio: 50000 },
  { id: 3, equipo: 'Skateboard Plan B', precio: 70000 },
  { id: 4, equipo: 'Skateboard Chocolate', precio: 80000 },
  { id: 5, equipo: 'Skateboard Pro', precio: 15000 },
  { id: 6, equipo: 'Skateboard Creature', precio: 25000 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".agregar-carrito").forEach(button => {
    button.addEventListener("click", function() {
      let id = parseInt(this.getAttribute("data-id"));
      agregarAlCarrito(id);
    });
  });

  document.getElementById("ver-carrito").addEventListener("click", function() {
    mostrarCarrito();
  });


  document.getElementById("Checkdarkmode2").addEventListener("change", function() {
    document.body.classList.toggle('dark-mode');
  });

  document.getElementById("salir").addEventListener("click", function() {
    mostrarMensajesalir("¿Te gustaría cerrar sesión?");
  });
});

function agregarAlCarrito(id) {
  let producto = productos.find(p => p.id === id);
  if (!producto) return;

  let itemCarrito = carrito.find(item => item.id === id);

  if (itemCarrito) {
    itemCarrito.cantidad += 1;
  } else {
    carrito.push({ id: producto.id, equipo: producto.equipo, precio: producto.precio, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  Swal.fire({
    title: 'Producto agregado',
    text: `${producto.equipo} ha sido agregado al carrito.`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

function mostrarCarrito() {
  let carritoHTML = '<ul class="list-group">';
  let totalCarrito = 0;

  carrito.forEach(item => {
    carritoHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.equipo} - $${item.precio} x ${item.cantidad}
        <span>$${item.precio * item.cantidad}</span>
        <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </li>`;
    totalCarrito += item.precio * item.cantidad;
  });

  carritoHTML += '</ul>';

  Swal.fire({
    title: 'Carrito de Compras',
    html: carritoHTML + `<hr><strong>Total: $${totalCarrito}</strong>`,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: 'Finalizar compra',
    cancelButtonText: 'Seguir comprando'
  }).then((result) => {
    if (result.isConfirmed) {
      abrirFormularioPago(totalCarrito);
    }
  });
}

function abrirFormularioPago(totalCarrito) {
  Swal.fire({
    title: 'Información de Pago',
    html:
    `<form id="swal-form-pago">
    <div class="mb-3">
      <label for="swal-input-nombre" class="form-label">Nombre del titular</label>
      <input id="swal-input-nombre" class="form-control" placeholder="Nombre del titular">
    </div>
    <div class="mb-3">
      <label for="swal-input-tarjeta" class="form-label">Número de tarjeta</label>
      <input id="swal-input-tarjeta" class="form-control" placeholder="Número de tarjeta">
    </div>
    <div class="mb-3">
      <label for="swal-input-expiracion" class="form-label">Fecha de expiración</label>
      <input id="swal-input-expiracion" class="form-control" placeholder="MM/AA">
    </div>
    <div class="mb-3">
      <label for="swal-input-cvv" class="form-label">CVV</label>
      <input id="swal-input-cvv" class="form-control" placeholder="CVV">
    </div>
  </form>`,
    focusConfirm: false,
    preConfirm: () => {
      const nombre = Swal.getPopup().querySelector('#swal-input-nombre').value;
      const tarjeta = Swal.getPopup().querySelector('#swal-input-tarjeta').value;
      const expiracion = Swal.getPopup().querySelector('#swal-input-expiracion').value;
      const cvv = Swal.getPopup().querySelector('#swal-input-cvv').value;
      if (!nombre || !tarjeta || !expiracion || !cvv) {
        Swal.showValidationMessage('Por favor, completa todos los campos.');
        return false;
      }
      return { nombre, tarjeta, expiracion, cvv };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { nombre, tarjeta, expiracion, cvv } = result.value;
      procesarPago(totalCarrito, nombre, tarjeta, expiracion, cvv);
    }
  });
}

function procesarPago(total, nombre, tarjeta, expiracion, cvv) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      total,
      nombre,
      tarjeta,
      expiracion,
      cvv
    })
  })
  .then(response => response.json())
  .then(data => {
    Swal.fire({
      title: 'Pago Procesado',
      text: '¡Gracias por tu compra!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    localStorage.removeItem('carrito');
    carrito = [];
  })
  .catch(error => {
    console.error('Error al procesar el pago:', error);
    Swal.fire({
      title: 'Error',
      text: 'Hubo un problema al procesar el pago. Inténtalo nuevamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  });
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarMensajesalir(mensaje2) {
  Swal.fire({
    title: mensaje2, 
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Quedarme comprando",
    denyButtonText: `Cerrar sesión`
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Sigue disfrutando");
    } else if (result.isDenied) {
      Swal.fire("Chao");
      localStorage.removeItem('cuentaUsuario');
      window.location.href = "iniciarsesion.html";
    }
  });
}
