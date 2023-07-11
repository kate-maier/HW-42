// Модифікувати інтернет-магазин таким чином, щоб була можливість переглянути всі збережені 
// замовлення навіть після оновлення сторінки (використовувати localStorage).
// На сторінці спочатку крім списку категорій відображається також кнопка “мої замовлення”.
// При кліку на “мої замовлення” - пропадають категорії та відображається список усіх 
// замовлень користувача (дата та ціна) - при кліку на замовлення - “розгортаються” деталі замовлення.
// Реалізувати можливість видалення замовлення зі списку.


const catalog = document.querySelectorAll('.products__catalog-item');
const productsNames = document.getElementById('productsNames');

const productsInfoCards = document.getElementById('productsInfoCards');

const buyBtn = document.getElementById('buyBtn');
const form = document.getElementById('form');
const aboutOrder = document.getElementById('aboutOrder');

let choosedProduct;
let productPrice;


let products = [
    {
        category: 'smartphones',
        name: 'iPhone 14 Pro Max',
        info: 'Як в попередньому поколінні, iPhone 14 Pro Max найбільший та найавтономніший смартфон лінійки Pro. Діагональ дисплея пристрою становить 6,7 дюймів, виконаний за технологією OLED Super Retina XDR. Саме на дисплеї видно найбільшу інновацію 2022 року в смартфонах Apple для покращення взаємодії з користувачем «Dynamic Island».',
        price: '50 000 грн'
    },
    {
        category: 'smartphones',
        name: 'Xiaomi Redmi Note 12 Pro',
        info: 'Смартфон Xiaomi Redmi Note 12 Pro має якості справжнього лідера в всьому. Передова камера професійного рівня 108 Мп дарує чудові можливості для фото та відео зйомки. Насолоджуйтесь супер-чіткою та яскравою картинкою на 6.67-дюймовому FHD AMOLED дисплеї з частотою оновлення 120 Гц.',
        price: '15 000 грн'
    },
    {
        category: 'laptops',
        name: 'APPLE MacBook Air 15',
        info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis tenetur adipisci omnis eos vel in?',
        price: '70 000 грн'
    },
    {
        category: 'laptops',
        name: 'Lenovo Ideapad Gaming 3 15IHU6',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum, dolorem repudiandae laboriosam voluptas officia voluptate, libero, corrupti adipisci in harum eos et nobis nostrum.',
        price: '35 000 грн'
    },
    {
        category: 'laptops',
        name: 'ASUS M6500QH-HN081',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique deserunt facere beatae maiores quas corrupti molestias animi laborum modi magni quod doloremque, dolorum necessitatibus rerum qui fuga blanditiis, esse ipsam.',
        price: '30 000 грн'
    },
    {
        category: 'televisors',
        name: 'Телевізор SAMSUNG QE50Q60BAUXUA',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        price: '32 000 грн'
    },
    {
        category: 'televisors',
        name: 'Телевізор LG 50UQ81006LB',
        info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, nisi, laboriosam qui delectus iusto mollitia omnis necessitatibus ex accusantium blanditiis hic non, molestias rem ipsum.',
        price: '21 000 грн'
    }
];


catalog.forEach((catalogItem) => {
    catalogItem.addEventListener('click', (event) => {
        productsNames.innerHTML = '';
        productsInfoCards.innerHTML = '';
        aboutOrder.innerHTML = '';

        let target = event.target;
        const catalogItemId = target.id;

        form.style.display = 'none';

        products.forEach((product) => {
            if (product.category === catalogItemId) {
                let category = document.createElement('p');
                category.textContent = product.name;
                category.classList.add('products__card');
                productsNames.appendChild(category);

                category.addEventListener('click', (event) => {
                    productsInfoCards.innerHTML = '';
                    aboutOrder.innerHTML = '';
                    form.style.display = 'none';


                    let target = event.target;
                    let name = target.textContent;

                    products.forEach((product) => {

                        if (product.name === name) {
                            let info = document.createElement('p');
                            info.textContent = product.info;
                            info.classList.add('products__product-info');
                            productsInfoCards.appendChild(info);

                            let price = document.createElement('span');
                            price.textContent = product.price;
                            price.classList.add('products__price');
                            productsInfoCards.appendChild(price);

                            choosedProduct = target.textContent;
                            productPrice = product.price;
                        }
                    })

                    let button = document.createElement('button');
                    button.classList.add('products__button');
                    button.textContent = 'Купити';
                    button.id = 'btn';
                    productsInfoCards.appendChild(button);

                    addButtonEvent();
                })
            }
        })
    }
    )
})

function addButtonEvent() {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        let message = document.createElement('p');
        message.classList.add('message');
        message.textContent = 'Товар додано в корзину';
        productsInfoCards.appendChild(message);

        btn.setAttribute('disabled', 'disabled');

        const orderingProduct = document.getElementById('orderingProduct');
        orderingProduct.textContent = `Продукт: ${choosedProduct}`;

        setTimeout(() => {
            form.style.display = 'flex';
        }, 1500)
    })
}

