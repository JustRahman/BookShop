var api_books = [
    {
        "id": 1709,
        "name": "Как работает Google",
        "image": "kak-rabotaet-google-223.jpg",
        "price": 399.9,
        "amount": 2,
    },
    {
        "id": 1708,
        "name": "Çay Kokulu Hikayeler",
        "image": "cay-kokulu-hikayeler-545.jpg",
        "price": 129.9,
        "amount": 3,
    },
    {
        "id": 1707,
        "name": "Sherlock Holmes Set",
        "image": "sherlock-holmes-set-662.jpg",
        "price": 699.9,
        "amount": 4,
    },
    {
        "id": 1705,
        "name": "Психология согласия",
        "image": "psikhologiya-soglasiya-479.jpg",
        "price": 349.9,
        "amount": 2,
    },
];

function updateBooks() {
    if (api_books.length > 0) {
        let books = '';
        for (let i = 0; i < api_books.length; i++) {
            const book = api_books[i];
            books += `
            <div class="col my-1 my-sm-2">
                <a href="#" title="` + book['name'] + `">
                    <img src="img/` + book['image'] + `" alt="` + book['name'] + `" class="img-fluid border rounded">
                </a>
                <a href="#" title="` + book['name'] + `" class="d-block h6 text-dark font-weight-normal text-decoration-none my-1 my-sm-2">` + book['name'] + ` (` + book['amount'] + `)</a>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="h6 text-primary font-weight-bold">` + book['price'].toFixed(2) + ` <small>TMT</small></div>
                    <div>
                        <button class="d-inline btn btn-light btn-sm text-danger border rounded-pill" onclick="decrease(this);" value="` + book['id'] + `" disabled>
                            <i class="bi bi-dash-lg"></i>
                        </button>
                        <span class="font-weight-bold text-dark border rounded-pill p-1">0</span>
                        <button class="d-inline btn btn-light btn-sm text-danger border rounded-pill" onclick="increase(this);" value="` + book['id'] + `">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById('books').innerHTML = books;
    } else {
        document.getElementById('not_found').innerHTML = `<div class="col my-1 my-sm-2"><img src="img/not-found.gif" alt="" class="img-fluid border rounded"></div>`
    }
}

function increase(e) {
    // butonyn valuesy aldyk
    var value = parseInt(e.getAttribute('value'));

    // butonyn valuesy api_booksdan book tapdyk
    var book = api_books.find(x => x.id === value);
    
    // butonyn yanyndaky sany aldyk
    var span = e.previousElementSibling;
    var spanAmount = parseInt(span.textContent);

    // api_booksdaky bookyn amounty bilen butonyn yanyndaky sany denesdirdik
    if (book.amount > spanAmount) {
        // sebet sanyny kopeltdik
        var cart = document.getElementById('cart');
        var cartCount = parseInt(cart.textContent);
        cart.textContent = cartCount + 1;
        
        // butonyn yanyndaky sany kopeltdik 
        span.textContent = spanAmount + 1;

        // butona yasyl effect berdik 
        e.classList.remove('btn-light');
        e.classList.remove('text-danger');
        e.classList.add('btn-success');
        setTimeout(function() {
            e.classList.remove('btn-success');
            e.classList.add('btn-light');
            e.classList.add('text-danger');
        },  1 * 500)

        // minus butony acdyk
        var decreaseButton = span.previousElementSibling;
        decreaseButton.removeAttribute('disabled');

        // api_booksdaky bookyn amounty bilen butonyn yanyndaky taze sany denesdirdik
        if (!(book.amount > spanAmount+1)) {
            e.setAttribute('disabled', true);
        }
    } else {
        // butona gyzyl effect berdik 
        e.classList.remove('btn-light');
        e.classList.remove('text-danger');
        e.classList.add('btn-danger');
        setTimeout(function() {
            e.classList.remove('btn-danger');
            e.classList.add('btn-light');
            e.classList.add('text-danger');
        },  1 * 500)
    }
    
}

function decrease(e) {
    // butonyn yanyndaky sany aldyk
    var span = e.nextElementSibling;
    var spanAmount = parseInt(span.textContent);

    // butonyn yanyndaky sany 0-dan ulymy diyip denesdirdik
    if (spanAmount > 0) {
        // sebet sanyny azaltdyk
        var cart = document.getElementById('cart');
        var cartCount = parseInt(cart.textContent);
        cart.textContent = cartCount - 1;
        
        // butonyn yanyndaky sany azaltdyk 
        span.textContent = spanAmount - 1;

        // butona yasyl effect berdik 
        e.classList.remove('btn-light');
        e.classList.remove('text-danger');
        e.classList.add('btn-success');
        setTimeout(function() {
            e.classList.remove('btn-success');
            e.classList.add('btn-light');
            e.classList.add('text-danger');
        },  1 * 500)

        // plus butony acdyk
        var increaseButton = span.nextElementSibling;
        increaseButton.removeAttribute('disabled');

        // butonyn yanyndaky taze sany 0-dan ulymy diyip denesdirdik
        if (!(spanAmount > 1)) {
            e.setAttribute('disabled', true);
        }
    } else {
        // butona gyzyl effect berdik 
        e.classList.remove('btn-light');
        e.classList.remove('text-danger');
        e.classList.add('btn-danger');
        setTimeout(function() {
            e.classList.remove('btn-danger');
            e.classList.add('btn-light');
            e.classList.add('text-danger');
        },  1 * 500)
    }
    
}

updateBooks();