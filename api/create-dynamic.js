export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success:false,
      message:"Method not allowed"
    });
  }

  try{

    const { amount } = req.body;

    const response = await fetch(
      "https://mevonpay.com.ng/V1/createdynamic",
      {
        method:"POST",

        headers:{
          Authorization:process.env.MEVON_SECRET_KEY,
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          amount:Number(amount),

          currency:"NGN"

        })

      }
    );

    const data = await response.json();

    if(!response.ok || !data.status){

      return res.status(400).json({

        success:false,

        message:data.message || "Unable to create account",

        response:data

      });

    }

    return res.status(200).json({

      success:true,

      bank_name:data.data.bankName,

      account_number:data.data.accountNumber,

      account_name:data.data.accountName,

      amount:data.data.amount,

      fee:data.data.fee,

      total:data.data.totalPayable,

      expiresOn:data.data.expiresOn,

      expiresInMins:data.data.expiresInMins

    });

  }catch(err){

    return res.status(500).json({

      success:false,

      message:err.message

    });

  }

}
