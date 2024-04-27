let cuentaUsuario = [];

function crearCuentaUsuario() {
  let usuario = prompt("Ingresa tu nuevo nombre de usuario:");
  let contraseña = prompt("Ingresa tu nueva contraseña:");

  let cuenta = {
    usuario: usuario,
    contraseña: contraseña
  };
  cuentaUsuario.push(cuenta);

  console.log ("Cuenta creada exitosamente")
  alert("Cuenta creada exitosamente. Bienvenido " + usuario + "!!!");
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
        console.log ("Inicio de sesión cancelado por el usuario.")
        alert("Inicio de sesión cancelado por el usuario.");
        break; 
      }
  
      if (verificarCuenta(usuario, contraseña)) {
        console.log ("¡Inicio de sesión exitoso" + usuario + "!")
        alert("¡Inicio de sesión exitoso! ¡Bienvenido! " + usuario + "!");
        break;
      } else {
        console.log("Vuelve a ingresar!")
        alert("Te equivocaste burro, vuelve a intentar -.-!")
        intentos++;
  
        if (intentos === 3) {
            console.log("Usuario se equivoco 3 veces, lo hago esperar 25 segundos")
            alert("Bueno ya te equivocaste 3 veces, bancame 25 segundos...");
            await sleep(25000);
            intentos = 0; 
          }
        }
      }
    }

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

crearCuentaUsuario();

login();
