// CheckoutService.js

class Checkout {
  constructor(discountedItem, prices) {
    this.discountedItem = discountedItem;
    this.items = [];
    this.prices = prices;
  }

  scan(item) {
    this.items.push(item);
  }

  total() {
    const itemsMap = new Map();

    this.items.forEach((item) => {
      if (itemsMap.has(item)) {
        itemsMap.set(item, itemsMap.get(item) + 1);
      } else {
        itemsMap.set(item, 1);
      }
    });

    const totalPrice = this.calculateTotalPrice(itemsMap);

    return totalPrice;
  }

  calculateTotalPrice(itemsMap) {
    let total = 0;

    itemsMap.forEach((value, key) => {
      if (this.discountedItem[key]) {
        total += this.discountedItem[key](value, this.prices[key]);
      } else {
        total += value * (this.prices[key] || 0);
      }
    });

    return total;
  }
}

// Individual prices
const prices = {
  ipd: 549.99,
  mbp: 1399.99,
  atv: 109.5,
  vga: 30.0,
};

// Pricing rules
const discountedItem = {
  atv: (count, price) => {
    const discountedSets = Math.floor(count / 3);
    const remaining = count % 3;
    return discountedSets * 2 * price + remaining * price;
  },
  ipd: (count, price) => {
    const discountedPrice = 499.99;
    return count > 4 ? count * discountedPrice : count * price;
  },
  // Add more items and their pricing rules here
};

module.exports = { Checkout, discountedItem, prices };
