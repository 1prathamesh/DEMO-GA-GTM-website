const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// 🔥 PRODUCTS WITH IMAGES
let products = [
  { id: 1, name: "Shoes", price: 1000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 2, name: "T-shirt", price: 500, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 3, name: "Shirt", price: 800, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" },
  { id: 4, name: "Pants", price: 1200, image: "https://images.unsplash.com/photo-1584865288642-42078afe6942" },
  { id: 5, name: "Shorts", price: 600, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7" },
  { id: 6, name: "Gloves", price: 300, image: "https://images.unsplash.com/photo-1585386959984-a41552231658" },
  { id: 7, name: "Socks", price: 200, image: "https://images.unsplash.com/photo-1586351012965-861624544334" }
];

let cart = [];

// GET PRODUCTS
app.get('/products', (req, res) => {
  res.json(products);
});

// ADD TO CART
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

// PURCHASE
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
