


let shop = document.getElementById('shop');

console.log(shop);



let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
  return(shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((x) => x.id === id) || [];
    return  `

<div id = product-id-${id}  class = 'item' >
    <img width = '200' src = ${img} alt = ${desc} title = ${desc} >
    <div class = 'details' >
      <h3 class = 'darkcolor' >${name}</h3>
      <p>${desc}</p>
      <div class = 'price-quantity' >
        <p>GB Sterling <span class = 'pricefig' ><br>${price.toFixed(2)}</span></p>
        <div class = 'buttons' >
          <i onclick = 'decrement(${x.id})' class = 'bi bi-dash-lg' ></i>
          <div id = ${x.id}  class = 'quantity' >
          ${search.item === undefined ? 0 : search.item}
          </div>
          <i onclick = 'increment(${x.id})' class = 'bi bi-plus-lg' ></i>
        </div>
      </div>
    </div>
</div>

`;
}).join(''));
};


// generateShop sets out our stall
generateShop();


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

    // eliminate zeroed item by saving nonzero items only
    basket = basket.filter((x) => x.item !== 0);
    
    /*  console.log(basket);    */

    //update local storage repository    
    localStorage.setItem('data', JSON.stringify(basket) );
};


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
  
  /*   console.log(basket);   */
  update(selectedItem.id);

  //update local storage repository
  localStorage.setItem('data', JSON.stringify(basket) );
};


// Update cart content after user changes
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  /*  console.log(search.item);  */
  document.getElementById(id).innerHTML = search.item;

  // update # of total items in the basket red sq
  calculation();
};


let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0);
};


calculation();


