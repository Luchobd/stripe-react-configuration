import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();

const stripe = new Stripe(
  "sk_test_51N3mwFKpoUjxjsg0ef4ktEzW85rlQubWfu2jPa3nX6QuxcuZf3lqrteNGEqpzjN7ppEDBviuEj50wuKTMKkLKJ2s00txy9Kocx"
);

app.use(cors());
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Gaming Vata ReDragon",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.send({ message: "Successfull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
