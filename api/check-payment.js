import { payments } from "./store";

export default async function handler(req, res) {

  const { account_number } = req.query;

  if (!payments[account_number]) {

    return res.status(404).json({
      paid: false
    });

  }

  return res.status(200).json({
    paid: payments[account_number].status === "paid"
  });

}
