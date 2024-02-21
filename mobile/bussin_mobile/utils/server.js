const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51OM6cBH2vserwmCO7lbJ3qcIi3x91QjYnuDhL74EQOi4TdVSpmIAGyz0OR2EY6IxeI5zcmzcbTU7c2oe2kWPmQ7v00XLB1ECUH');
const cors = require('cors');
const app = express();
const port = 5252;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options('*', cors());
app.use(bodyParser.json());

// Endpoint to create a PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'], // Specify accepted payment methods
      // Add any additional parameters as needed
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
