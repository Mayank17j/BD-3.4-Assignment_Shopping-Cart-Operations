const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 3000;
let cors = require('cors');
app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

/*
Endpoint 1: Add an Item to the Cart
Example Call:
http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=3
*/
function addCartItem(cart, productId, name, price, quantity) {
  let productObjById = cart.find((item) => item.productId === productId);

  if(productObjById){
    productObjById.quantity+=quantity
  }
  else{
    console.log("Cart on /cart/add before push:", cart);
    cart.push({
      productId: productId,
      name: name,
      price: price,
      quantity: quantity
    });
  }
  console.log("Cart on /cart/add after push:", cart);
  return cart
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result=addCartItem(cart, productId, name, price, quantity)
  res.json({ cartItems: result });
});

/*
Endpoint 2: Edit Quantity of an Item in the Cart
Example Call:http://localhost:3000/cart/edit?productId=2&quantity=3
Expected Output:
{
cartItems: [
  {"productId":1,"name":"Laptop","price":50000,"quantity":1},
  {"productId":2,"name":"Mobile","price":20000,"quantity":3},]}
*/
function editCartItem(cart, productId, quantity) {
  let productObjById = cart.find((item) => item.productId === productId);
  productObjById.quantity = quantity;
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  res.json({ cartItems: editCartItem(cart, productId, quantity) });
});

/*
Endpoint 3: Delete an Item from the Cart
Objective: Delete an item from the cart based on the product ID.
Endpoint: /cart/delete
Query Parameters:
productId: The ID of the product to be deleted (integer).
Note: You’ll have to update the original array with the results of .filter() method. For example cart = cart.filter(...)
Your Task: Create a function that will remove an item from the cart based on the product ID.
Example Call:
http://localhost:3000/cart/delete?productId=1
Expected Output:
{
cartItems: [
{ 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 }
]
}
*/
function deleteCartItem(cart, productId) {
  return cart.filter((item) => item.productId != productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  res.json({ cartItems: deleteCartItem(cart, productId) });
});

/*
Endpoint 4: Read Items in the Cart
Objective: Return the current list of items in the cart.
Endpoint: /cart
Your Task: Create a function that will return the current state of the cart.
Example Call:
http://localhost:3000/cart
Expected Output:
{
cartItems: {
{ 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
{ 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
]
}
*/
app.get('/cart', (req, res) => {
  console.log("Cart on /cart call:", cart);

  res.json({ cartItems: cart });
});

/*
Endpoint 5: Calculate Total Quantity of Items in the Cart
Objective: Calculate and return the total quantity of items in the cart.
Endpoint: /cart/total-quantity
Your Task: Create a function that will calculate the total quantity of items in the cart.
Example Call:
http://localhost:3000/cart/total-quantity
Expected Output:
{ 'totalQuantity': 3 }
*/
function totalCartItem(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  res.json({ totalQuantity: totalCartItem(cart) });
});

/*
Endpoint 6: Calculate Total Price of Items in the Cart
Objective: Calculate and return the total price of items in the cart based on their quantities and individual prices.
Endpoint: /cart/total-price
Your Task: Create a function that will calculate the total price of items in the cart.
Example Call:http://localhost:3000/cart/total-price
Expected Output:
{ 'totalPrice': 90000 }
*/
function totalCartPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price*cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  res.json({ totalPrice: totalCartPrice(cart) });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
