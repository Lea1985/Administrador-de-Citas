// Campos del fomulario
const mascotaInput = document.querySelector('#mascota');

const propietarioInput = document.querySelector('#propietario');

const telefonoInput = document.querySelector('#telefono');

const fechaInput = document.querySelector('#fecha');

const horaInput = document.querySelector('#hora');

const sintomasInput = document.querySelector('#sintomas');



// UI
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

// Variable para el modo edicion

let editando;

// Objeto con informacio de la cita

const citaObj = {

    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}



// REgistros de eventos 
eventListeners();

function eventListeners() {

    mascotaInput.addEventListener('input', datosCita);

    propietarioInput.addEventListener('input', datosCita);

    telefonoInput.addEventListener('input', datosCita);

    fechaInput.addEventListener('input', datosCita);

    horaInput.addEventListener('input', datosCita);

    sintomasInput.addEventListener('input', datosCita);



    formulario.addEventListener('submit', nuevaCita);

}


// Funcioens

//  Agrega datos al objeto de cita
function datosCita(e) {

    citaObj[e.target.name] = e.target.value;

}

// valida y agrega una nueva cita a la clase de citas

function nuevaCita(e) {

    e.preventDefault();

    // Extraer la informacion del objeto
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar Campos

    if (mascota === '' || propietario === '' || telefono === "" || fecha === '' || hora === '' || sintomas === '') {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {

        console.log('Modo Edicion');

        // Pasar el objeto de la cita a modo edicion

        administrarCitas.editarCita({...citaObj });

        //  Mensaje de editado correctamente
        ui.imprimirAlerta('Se edito correctamente');

        // Cambiar el texto del boton

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';


        editando = false;


    } else {
        console.log('Nueva Cita');

        // Generar un identificador

        citaObj.id = Date.now();

        // Guardando una la nueva cita 

        administrarCitas.agregarCita({...citaObj });

        //  Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agrego correctamente');

    }


    // Reiniciando el formulario y el objeto princial de citas

    reiniciarObjeto();

    formulario.reset();

    // Mostar el HTML de la citas

    ui.imprimirCitas(administrarCitas);

}


function reiniciarObjeto() {

    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

function eliminarCita(id) {

    // Eliminar la cita

    administrarCitas.eliminarCita(id);
    // Muestra un mensaje

    ui.imprimirAlerta('La cita se ha eliminado exitosamente', 'success');

    // Refrescar las citas

    ui.imprimirCitas(administrarCitas);

}

// Carga los datos y el modo edicion

function editarCita(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;


    // Llenar los input

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;



    // LLenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    // Cambiar el texto del boton

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Campios';

    editando = true;
}


// Clases 

class UI {

    imprimirAlerta(mensaje, tipo) {

        // Crear el div
        const divMensaje = document.createElement('div');

        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base a tipo error

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');

        }

        // Mensaje de error

        divMensaje.textContent = mensaje;

        // Agregar al DOM

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //  Quitar el alerta desde de un tiempo

        setTimeout(() => { divMensaje.remove(); }, 3000);
    }


    imprimirCitas({ citas }) {

        this.limpiarHTML();

        citas.forEach((cita) => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-border');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario:</span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono:</span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha:</span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora:</span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas:</span> ${sintomas}`;

            // Boton para eliminar cita

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
          </svg>
          `;

            btnEliminar.onclick = () => eliminarCita(id);

            // Boton de editar

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
          `

            btnEditar.onclick = () => editarCita(cita);


            // Agregar los parrafos al divCita

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            // Agregar cita al HTML


            contenedorCitas.appendChild(divCita);


        })

    }

    limpiarHTML() {

        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}


class Citas {

    constructor() {
        this.citas = [];
    }


    agregarCita(cita) {

        this.citas = [...this.citas, cita];

        console.log(this.citas);

    }

    eliminarCita(id) {

        this.citas = this.citas.filter(cita => cita.id !== id);

    }

    editarCita(citaActual) {

        this.citas = this.citas.map(cita => cita.id === citaActual.id ? citaActual : cita);

    }

}

const ui = new UI();

const administrarCitas = new Citas();