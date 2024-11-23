import twilio from "twilio";

const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function sendOTP(phone, otp) {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}. It expires in 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
  } catch (error) {
    console.error("Failed to send OTP:", error.message);
  }
}
