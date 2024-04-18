import { Resend } from "resend";
import EmailTemplate from "../../components/EmailTemplate";

const send = async () => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "yowani94@gmail.com",
    to: "yowani24@outlook.com",
    subject: "Tá funcionando!",
    react: <EmailTemplate />,
  });
};

export default send;
