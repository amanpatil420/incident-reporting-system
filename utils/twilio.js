const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

function sendAlert(to, message) {
  return client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: to
    })
    .then(msg => {
      console.log("✅ Message Sent:", msg.sid);
      return msg;
    })
    .catch(err => {
      console.error("❌ Twilio Error:");
      console.error("Status:", err.status);
      console.error("Code:", err.code);
      console.error("Message:", err.message);
      throw err;
    });
}

module.exports = { sendAlert };
