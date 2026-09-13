import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ message: "Webhook yana aiki" });
  }

  const secret = 'sk_test_00af2be4b45c3f050484f5803fd0a50960327156';
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Invalid signature');
  }

  console.log("An samu biya:", req.body.data.customer.email, req.body.data.amount / 100);
  res.status(200).json({ received: true });
}
