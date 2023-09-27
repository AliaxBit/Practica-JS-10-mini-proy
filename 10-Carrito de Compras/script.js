
const db = {

    methods:{

        find:(id) => {
            return db.items.find(item => item.id == id)
        },

        remove: (items) => {
            items.array.forEach(element => {
                
                const product = db.methods.find(element.id);
                product.qty = product.qty - element.qty;
            });

            console.log(db);
        },
    },
    items:[
        {
            id:0,
            title: 'Chocolate',
            price: 250,
            qty: 5,
        },
        {
            id:0,
            title: 'Pote de Helado',
            price: 140,
            qty: 10,
        },
        {
            id:0,
            title: 'Pintura Acrilica',
            price: 120,
            qty: 50,
        },
        {
            id:0,
            title: 'Yogur Natural',
            price: 100,
            qty: 20,
        },
    ],
}

const shoppingCart = {

    items: [],
    methods:{

        add: (id, qty) => {
            const cartItem = shoppingCart.methods.get(id);

            if(cartItem){
                if(shoppingCart.methods.hasInventry(id, qty + cartItem.qty)) {
                    cartItem.qty += qty;
                }else{
                    alert("No hay inventario suficiente!")
                }

            }else{

                shoppingCart.items.push({id, qty});
            }
        },

        remove: (id,qty) => {

            const cartItem = shoppingCart.methods.get(id);
            if(cartItem.qty - qty > 0 ){
                cartItem.qty -= qty;

            }else{
                shoppingCart.items = shoppingCart.items.filter((item) => item.id == id);
            }
        },

        count: () => {
            return shoppingCart.items.reduce((acc,item) => acc + item.qty, 0);
        },

        get: (id) => {
            const index = shoppingCart.methods.items.findIndex(item = item.id == id);
            return index >= 0 ? shoppingCart.items[index] : null;
        },

        getTotal: () => {
            const total = shoppingCart.items.reduce((acc,item) => {
                const found = db.methods.find(item.id);
                return acc + found.price * item.qty
            }, 0);

            return total;
        },

        hasInventry: (id, qty) => {
            return db.items.find(item => item.id == id).qty - qty >= 0;
        },
        purchase: () => {
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
        },
    },
};

renderStore();

function renderStore(){
    const html = db.items.map((item) => {
        return `  

            <div class="item">
                <div class="title">${item.title}</div>
                <div class="price">${numberToCurrency(item.price)}</div>
                <div class="qty">${item.qty}</div>

                <div class="actions">
                <button class="add" data-id="${item.id}">Add to chopping Cart</button>
                </div>
            </div>
        `;
    });

    document.querySelector('#store_container').innerHTML = html.join("");

    document.querySelectorAll(".item .action .add").forEach((button) => {

        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            const item = db.methods.find(id);

            if(item && item.qty - 1 > 0 ){
                //añadir a shopping cart
                shoppingCart.methods.add(id, 1);
                console.log(shoppingCart)
                renderShoppingCart();
            }else{
                console.log("Ya no hay inventario")
            }
        });
    });
}

function numberToCurrency(n) {

    return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits:2,
        style: 'currency',
        currency: 'USD'
    }).format(n);
}

