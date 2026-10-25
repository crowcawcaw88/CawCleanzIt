import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  try {
    await resend.emails.send({
      from: "NextGen Reviews <onboarding@resend.dev>",
      to: "nextgenfixers@proton.me",
      subject: "New NextGen Review",
      text: `
New Review:

Stars: ${data.stars || "N/A"}

Repaired:
${data.repaired || "N/A"}

Time:
${data.time || "N/A"}

Helpfulness:
${data.helpfulness || "N/A"}

Name:
${data.name || "N/A"}

Email:
${data.email || "N/A"}

Improvements:
${data.improve || "None provided"}
`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
