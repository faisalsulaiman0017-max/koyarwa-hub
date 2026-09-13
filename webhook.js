import crypto from "crypto";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

export default function handler(req, res) {
  // Idan Paystack ya gwada da GET
  if (req.method === "GET") {
    return res.status(200).send("Webhook is live");
  }

  // Idan biyan ya faru da gaske
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(JSON.stringify(req.body)).digest("hex");
  
  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).end();
  }

  const event = req.body;

  if (event.event === "charge.success") {
    console.log("Biyan ya yi nasara!");
    console.log("Suna:", event.data.customer.name);
    console.log("Email:", event.data.customer.email);
    console.log("Naira:", event.data.amount / 100);
  }

  res.status(200).send("Received");
}
