const express = require('express');
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51N94gySA5ZcPgQCJIALDFZgNRFghGfdgDuxzbU9R0KGZEyDicomtMjmxGEiE7b9A8B9LvxRlQ3C4eKqHu7IzLoIN00GIPkZYYa");

const mongoDB = require("./db");
mongoDB();

app.use(express.json());
app.use(cors({
  origin: ["https://go-food-frontend-omega.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineitems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qty
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineitems,
    mode: "payment",
    success_url: "https://go-food-frontend-omega.vercel.app/success", // Replace with your actual Vercel app URL
    cancel_url: "https://go-food-frontend-omega.vercel.app/cancel" // Replace with your actual Vercel app URL
  });

  res.json({ id: session.id });
});


module.exports = app;