const tareas = [];
let tiempo = 0; 
let duracion = null;
let descanso = null;
let tarea_play_id = null;

const tarea_en_curso = document.querySelector('.tarea-en-curso');
const form = document.querySelector('.form');
const intro = document.querySelector('.intro');
const boton_agregar_tarea = document.querySelector('.boton-agregar-tarea');
const lista_tareas = document.querySelector('.lista-tareas');


form.addEventListener('submit', e => {

    e.preventDefault();
    if (intro.value != '') {

        crear_tarea(intro.value);
        render_tarea();
        intro.value = "";
    }
});

function crear_tarea(value) {

    const nueva_tarea = {
        id: (Math.random() * 100).toString(36).slice(3),
        texto: value,
        completado: false,
    }
    tareas.unshift(nueva_tarea);
}

function render_tarea() {

    const codigo_html = tareas.map(tarea => {

        return `<div class="tarea">
                      <div class="div-boton">${tarea.completado ? `<div class="exito">Exito!</div>` : `<input type="button" class="boton_tarea" value="Completar!" data-id="${tarea.id}"></input>`}</div>
                      <p>${tarea.texto}</p>
                </div>`
    });

    lista_tareas.innerHTML = codigo_html.join('');

    const botones_iniciar =  document.querySelectorAll('.boton_tarea');
    botones_iniciar.forEach(boton =>{

        boton.addEventListener('click', e =>{

            if(!duracion){
    
                const id = boton.getAttribute('data-id');
                IniciarBotonHandler(id);
                boton.value = 'En Proceso ...'
            }
        });
    }); 
}

function IniciarBotonHandler(id){

    tiempo = 5;
    tarea_play_id = id;
    const tarea_id = tareas.findIndex(tarea => tarea.id === id);
    tarea_en_curso.textContent = tareas[tarea_id].texto;

    renderizarTiempo();
    duracion = setInterval(()=>{

        tiempoHandler(id);
    },1000)
}

function tiempoHandler(id) {

    tiempo--;
    renderizarTiempo();

    if(tiempo == 0){

        clearInterval(duracion);
        tarea_play_id = null;
        tarea_en_curso.textContent = '---';
        marcarCompletada(id);
        duracion = null;
        render_tarea();
        iniciarDescanso();
    }
}

function renderizarTiempo() {

    const reloj = document.querySelector('.reloj');
    const minutos = parseInt(tiempo / 60);
    const segundos = parseInt(tiempo % 60);

    reloj.textContent = `${minutos < 10 ? '0':''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

function marcarCompletada(id) {

    const tarea_id = tareas.findIndex(tarea => tarea.id === id);
    tareas[tarea_id].completado = true;
}

function iniciarDescanso() {

    tiempo = 5;
    tarea_en_curso.textContent = 'Descanzo...!';

    renderizarTiempo();
    descanso = setInterval(() => {
        descansoHandler();
    }, 1000);
}

function descansoHandler() {
    
    tiempo--;
    renderizarTiempo();

    if(tiempo == 0){

        clearInterval(descanso);
        tarea_play_id = null;
        descanso = null;
        tarea_en_curso.textContent = '---';
        render_tarea();
    }

}