import { payments } from "./store";

export default async function handler(req, res) {

  const { reference } = req.query;

  if (!payments[reference]) {

    return res.status(404).json({
      paid: false
    });

  }

  return res.status(200).json({
    paid: payments[reference].status === "paid"
  });

}
