import { SUPABASE_URL, SUPABASE_KEY } from "./store";
export default async function handler(req, res) {
if (req.method !== "POST") {
  return res.status(200).json({
    success: true,
    message: "Webhook endpoint is ready."
  });
}
  console.log("Webhook received:", req.body);

  const { event, data } = req.body;

if (event === "funding.success" && data?.account_number) {

  await fetch(
    `${SUPABASE_URL}/rest/v1/payments?account_number=eq.${data.account_number}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "paid",
        amount: data.amount,
        sender: data.sender,
        bank: data.bank_name
      })
    }
  );

  console.log("Payment marked as paid:", data.account_number);

}

  return res.status(200).json({
    success: true
  });

}
