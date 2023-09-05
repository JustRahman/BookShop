api_products = [{
        "id": 1660,
        "name": "Amazon. От офиса в гараже до $10 млрд годового дохода",
        "image": "amazon-ot-ofisa-v-garazhe-do-10-mlrd-godovogo-dokhoda-876.jpg",
        "price": 399.9,
        "amount": 2,
    },
    {
        "id": 1709,
        "name": "Как работает Google",
        "image": "kak-rabotaet-google-223.jpg",
        "price": 399.9,
        "amount": 1,
    },
    {
        "id": 1708,
        "name": "Çay Kokulu Hikayeler",
        "image": "cay-kokulu-hikayeler-545.jpg",
        "price": 129.9,
        "amount": 2,
    },
    {
        "id": 1707,
        "name": "Sherlock Holmes Set",
        "image": "sherlock-holmes-set-662.jpg",
        "price": 699.9,
        "amount": 1,
    },
    {
        "id": 1706,
        "name": "Холодное сердце 2. Магия грёз",
        "image": "kholodnoe-serdtse-2-magiya-grez-291.jpg",
        "price": 299.9,
        "amount": 1,
    },
    {
        "id": 1705,
        "name": "Психология согласия",
        "image": "psikhologiya-soglasiya-479.jpg",
        "price": 349.9,
        "amount": 2,
    },
];



function updateCart() {
    var products = document.getElementById('products');
    products.innerHTML = "";

    var productsAmount = 0,
        productsPrice = 0;

    for (let i = 0; i < api_products.length; i++) {
        // product
        products.innerHTML += `<div class="row align-items-center my-2 my-sm-3 product">
                <div class="col-3 col-lg-2"><img src="img/` + api_products[i].image + `" alt="" class="img-fluid border rounded"></div>
                <div class="col"><div class="h5 mb-0">` + api_products[i].name + `</div></div>
                <div class="col-3 text-center">
                    <div class="text-primary font-weight-bold">` + (api_products[i].price * api_products[i].amount).toFixed(2) + ` <small>TMT</small></div>
                    <button class="btn btn-light btn-sm text-lg text-secondary" onclick="removeProduct(` + api_products[i].id + `)">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="col-auto text-center">
                    <button class="btn btn-light btn-sm text-lg text-secondary" onclick="increaseProduct(` + api_products[i].id + `)">
                        <i class="bi bi-caret-up-fill"></i>
                    </button>
                    <div class="font-weight-bold">` + api_products[i].amount + `</div>
                    <button class="btn btn-light btn-sm text-lg text-secondary" onclick="decreaseProduct(` + api_products[i].id + `)">
                        <i class="bi bi-caret-down-fill"></i>
                    </button>
                </div>
            </div>`;

        // calculate products amount
        productsAmount += parseInt(api_products[i].amount);
        // calculate products price
        productsPrice += parseFloat(api_products[i].price) * parseInt(api_products[i].amount);
    }
    if (api_products.length == 0) {
        products.innerHTML += `<div class="my-2 my-sm-3 w-50 mx-auto"><img src="img/not-found.gif" alt="" class="img-fluid rounded border mb-3">
        <div class="h3 text-danger text-monospace text-center rounded border w-100 p-2 mx-auto">Haryt tapylmady</div></div>`
    }


    var deliveryFee = productsPrice >= 2000 ? 0 : 20;
    var totalPrice = productsPrice + deliveryFee;

    document.getElementById('cart').textContent = productsAmount;
    document.getElementById('products-amount').textContent = productsAmount;
    document.getElementById('products-price').textContent = parseFloat(productsPrice).toFixed(2);
    document.getElementById('delivery-fee').textContent = deliveryFee.toFixed(2);
    document.getElementById('total-price').textContent = parseFloat(totalPrice).toFixed(2);
}

updateCart();

function emptyCart() {
    api_products = [];

    updateCart();
}

function removeProduct(id) {
    let index = api_products.findIndex(product => product.id === id);
    api_products.splice(index, 1)

    updateCart();
}

function increaseProduct(id) {
    let product = api_products.find(product => product.id === id);
    product.amount += 1

    updateCart();
}

function decreaseProduct(id) {
    let product = api_products.find(product => product.id === id);
    if (product.amount > 1) {
        product.amount -= 1
    } else {
        removeProduct(id);
    }

    updateCart();
}