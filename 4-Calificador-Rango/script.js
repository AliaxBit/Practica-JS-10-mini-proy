const contendedor_rango = document.querySelector('.rango');
let valor_actual = 0;
const limite = 10;

const html = Array.from(Array(limite)).map((_, i) => {

    return `<div class="objeto objeto-${i}" dato-pos="${i}"></div>`
});

contendedor_rango.innerHTML = html.join("");

document.querySelectorAll('.objeto').forEach(objeto => {

    objeto.addEventListener('mouseover', (e) => {

        const posicion = objeto.getAttribute('dato-pos');

        if (valor_actual === parseInt(posicion) + 1) {
            return;
        }

        document.querySelectorAll('.objeto').forEach(obj => {
            if (obj.classList.contains('objeto_lleno')) {

                obj.classList.remove('objeto_lleno');
            }
        });

        for (let i = 0; i <= posicion; i++) {
            const pos = document.querySelector(`.objeto-${i}`);
            if (!pos.classList.contains('objeto_lleno')) {
                pos.classList.add('objeto_lleno');
            }
        }
        valor_actual = parseInt(posicion) + 1;
    });

    objeto.addEventListener('click', (e) => {
        const posicion = objeto.getAttribute('dato-pos');
        valor_actual = parseInt(posicion) + 1;
        console.log(valor_actual);
    });
});