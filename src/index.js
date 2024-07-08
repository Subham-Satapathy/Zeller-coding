// index.js

const { Checkout, discountedItem, prices } = require('../services/CheckoutService');

const co = new Checkout(discountedItem, prices);

// Test case - 1
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");
console.log(co.total());  // Outputs the total price based on the pricing rules

// Test case - 2
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');
console.log(co.total());  // Outputs the total price based on the pricing rules
