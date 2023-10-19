import { foods, juices } from './data.js';
let ordersArray = [];

//chosed will stock the categorie chosed
let chosed = "";

renderChosedRadio();

document.querySelector(".select").addEventListener("change", function() {
    renderChosedRadio();
})


function renderChosedRadio() {
    const chosedCategorie = document.querySelector("input[type='radio']:checked");
    if (chosedCategorie.id === "foods") {
        render(foods);
        chosed = foods;
    } else if (chosedCategorie.id === "juices") {
        render(juices);
        chosed = juices;
    }
}


function render(categorie) {
    let renderString = "";
    for (const item of categorie) {
        renderString += `
                        <section class="items">
                            <div class="img-section">
                                <img src="${item.image}" alt="${item.name}" >
                            </div>
                            <div class="item-details">
                                <div class="details-section">
                                    <h3 class="title">${item.name}</h3>
                                    <p class="ingredients lite">${item.ingredients}</p>
                                    <p class="price">$${item.price}</p>
                                </div>
                                <div class="add-btn-section">
                                    <button class="add" data-add="${item.id}"> +</button>
                                </div>
                            </div>
                        </section>
   `
    }
    document.querySelector(".rendering-section").innerHTML = renderString;

}


document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        let clickedItem = whoClicked(e, chosed);
        addingOrdersToArray(clickedItem, ordersArray);
    } else if (e.target.dataset.remove) {
        let clickedItem = handleRemoves(e);
        clickedItem.repeated--;
    }

    renderOrderedItems(ordersArray);
    renderTotalPrice(ordersArray);

});

function whoClicked(e, categorie) {
    const clickedItem = categorie.filter(function(item) {
        return (item.id == e.target.dataset.add);
    })[0]
    return clickedItem;
}

function addingOrdersToArray(clickedItem, ordersArray) {
    if (!ordersArray.includes(clickedItem)) {
        ordersArray.push(clickedItem);
    }
    clickedItem.repeated++;

}

function renderOrderedItems(ordersArray) {
    let ordersString = "";
    for (const order of ordersArray) {
        if (order.repeated > 0) {
            ordersString += `
                        <div class="orders" data-remove="${order.id}">
                            <p data-remove="${order.id}"><span class="repeated">${order.repeated}</span> ${order.name}</p>
                            <p class="price" data-remove="${order.id}">$${order.price}</p>
                        </div>
                        `
        }
    }
    document.querySelector(".orders-section").innerHTML = ordersString;
}



function renderTotalPrice(ordersArray) {
    let result = 0;
    ordersArray.forEach(function(order) {
        result += (order.price * order.repeated);
    });
    document.querySelector(".total-price").innerHTML = `$${result.toFixed(1)}`;
}



function handleRemoves(e) {
    // concatArrays is the concatination of all categories arrays (if you want to add another categorie use: foods.concat(juices,array3,array4) and so one)
    const concatArrays = foods.concat(juices);
    const clickedItem = concatArrays.filter(function(item) {
        return (item.id == e.target.dataset.remove);
    })[0]
    return clickedItem;
}



document.querySelector(".up").addEventListener("click", function showPriceBar() {
    document.querySelector("main").classList.toggle("padd-bot");
    document.querySelector(".fa-caret-up").classList.toggle("hide-me");
    document.querySelector(".fa-caret-down").classList.toggle("hide-me");
    setTimeout(() => {
        document.querySelector(".show-or-hide").classList.toggle("hide-me");
    }, 100);
})

document.querySelector(".complete-order").addEventListener("click", function callTheForm() {
    document.querySelector(".last-form").classList.remove("hide-me");
    hideDivs();
})


document.querySelector(".submit").addEventListener("click", function(e) {
    e.preventDefault();
    //declarations
    const name = document.querySelector("#name");
    const cardNum = document.querySelector("#card-num");
    const cvv = document.querySelector("#cvv");
    const form = document.querySelector(".last-form");
    //grabing the data if it's there
    if (isEmpty(name.value) || isEmpty(cardNum.value) || isEmpty(cvv.value)) return;
    let formData = getFormData(form);
    //clearing the input fields
    name.value = "";
    cardNum.value = "";
    cvv.value = "";
    //showing the validation message 
    renderMessg(formData);
    document.querySelector(".last-form").classList.add("hide-me");
   
   
})

function getFormData(form) {
    let data = new FormData(form);
    return {
        name: data.get("name"),
        cardNum: data.get("card-num"),
        cvv: data.get("cvv")
    }
}

function renderMessg(formData) {
    const msg = document.createElement("div");
    msg.classList.add("msg");
    msg.classList.add("notpop");
    document.querySelector("body").append(msg);
    msg.innerHTML = `
     <p> Thanks, ${formData.name}! Your order is on its way!</p>
     `;
    //adding the animation to msg
    setTimeout(() => {
        msg.classList.add("pop");
    }, 300);
    //hidding msg after a certain time
    setTimeout(() => {
        msg.classList.add("hidden");
    }, 2300);
    //showing the home page again after a certain time
    setTimeout(() => {
        msg.classList.add("hidden");
        ordersArray = [];
        renderChosedRadio();
        showDivs();
    }, 5000);

}


function isEmpty(str) {
    return (!str.trim().length);
}


function showDivs() {
    document.querySelector("header").classList.remove("hide-me");
    document.querySelector("main").classList.remove("hide-me");
    document.querySelector("footer").classList.remove("hide-me");
}

function hideDivs() {
    document.querySelector("header").classList.add("hide-me");
    document.querySelector("main").classList.add("hide-me");
    document.querySelector("footer").classList.add("hide-me");
}