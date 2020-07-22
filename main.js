let formulario = document.querySelector('#formulario');
let nombreProyecto = document.querySelector('#nombre_proyecto');
let horaInicial = document.querySelector('#hora_inicial');
let horaFinal = document.querySelector('#hora_final');
let dia = document.querySelector('#dia_programado');
let contenedorTareas = document.querySelector('#tareas');

addEventListener();

function addEventListener() {
	formulario.addEventListener('submit', guardarTarea);
	contenedorTareas.addEventListener('click', eliminarTarea);
	document.addEventListener('DOMContentLoaded', listaTareasLista);
}
function guardarTarea(e) {
	let tarea = {
		nombre: nombreProyecto.value,
		inicio: horaInicial.value,
		fin: horaFinal.value,
		dia: dia.value
	}
	e.preventDefault();
	contenedorTareas.innerHTML += (`
		<div class="card p-2 tarea"> 
			<h4 class="text-center"><i>${tarea.nombre}</i></h4>
			<div class="row text-center">
				<div class="col-md">
					<b>Inicio</b>
					<p>${tarea.inicio}</p>
				</div>
				<div class="col-md">
					<b>Fin</b>
					<p>${tarea.fin}</p>
				</div>
				<div class="col-md">
					<b>Dia final </b>
					<p>${tarea.dia}</p>
				</div>
			</div>
			<a class="btn btn-danger d-block eliminar">Eliminar</a>
		</div>
	`)	 
	agregarTareaLocalStorage(tarea);
	nombreProyecto.value = " ";
	horaInicial.value = " ";
	horaFinal.value = " ";
	dia.value = " ";
	nombreProyecto.focus();
}
function eliminarTarea(e) {
	e.preventDefault();
	if (e.target.classList.contains('eliminar')) {
		e.target.parentElement.remove();
		borrarTareaLocalStorage(e.target.parentElement.querySelector('h4').innerText);
	}
}
function agregarTareaLocalStorage(tarea) {
	let tareas;
	tareas = obtenerTareasLocalStorage();

	tareas.push(tarea);
	localStorage.setItem('tareas', JSON.stringify(tareas));
	
}
function obtenerTareasLocalStorage() {
	let tareas;
	if (localStorage.getItem('tareas') === null) {
		tareas = [];
	} else {
		tareas = JSON.parse(localStorage.getItem('tareas'));
	}
	return tareas;
}

function listaTareasLista() {
	let tareas;
	tareas = obtenerTareasLocalStorage();
	tareas.forEach(function (tarea) {
		contenedorTareas.innerHTML += (`
		<div class="card p-2 tarea"> 
			<h4 class="text-center "><i>${tarea.nombre}</i></h4>
			<div class="row text-center">
				<div class="col-md">
					<b>Inicio</b>
					<p>${tarea.inicio}</p>
				</div>
				<div class="col-md">
					<b>Fin</b>
					<p>${tarea.fin}</p>
				</div>
				<div class="col-md">
					<b>Dia final </b>
					<p>${tarea.dia}</p>
				</div>
			</div>
			<a class="btn btn-danger d-block eliminar">Eliminar</a>
		</div>
	`)	 
	})
}
function borrarTareaLocalStorage(tareaText) {
	let tareas, tareaBorrar;
	tareaBorrar = tareaText;
	tareas = obtenerTareasLocalStorage();
	tareas.forEach(function (tarea, index) {
		if (tareaBorrar === tarea.nombre) {
			tareas.splice(index, 1)
		}
	})
	localStorage.setItem('tareas', JSON.stringify(tareas));
}