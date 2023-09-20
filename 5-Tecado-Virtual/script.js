const keys = [
    [
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¡", "¿"],
        ["Backspace", "Backspace"]
    ],
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["`", "^"],
        ["+", "*"]
    ],
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["¨", "{"],
        ["º", "}"]
    ],
    [
        ["Shift", "Shift"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"]
    ],
    [["Space", "Space"]],
];

let mayus = false;
let shift = false;
let current = null;
const input = document.querySelector('.input');

renderKeyBoard();

function renderKeyBoard() {

    const keyboardContainer = document.querySelector('.keyboard_container');
    let empty = `<div class="key_empty"></div>`;

    const layers = keys.map((layer) => {

        return layer.map(key => {

            if (key[0] === 'Backspace') {

                return `<button class="key key_backspace">${key[0]}</button>`;
            }

            if (key[0] === 'Shift') {

                return `<button class="key key_shift ${shift ? 'activated' : ''}">${key[0]}</button>`;
            }

            if (key[0] === 'MAYUS') {
                return `<button class="key key_mayus ${mayus ? 'activated' : ''}">${key[0]}</button>`;
            }

            if (key[0] === 'Space') {
                return `<button class="key key_space"></button>`;
            }

            return `
                    <button class="key key_normal">
                    ${shift
                    ? key[1]
                    : mayus &&
                        key[1].toLowerCase().charCodeAt(0) >= 97 &&
                        key[0].toLowerCase().charCodeAt(0) <= 122
                        ? key[1]
                        : key[0]
                }</button >`;
        });
    });

    layers[1].unshift(empty);

    const htmlLayers = layers.map((layer) => {

        return layer.join("");
    });

    keyboardContainer.innerHTML = "";

    htmlLayers.forEach(layer => {

        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
    });

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', e => {

            if (current) {

                if (key.textContent === 'Backspace') {
                    let text = current.value;
                    current.value = text.substring(0, text.length - 1);

                } else if (key.textContent === 'Shift') {
                    shift = !shift;
                    renderKeyBoard();
                } else if (key.textContent === 'MAYUS') {
                    mayus = !mayus;
                    renderKeyBoard();

                } else if (key.textContent === "") {
                    current.value += " ";
                } else {
                    current.value += key.textContent.trim();
                    if (shift) {
                        shift = false;
                    }
                }
                renderKeyBoard();
                current.focus();
            }
        });
    });
}

document.querySelectorAll('input').forEach(input => {

    input.addEventListener('focusin', e => {
        current = e.target;
    });
});

