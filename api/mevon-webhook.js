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

  if (event === "funding.success" && data?.account_number) {

  if (payments[data.account_number]) {

    payments[data.account_number].status = "paid";

    console.log("Payment marked as paid:", data.account_number);

  }

  }

  return res.status(200).json({
    success: true
  });

}
