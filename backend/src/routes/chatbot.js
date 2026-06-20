const router=require("express").Router();
const OpenAI=require("openai");

const client=
new OpenAI({
 apiKey:process.env.OPENAI_API_KEY
});

router.post("/",async(req,res)=>{

 const {question}=req.body;

 const response=
 await client.chat.completions.create({

  model:"gpt-4o-mini",

  messages:[
   {
    role:"user",
    content:question
   }
  ]

 });

 res.json({
  answer:
  response.choices[0].message.content
 });

});

module.exports=router;