//at this file we want to handel cart section (adding , total price , list product)
class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    //for handel empty we create this part .when user click in each product it goes in this section.
    this.products = [];
    //for avoidding the repetition we make another array to show it
    this.toShow = [];
    //
    this.parent.addEventListener("click", this);
  }
  showProducts() {
    this.toShow = [...new Set(this.products)];
    //instead of empty we write nothing!
    this.parent.innerHTML = "";
    //bellow product is Non-recurrence . we compare
    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;
      let oneProduct = product;
      this.createdCard(oneProduct, qty);
      this.calculateTotalPrice();
    });
  }
  createdCard(data, qty) {
    const cardEle = document.createElement("div");

    const imgEle = this.productImg(data);
    const infoEle = this.productInfo(data);
    const controlEle = this.productControl(data, qty);

    cardEle.innerHTML = imgEle;
    cardEle.innerHTML += infoEle;
    cardEle.innerHTML += controlEle;

    this.parent.appendChild(cardEle);
  }
  productImg(data) {
    const { image, alt } = data;
    const imgJSX = `<img alt="${alt}" src="${image}"/>`;
    return imgJSX;
  }
  productInfo(data) {
    //price and name
    const { name, price } = data;
    const infoJSX = `
            <div id="cart-info">
                <h4>${name}</h4>
                <p>${price}</p>
            </div>
        `;
    return infoJSX;
  }
  //for + and -
  productControl(data, qty) {
    const { id } = data; //we should know the id especially for + and - happen for which one of our product?
    const controlJSX = `
            <div id="cart-control">
                <div>
                    <button data-id=${id}>-</button>
                    <span>${qty}</span>
                    <button data-id=${id}>+</button>
                </div>
            </div>
        `;
    return controlJSX;
  }
  handleEvent(event) {
    const tagName = event.target.tagName;
    const id = event.target.dataset.id;
    const type = event.target.innerText;
    console.log(type);
    if (tagName !== "BUTTON") return;
    switch (type) {
      case "+":
        this.increase(id);
        break;
      case "-":
        if (type == "-") {
          addEventListener("click", () => {
            if (this.products.length == 0) {
              this.price.innerText = "$" + 0;
            }
          });
        }
        this.decrease(id);
        break;
    }
  }

  increase(id) {
    const product = this.products.find((p) => p.id === +id);
    this.products.push(product);
    this.showProducts();
  }
  decrease(id) {
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, 1);
    this.showProducts();
  }
  calculateTotalPrice() {
    const total = this.products.reduce((acc, cur) => (acc += cur.price), 0);
    this.price.innerText = "$" + total;
  }
}

export default Cart;
