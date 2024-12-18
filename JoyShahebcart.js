

let label = document.getElementById('label');

// target id of the html element 'shop-cart'
let shoppingCart = document.getElementById('shop-cart');


let basket = JSON.parse(localStorage.getItem('data')) || [];


// # of items in red square  NB THIS FAILS TO UPDATE ALL TABS AND IT OUGHT TO
let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0);
};

calculation();


// card in the cart fn
let generateCartItems = () => {
  if (basket.length !== 0) {

    // logic to show storecart.htm if the cart has content
    return (shoppingCart.innerHTML = basket.map((x) => {

      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];

      return `
        <div class = 'cart-item'>
          <div class = 'pic-button-x' >
            <img width = '100'  src = ${search.img} alt = '' title = '' />

            <div class = 'buttons' >
              <i onclick = 'decrement(${x.id})' class = 'bi bi-dash-lg' ></i>
              <div id = ${x.id}  class = 'quantity' >${item}</div>
              <i onclick = 'increment(${x.id})' class = 'bi bi-plus-lg' ></i>
            </div>

            <i onclick = 'removeItem(${id})' class = 'bi bi-x' ></i>

          </div>

          <div class = 'linename-price' >
            <p class = 'cartParag' >${search.name}</p>
            <span class = 'cart-item-pric' >GBP ${search.price.toFixed(2)}</span>
          </div>

          <div class = 'myownformat' >
            <p>Line total = GB Sterling ${(item * search.price).toFixed(2)}</p>
          </div>

        </div>
        `;
    }).join('')
    );
  }
  else {
    // logic to depict storecart.htm if the cart is empty
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h3>Your cart is empty</h3> <br><br><br>
      <a href = 'store.htm' target = '_blank' >
        <button class = 'retstor'>return to store</button>
      </a>
      `;
  }
}

generateCartItems();


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  //rerender the cart in ordr to get increment to work
  generateCartItems();

  update(selectedItem.id);

  //update local storage repository
  localStorage.setItem('data', JSON.stringify(basket) );
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else
    if (search.item === 0) return;
    else {
    search.item -= 1;
    }
  
    update(selectedItem.id);

    // eliminate zeroed item by saving nonzero item only
    basket = basket.filter((x) => x.item !== 0);

    //after that, refresh the cart using
    generateCartItems();
    localStorage.setItem('data', JSON.stringify(basket) );
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  /*  console.log(search.item);  */
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};


let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);

  //after that, refresh the cart using
  generateCartItems();

  //update the retail grand total
  totalAmount();

  //then update # of total items in red sq
  calculation();

  //update local storage repository
  localStorage.setItem('data', JSON.stringify(basket) );

}

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      // destructure x, or break x down
      let { item, id } = x;

      // see whether id in basket and id in the database match up
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
      

    }).reduce((x, y) => x+y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total bill : $ ${amount} </h2>
    <button class = 'checkout' >cheakout</button>
    <button onclick = 'clearCart()' class = 'removeAll' >rem the lot</button>
    `;

  }
  else return;
}

totalAmount();

let clearCart = () => {
  basket = [];
  generateCartItems();
  
  //then update # of total items in red sq
  calculation();

  localStorage.setItem('data', JSON.stringify(basket) );  
}

