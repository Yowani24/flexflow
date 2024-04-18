// import { Resend } from "resend";
// import { NextApiRequest, NextApiResponse } from "next";
// import EmailTemplate from "../../../components/EmailTemplate";
// import { NextResponse } from "next/server";

// export default async function send(req: NextApiRequest, res: NextApiResponse) {
//   const resend = new Resend(process.env.RESEND_API_KEY);

//   await resend.emails.send({
//     from: "yowani94@gmail.com",
//     to: "yowani24@outlook.com",
//     subject: "Tá funcionando!",
//     react: EmailTemplate(),
//   });
//   return NextResponse.json({
//     status: "ok",
//   });
// }

import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import EmailTemplate from "../../../components/EmailTemplate";

export default async function send(req: NextApiRequest, res: NextApiResponse) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "yowani94@gmail.com",
    to: "yowani24@outlook.com",
    subject: "Tá funcionando!",
    react: EmailTemplate(),
  });

  res.json({
    status: "ok",
  });
}
