// checkout.test.js

const { Checkout, discountedItem, prices } = require('../services/CheckoutService');

describe('Checkout Service', () => {
  let co;

  beforeEach(() => {
    co = new Checkout(discountedItem, prices);
  });

  it('calculates total price correctly for test case 1', () => {
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("vga");
    expect(co.total()).toBe(249.0); // Update with the expected total
  });

  it('calculates total price correctly for test case 2', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toBe(2718.95); // Update with the expected total
  });
});
