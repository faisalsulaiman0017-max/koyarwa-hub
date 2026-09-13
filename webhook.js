import crypto from 'crypto';

// Wannan shine Secret Key din ka na Paystack. Ka je Settings > API Keys ka kwafa shi
const PAYSTACK_SECRET_KEY =sk_test_00af2be4b45c3f050484f5803fd0a50960327156

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ message: "Webhook yana aiki" });
  }

  // 1. TABBATAR DA HAKI NE PAYSTACK TA AIKO
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(400).send('Invalid signature');
  }

  const event = req.body;

  // 2. IDAN BIYAN YA YI NASARA
  if (event.event === 'charge.success') {
    const customerEmail = event.data.customer.email;
    const customerName = event.data.customer.first_name || 'Aboki';
    const amount = event.data.amount / 100; // Paystack tana aika kobo, mu raba 100
    
    // 3. GA LINK DIN KASAR MU - KAI ZAKA SAKE SHI
    const whatsappGroupLink =https://chat.whatsapp.com/BVIuvD8sweZKvgBIelh6PD?s=cl&p=a&mlu=4&ilr=4

    // 4. AIKO DA SAKO - YANZU ZA MU LOG SHI KAWAI
    console.log(`Biyan ya yi nasara!`);
    console.log(`Suna: ${customerName}`);
    console.log(`Email: ${customerEmail}`);
    console.log(`Naira: ${amount}`);
    console.log(`Za mu aiko masa da link: ${whatsappGroupLink}`);
    
    // NA GABA: Za mu hada shi da WhatsApp API na gaske
  }

  res.status(200).json({ received: true });
}
