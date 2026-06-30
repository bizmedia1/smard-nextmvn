import { payments } from "./store";

export default async function handler(req, res) {
if (req.method !== "POST") {
  return res.status(200).json({
    success: true,
    message: "Webhook endpoint is ready."
  });
}
  console.log("Webhook received:", req.body);

  const { event, data } = req.body;

  if (event === "funding.success" && data?.reference) {

    payments[data.reference] = {
      status: "paid",
      amount: data.amount,
      sender: data.sender,
      bank: data.bank_name,
      account: data.account_number
    };

  }

  return res.status(200).json({
    success: true
  });

}
