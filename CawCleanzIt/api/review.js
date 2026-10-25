import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);


export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"});
}


const data=req.body;


try{


await resend.emails.send({

from:"NextGen Reviews <onboarding@resend.dev>",

to:"nextgenfixers@proton.me",

subject:"New NextGen Review",

text:

`
New Review:

Stars: ${data.stars}

Repaired:
${data.cleaned}

Time:
${data.time}

Helpfulness:
${data.quality}

Name:
${data.name}

Email:
${data.email}

Improvements:
${data.improve}

`

});


res.status(200).json({success:true});


}

catch(error){

res.status(500).json({error:error.message});

}


}
