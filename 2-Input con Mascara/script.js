const input_tarjeta = document.getElementById('text_numero_tarjeta');
const input_fecha = document.getElementById('text_numero_fecha');
const input_cvv = document.getElementById('text_numero_cvv');

const mascara_numero = '####-####-####-####';
const mascara_fecha = '##/##';
const mascara_cvv = '###';

let utilizando = '';
let numero_tarjeta = [];
let numero_fecha = [];
let numero_cvv = [];

input_tarjeta.addEventListener('keydown', (e) => {

    if (e.key === "Tab") {
        return;
    }

    e.preventDefault();
    escucha_input(mascara_numero, e.key, numero_tarjeta)
    input_tarjeta.value = numero_tarjeta.join('');
});


input_fecha.addEventListener('keydown', (e) => {

    if (e.key == "Tab") {
        return;
    }

    e.preventDefault();
    escucha_input(mascara_fecha, e.key, numero_fecha)
    input_fecha.value = numero_fecha.join('');
});

input_cvv.addEventListener('keydown', (e) => {

    if (e.key == "Tab") {
        return;
    }

    e.preventDefault();
    escucha_input(mascara_cvv, e.key, numero_cvv)
    input_cvv.value = numero_cvv.join('');
});

function escucha_input(mascara, key, arreglo) {
    let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (key === "Backspace" && arreglo.length > 0) {
        arreglo.pop();
        return;
    }

    if (numeros.includes(key) && arreglo.length + 1 <= mascara.length) {
        if (mascara[arreglo.length] == '-' || mascara[arreglo.length] == '/') {
            arreglo.push(mascara[arreglo.length], key);
        } else {
            arreglo.push(key);
        }
    }
} 