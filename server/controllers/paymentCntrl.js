import asyncHandler from "express-async-handler";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = asyncHandler(async (req, res) => {
  const { title, image, price, id } = req.body[0]
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
            images: [image],
          },
          unit_amount: price * 100,
        },
        adjustable_quantity: {
          enabled: false,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/properties/${id}/success`,
      cancel_url: `${req.headers.origin}/properties/${id}`,
    };
    //   checkout session
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).send(session);
  } catch (error) {
    res.send(error);
  }
});