
/*

22.22 position: absolute;

Fetzer 20241004Fri 1700-1900 Danny
gofundme/4695216b fund local rescuers not govt
thealexjonesstore.com drjonesnational.com
Maria Z of OZ/NZ at 1600bst infowarsstore.com


let shop = document.getElementById('shop');

let generateShop = () => {
  return(shop.innerHTML = `
  <div class = 'item' >
    <img width = '220' src = 'images/img-1.jpg' >
    <div class = 'details' >
      <h3>cash shirt</h3>
      <p>lorem7 parag</p>
      <div class = 'price-quantity' >
        <h2>$ 45</h2>
        <div class = 'buttons' >
          <i class = 'bi bi-dash-lg' ></i>
          <div class = 'quntity' >0</div>
          <i class = 'bi bi-plus-lg' ></i>
        </div>
      </div>
    </div>
  </div>

`)};

generateShop();

                   */



let shop = document.getElementById('shop');

console.log(shop);



let basket = JSON.parse(localStorage.getItem('data')) || [];

let generateShop = () => {
  return(shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((x) => x.id === id) || [];
    return  `

<div id = product-id-${id}  class = 'item' >
    <img width = '220' src = ${img} alt = '' >
    <div class = 'details' >
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class = 'price-quantity' >
        <h4>GB Sterling ${price}</h4>
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

    // eliminate zeroed item by saving nonzero item only
    basket = basket.filter((x) => x.item !== 0);
    
    /*  console.log(basket);    */
    
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
  localStorage.setItem('data', JSON.stringify(basket) );
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  /*  console.log(search.item);  */
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0);
};

calculation();




/*
911c2c.org Richard Gage, possibly recorded on 20240912Thu
The Family Industrial Complex 20240918Wed 2200BST = 1700EDT,
richardgage911.org

20240923Mon  Crypt Rick with his guest Marvin two yts=
Easing people into waking up
jointheinternet

20240924Tue GForum health connection WG? H2 of show at 1806
Scott - Original Hippocratic Oath dates back to 400BC
Pray for Scott for he will benefit from our energy

20240924Tue

No fuss cremation has risen in popularity by >500% since 2019
https://hybrid.goldenleaves.com/2024-report-july
                    */