// функція для змінення формату дати
function formatDate(date) {

    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = date.getFullYear() % 100;
    if (year < 10) {
        year = '0' + year;
    }

    let hours = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return day + '.' + month + '.' + year + ', ' + hours + ':' + minutes + ':' + seconds;
}


const btnSaveForm = document.getElementById('btnSaveForm');

btnSaveForm.addEventListener('click', () => {

    // отримання даних з інпутів
    const userFullName = document.getElementById('fullName').value;

    const townSelect = document.getElementById('town');
    const userTown = townSelect.options[townSelect.selectedIndex].textContent;

    const postOffice = document.getElementById('postOffice').value;

    const paymentTypes = document.querySelectorAll('input[type="radio"]');
    let paymentType;

    paymentTypes.forEach(function (type) {
        if (type.checked) {
            let id = type.id;
            let label = document.querySelector(`label[for="${id}"]`);
            paymentType = label.textContent;
        }
    })

    const amountProdacts = document.getElementById('amountProdacts').value;

    const userComments = document.getElementById('userComments').value;

    //перевірка введених значень
    if ((userFullName.trim() === '') || (postOffice.trim() === '') || (paymentType.trim() === '') || (amountProdacts.trim() === '')) {
        alert('Заповніть обовязкові поля');
        return false;
    }

    if (isNaN(+postOffice)) {
        alert('Вкажіть цифру в полі "номер складу"');
        return false;
    }

    if (isNaN(+amountProdacts)) {
        alert('Вкажіть цифру в полі "кількість товару"');
        return false;
    }

    //вивід інформації про замовлення
    aboutOrder.style.display = 'block';
    aboutOrder.innerHTML = `<h2>Дані для відправки:</h2>
    <span>Обраний продукт: ${choosedProduct}.</span><br>
    <span>Ім'я отримувача: ${userFullName}.</span><br>
    <span>Місто: ${userTown}. </span><br>
    <span>Відділення пошти: ${postOffice}. </span><br>
    <span>Вид оплати: ${paymentType}. </span><br>
    <span>Кількість продукції: ${amountProdacts} </span><br>
    <span>Коментарі: ${userComments}</span>`;

    // збереження замовлення в localStorage
    let userOrder = {
        userFullName,
        userTown,
        postOffice,
        paymentType,
        amountProdacts,
        userComments,
        productPrice,
        choosedProduct,
        'date': formatDate(new Date())
    };

    let userOrders = localStorage.getItem('userOrders');

    if (!userOrders) {
        userOrders = [];
    } else {
        userOrders = JSON.parse(userOrders);
    }

    userOrders = userOrders.filter(order => order !== null);

    userOrders.push(userOrder);

    localStorage.setItem('userOrders', JSON.stringify(userOrders));

})


const userOrdersHeading = document.getElementById('userOrdersHeading');
const mainCatalog = document.getElementById('mainCatalog');
const orderingForm = document.getElementById('orderingForm');

const orders = document.getElementById('orders');

// виведення всіх замовлень на сторінку
userOrdersHeading.addEventListener('click', () => {
    mainCatalog.style.display = 'none';
    orderingForm.style.display = 'none';

    orders.innerHTML = '';

    let userOrders = JSON.parse(localStorage.getItem('userOrders'));


    for (let i = 0; i < userOrders.length; i++) {

        if (userOrders[i] === null) {
            continue;
        }

        let date = userOrders[i].date;
        let price = userOrders[i].productPrice;

        let choosedProduct = userOrders[i].choosedProduct;
        let userFullName = userOrders[i].userFullName;
        let userTown = userOrders[i].userTown;
        let postOffice = userOrders[i].postOffice;
        let paymentType = userOrders[i].paymentType;
        let amountProdacts = userOrders[i].amountProdacts;

        const displayDate = document.createElement('div');
        displayDate.classList.add('orders-history__date');

        displayDate.innerHTML = `<p>Дата замовлення: ${date}</p>
        <p>Ціна: ${price}</p>
        <div class='orders-history__add-date'>
        <p>Продукт: ${choosedProduct}</p>
        <p>Ім'я отримувача: ${userFullName}</p>
        <p>Місто: ${userTown}</p>
        <p>Відділення пошти: ${postOffice}</p>
        <p>Вид оплати: ${paymentType}</p>
        <p>Кількість продукції: ${amountProdacts}</p>
        </div>
        <p class='orders-history__more-info'>детальніше...</p>
        <button class='orders-history__date-btn'>X</button>`;

        orders.appendChild(displayDate);


        displayDate.addEventListener('click', () => {
            displayDate.querySelector('.orders-history__add-date').classList.toggle('open');
            displayDate.querySelector('.orders-history__more-info').classList.toggle('open');
        })

        // видалення замовлень з localStorage та зі сторінки
        let orderBtn = displayDate.querySelector('.orders-history__date-btn');
        orderBtn.addEventListener('click', () => {
            displayDate.remove();
            let userOrders = JSON.parse(localStorage.getItem('userOrders'));
            delete userOrders[i];
            localStorage.setItem('userOrders', JSON.stringify(userOrders));
        })
    }
})
