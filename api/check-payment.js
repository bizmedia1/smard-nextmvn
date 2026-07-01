import { SUPABASE_URL, SUPABASE_KEY } from "./store";

export default async function handler(req, res) {

  const { account_number } = req.query;

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/payments?account_number=eq.${account_number}&select=status`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await response.json();

  if (!data.length) {
    return res.status(404).json({
      paid: false
    });
  }

  return res.status(200).json({
    paid: data[0].status === "paid"
  });

}
