const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Checkout {
  constructor(discountedItem, prices) {
    this.discountedItem = discountedItem;
    this.items = [];
    this.prices = prices;
  }

  scan(item) {
    if (this.prices[item]) {
      this.items.push(item);
      console.log(`Scanned: ${item}`);
    } else {
      console.log(`Error: Product '${item}' not found.`); // If the item entered is not in catalogue
    }
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
  ipd: 549.99, // Price for a Super iPad
  mbp: 1399.99, // Price for a MacBook Pro
  atv: 109.5, // Price for an Apple TV
  vga: 30.0, // price for a VGA adapter
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

const co = new Checkout(discountedItem, prices);

function startCLI() {
  rl.question('Enter item to scan (e.g., atv, ipd, mbp, vga) or type "checkout" to see total: ', (answer) => {
    if (answer.trim().toLowerCase() === 'checkout') {
      console.log('Total price:', co.total());
      rl.close();
    } else {
      co.scan(answer.trim().toLowerCase());
      startCLI();
    }
  });
}

console.log('Welcome to the Checkout CLI');
startCLI();
