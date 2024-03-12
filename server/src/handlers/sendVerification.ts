import { SendVerificationRequest, SendVerificationResponse } from "@/apis";

// TODO: Move this to a separate file
const sendEmail = async (
  address: string,
  subject: string,
  html: string,
): Promise<boolean> => {
  const form = new FormData();
  form.append("from", "BrainWaveBuilder <noreplay@brainwave.quick.to>");
  form.append("to", address);
  form.append("subject", subject);
  form.append("html", html);

  // TODO: Move this to a configuration file
  // brainwawe.quick.to is already configured in Mailgun, wait for dns to propagate
  // const domain_name = "brainwave.quick.to"
  const domain_name = "sandbox34139a5a5d91481294808a9a3c6f0e52.mailgun.org";
  const resp = await fetch(
    `https://api.mailgun.net/v3/${domain_name}/messages`,
    {
      method: "POST",
      headers: {
        Authorization:
          `Basic ` +
          Buffer.from(
            `api:a9582656f7f026de6773bad23b4d568b-b02bcf9f-1b784054`,
          ).toString("base64"),
      },
      body: form,
    },
  );
  return resp.ok;
};

// sendVerification implements the sendVerification endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const sendVerification = async (
  request: SendVerificationRequest,
): Promise<SendVerificationResponse> => {
  console.log("sendVerification", request);
  const { email } = request;
  const subject = "Verify your email address";
  const code = Math.floor(Math.random() * 1000000);
  const html = `
    <h1>Verify your email address</h1>
    <p>Enter the following code to verify your email address:</p>
    <h2>${code}</h2>
    `;
  console.log("Sending email to", email);
  const sent = await sendEmail(email, subject, html);
  return { sent };
};
