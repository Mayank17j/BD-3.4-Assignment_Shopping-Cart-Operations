Shopping Cart Operations

Objective
Previously we created a cart page for FlipDeal where we dealt with various API calls to calculate the cart amount based on various factors. Now expecting to also give its customers the ability to add items to the cart, edit the quantity, delete items, and also read the current state of the cart page.

They have added some new items to their Product Listing Page:
Laptop
Mobile
Tablet

Cart Data
let cart = [
{ productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
{ productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

Note: Don’t forget to add:
let cors = require('cors');
app.use(cors());

Summary
To mplement a series of endpoints to manage a shopping cart. You will:
Add items to the cart using the GET /cart/add endpoint.
Edit the quantity of items in the cart using the GET /cart/edit endpoint.
Delete items from the cart using the GET /cart/delete endpoint.
Read the current state of the cart using the GET /cart endpoint.
Calculate the total quantity of items in the cart using the GET /cart/total-quantity endpoint.
Calculate the total price of items in the cart using the GET /cart/total-price endpoint.
