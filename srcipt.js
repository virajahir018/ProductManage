let form = document.getElementById('addCard')
let name = document.getElementById('name')
let price = document.getElementById('iPrice')
let category = document.getElementById('iCategory')
let url = document.getElementById('url')
let listCard = document.querySelector('.listCard')


// Update

let updateIndex = null;

let uForm = document.getElementById('uaddCard')
let uName = document.getElementById('uname')
let uPrice = document.getElementById('uiPrice')
let uCategory = document.getElementById('uiCategory')
let uUrl = document.getElementById('uurl')


form.addEventListener('submit', (e) => {
    e.preventDefault();

    

    const product = {
        name: name.value,
        price: Number(price.value),
        category: category.value,
        url: url.value
    }

    let data = JSON.parse(localStorage.getItem('product')) || [];
    data.push(product);
    localStorage.setItem('product', JSON.stringify(data));
    form.reset();
    displayData()
})


const displayData = () => {

    let data = JSON.parse(localStorage.getItem('product'));
    let recordData = '';

    data.forEach((item, i) => {
        let row = ` 
            <div class="card">
                <img src="${item.url}" width="50">

                <div class="cardDetails">
                    <h3 class="productName">${item.name}</h3>
                    <h4 class="price">₹ ${item.price}</h4>
                    <h4 class="category">${item.category}</h4>

                    <div class="cardButtons">
                        <button onclick="editRecord(${i})">Edit</button>
                        <button class="delete" onclick="deleteRecord(${i})">Delete</button>
                    </div>
                </div>
            </div>
            `;
        recordData += row;

    });

    listCard.innerHTML = recordData;
};


displayData();


function deleteRecord(index) {

    let data = JSON.parse(localStorage.getItem('product'));

    data.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(data));
    displayData();
}


function editRecord(index) {

    let data = JSON.parse(localStorage.getItem('product'));
    let record = data.find((v, i) => i == index);

    document.getElementById('addCard').style.display = "none" 
    document.getElementById('uaddCard').style.display = "block"

    uName.value = record.name;
    uPrice.value = Number(record.price);
    uCategory.value = record.category;
    uUrl.value = record.url;

    updateIndex = index;
};


uForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem('product'));

    data[updateIndex] = {
        name: uName.value,
        price: uPrice.value,
        category : uCategory.value,
        url: uUrl.value
    };

    localStorage.setItem('product', JSON.stringify(data));
    displayData();

    updateIndex = null;

    document.getElementById('uaddCard').style.display = "none"
    document.getElementById('addCard').style.display = "block"
})
