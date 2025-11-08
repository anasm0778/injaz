import pkg from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = pkg(accountSid, authToken);

export const sendWhatsAppMessage = async ({ message }) => {
  try {
    const result = await client.messages.create({
      body: message || "Your appointment is coming up on July 21 at 3PM",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+918826882676",
    });
    console.log("Message sent:", result.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};
