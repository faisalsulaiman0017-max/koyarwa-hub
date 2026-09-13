export default function handler(req, res) {
  if (req.method === 'POST') {
    const event = req.body;
    console.log('Paystack Event:', event);
    res.status(200).json({ received: true });
  } else {
    res.status(200).json({ message: "Webhook yana aiki" });
  }
}
