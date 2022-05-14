// Creo una constante del formulario a traves del id
const formulario = document.getElementById('formulario');
// Creo una lista de constantes del formulario a traves del tipo de etiqueta
const inputs = document.querySelectorAll('#formulario input, #formulario select');

//Creo una serie de expresiones regulares para validar los siguientes campos
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,15}$/, 
	contraseña: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	select: /.{1,}/
}

// Creo tantos booleanos como campos tengo y los declaro a false
const campos = {
	nombre: false,
	contraseña1: false,
	contraseña2: false,
	correo: false,
	sexo: false,
	ciudad: false,
	pais: false,
	fecha: false
}

// Creo una funcion flecha la cual le pasamos por parametro el elemento el cual lo ejecuta
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "contraseña1":
			validarCampo(expresiones.contraseña, e.target, 'contraseña1');
			validarContraseña2();
		break;
		case "contraseña2":
			validarContraseña2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "sexo":
			validarCampo(expresiones.select, e.target, 'sexo');
		break;
		case "ciudad":
			validarCampo(expresiones.select, e.target, 'ciudad');
		break;
		case "pais":
			validarCampo(expresiones.select, e.target, 'pais');
		break;
		case "fecha":
			validarFecha(e.target.value);
		break;
	}
}

// Creo una funcion flecha la cual le pasamos por parametro la expresion regular la cual vamos a comprobar
// el valor del campo y el campo en si
const validarCampo = (expresion, input, campo) => {
	// Comprobamos si cumple la expresion regular, y en ese caso ponemos el campo a true y modificamos las clases para
	// que salga que es correcto.
	// En caso contrario se pone a false y se modifican las clases de la etiqueta para mostrar que no es correcto
	if(expresion.test(input.value)){
		document.getElementById(`grupo-${campo}`).classList.remove('grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.add('grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo-${campo} .input-error`).classList.remove('input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo-${campo}`).classList.add('grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.remove('grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo-${campo} .input-error`).classList.add('input-error-activo');
		campos[campo] = false;
	}
}

// Creo una funcion flecha para validar la segunda contraseña comprarandola con la primera contraseña y si cumple la expresion regular
const validarContraseña2 = () => {
	const inputContraseña1 = document.getElementById('contraseña1');
	const inputContraseña2 = document.getElementById('contraseña2');

	if(inputContraseña1.value === inputContraseña2.value && expresiones.contraseña.test(inputContraseña2.value)){
		document.getElementById(`grupo-contraseña2`).classList.remove('grupo-incorrecto');
		document.getElementById(`grupo-contraseña2`).classList.add('grupo-correcto');
		document.querySelector(`#grupo-contraseña2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo-contraseña2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo-contraseña2 .input-error`).classList.remove('input-error-activo');
		campos['contraseña2'] = true;
	} else {
		document.getElementById(`grupo-contraseña2`).classList.add('grupo-incorrecto');
		document.getElementById(`grupo-contraseña2`).classList.remove('grupo-correcto');
		document.querySelector(`#grupo-contraseña2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo-contraseña2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo-contraseña2 .input-error`).classList.add('input-error-activo');
		campos['contraseña2'] = false;
	}
}

// Creo una funcion flecha para validar la fecha comprarandola con la fecha actual y si su edad esta en tre los 18 y 65 años
function validarFecha(fecha) {
    var hoy = new Date();
    var cumpleaños = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleaños.getFullYear();
    var m = hoy.getMonth() - cumpleaños.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleaños.getDate())) {
        edad--;
    }
	if(edad >= 18 && edad < 65){
		document.getElementById(`grupo-fecha`).classList.remove('grupo-incorrecto');
		document.getElementById(`grupo-fecha`).classList.add('grupo-correcto');
		document.querySelector(`#grupo-fecha i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo-fecha i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo-fecha .input-error`).classList.remove('input-error-activo');
		campos['fecha'] = true;
	} else {
		document.getElementById(`grupo-fecha`).classList.add('grupo-incorrecto');
		document.getElementById(`grupo-fecha`).classList.remove('grupo-correcto');
		document.querySelector(`#grupo-fecha i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo-fecha i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo-fecha .input-error`).classList.add('input-error-activo');
		campos['fecha'] = false;
	}
}

// Creo un bucle el cual detecta cada vez que sueltas una tecla o haces clic fuera del campo y llama a la
// funcion validarFormulario para hacer las comprobaciones
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


// Capturo el evento al enviar el formulario
formulario.addEventListener('submit', (e) => {
	// Evito que se envien los datos
	e.preventDefault();
	
	// Compruebo que todas las constantes sean correctas
	if(campos.nombre && campos.contraseña1 && campos.contraseña2 && campos.correo && campos.sexo && campos.ciudad && campos.pais && campos.fecha){
		// En ese caso se envian
		formulario.submit();

		// Muestro un mensaje de "Mensaje enviado" durante 5s
		document.getElementById('mensaje-exito').classList.add('mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('mensaje-exito').classList.remove('mensaje-exito-activo');
		}, 5000);

		// Dejo de mostrar que los campos son correctos
		document.querySelectorAll('.grupo-correcto').forEach((icono) => {
			icono.classList.remove('grupo-correcto');
		});

		// Si hay algun campo que no es correcto o está vacio muestro mensaje de error durante 5s
	} else {
		document.getElementById('mensaje').classList.add('mensaje-activo');
		setTimeout(() => {
			document.getElementById('mensaje').classList.remove('mensaje-activo');
		}, 5000);
	}
});
