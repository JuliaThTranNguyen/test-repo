const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 4242;
const stripe = require("stripe")(
  "sk_test_51OAwryIOYB2F1mRYPyhv4nyANKEzWeajIloifAHHbPzPJjCkcMRmmSpMBpZzsr5dZMI3xXePRQSRkn1OASP9SwVA00wZJIayLx"
);
app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["FI", "DE"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "eur",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "eur",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
      payment_method_types: ["card"],
      customer_email: "test-user@gmail.com",
    });
    res.status(200).json(session);
    console.log(session);
  } catch (error) {
    next(error);
  }
});

app.get("/checkout", (req, res) => {
  const sessionId = req.query.sessionId;
  res.send({ id: sessionId });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
