const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

let products = [
  { id: 1, name: "Shoes", price: 1000 },
  { id: 2, name: "T-shirt", price: 500 }
];

let cart = [];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  const item = req.body;
  cart.push(item);

  res.json({
    dataLayer: {
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value: item.price,
        items: [item]
      }
    }
  });
});

app.post('/purchase', (req, res) => {
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const order = {
    id: "ORD" + Date.now(),
    items: cart,
    total
  };

  cart = [];

  res.json({
    dataLayer: {
      event: "purchase",
      ecommerce: {
        transaction_id: order.id,
        value: total,
        currency: "INR",
        items: order.items
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
