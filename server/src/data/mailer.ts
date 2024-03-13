import { APIError } from "@/apis";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// TODO: Send from template
export const sendEmail = async (
  address: string,
  subject: string,
  html: string,
): Promise<boolean> => {
  if (!emailRegex.test(address)) {
    throw new APIError(`${address} is not a valid email address`);
  }

  const form = new FormData();
  form.append("from", "BrainWaveBuilder <noreplay@brainwave.quick.to>");
  form.append("to", address);
  form.append("subject", subject);
  form.append("html", html);

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
