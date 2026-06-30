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

    const {
      firstName,
      lastName,
      phone,
      bvn
    } = req.body;

    const response = await fetch(
      "https://mevonpay.com.ng/V1/createrubies",
      {

        method:"POST",

        headers:{
          Authorization:process.env.MEVON_SECRET_KEY,
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          action:"initiate",

          fname:firstName,

          lname:lastName,

          gender:"male",

          phone,

          bvn

        })

      }
    );

    const text = await response.text();

    let data;

    try{

      data = JSON.parse(text.trim());

    }catch{

      return res.status(500).json({

        success:false,

        message:"MevonPay returned non-JSON response.",

        response:text

      });

    }

    return res.status(response.ok ? 200 : 400).json(data);

  }catch(err){

    return res.status(500).json({

      success:false,

      message:err.message

    });

  }

}
