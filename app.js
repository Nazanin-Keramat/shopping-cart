import products from "./models/product.js";
import { fetchData } from "./utils/httpreq.js";
import Cart from "./models/cart.js";

// select section with id products-relate to product
const productsNode = document.getElementById("products");
//select this section beacause we want to show our product in this part-relate to cart
const cartListNode = document.getElementById("cart-list");
//select number part to show total amount -relate to cart
const totalPriceNode = document
  .getElementById("total-price")
  .querySelector("span");

// first function which occur
async function render() {
  const productData = await fetchData();
  // when we want to supply method or property in class we should make instance of it with keyword new .this line makes empty object for us
  //  we make this instance in order to *show our product in a section* so as intrance we have productNode(our specific section -we should be aware to selsct the section in js firstly )and dataFetch(our data)
  //we give cartinstance to this beacuse we want to use propery and method in cardinstance in productinstance.
  const cartInstance = new Cart(cartListNode, totalPriceNode);
  const productsInstance = new products(
    productsNode,
    productData,
    cartInstance
  );
  productsInstance.showProducts();
}
// when our content load completely
document.addEventListener("DOMContentLoaded", render);
