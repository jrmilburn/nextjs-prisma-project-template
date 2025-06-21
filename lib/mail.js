import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(email, link) {
  await resend.emails.send({
    from: "no-reply@yourapp.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${link}">here</a> to reset your password. 
           Link expires in 30 minutes.</p>`
  });
}
