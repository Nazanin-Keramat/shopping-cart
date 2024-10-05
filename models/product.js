// we want handel the basket with oop and class(in this we have method and property)
class products {
  constructor(parent, products, cart) {
    this.parent = parent;
    this.products = products;
    this.cart = cart;

    //parent is the section when we clicked on this add to cart happen! so we have a liitle cart processing in product (we give cartinstance to productinstance)
    this.parent.addEventListener("click", this);
  }
  // show product in section with this method - in this method we call the function which contain our JSX
  showProducts() {
    // i make createdCard for each product this function will run.
    //when we call showproduct we should put this. beforecreated card in order to mention this function related to its constructor(products) the compiler will search for created card in its constructor(product)
    this.products.forEach((product) => this.createdCard(product));
  }
  //   data is the entrance and each time it is contain one of our product
  createdCard(data) {
    //each product has their own div
    const cardEle = document.createElement("div");
    const imgEle = this.productImg(data);
    // result of imgele is string!
    cardEle.innerHTML = imgEle;
    //adding div to pur section
    const infoEle = this.productInfo(data);
    cardEle.innerHTML += infoEle;
    this.parent.appendChild(cardEle);
  }
  productImg(data) {
    const { image, alt } = data;
    const img = `<img alt=${alt} src=${image}>`;
    return img;
  }
  productInfo(data) {
    // destructure
    const { id, name, price } = data;
    const infoJSX = `
    <div id="product-info">
      <h3>${name}</h3>
        <div>
          <span>${price}</span>
          <button data-id=${id}>+</button>
        </div>
    </div>
    `;
    return infoJSX;
  }
  //when we click on the section with id product we want to go for button part!(beacuse button part is not exist firstly)
  handleEvent(event) {
    //target is what we click on!--><div data-id="2">+</div>
    const element = event.target;
    //on tag we can have .tagName method so we use it to understand the tagname (it is uppercase)!
    if (element.tagName === "BUTTON") {
      // we save id each button (with atribute HTML data- )in itself now we want to access them with element(at the moment element is BUTTON).dataset.id
      this.addToCard(element.dataset.id);
    }
  }
  addToCard(id) {
    //in this sitiation we want show our product instead of empty part
    //find our product in products !
    //this.products is array of object so we use find to find the product that has clicked on it.we use + to add it to past added list.
    const product = this.products.find((i) => i.id === +id);
    this.cart.products.push(product);
    this.cart.showProducts();
  }
}
// persmission to import products
export default products;
