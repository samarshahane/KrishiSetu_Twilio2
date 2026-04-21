// test-call.js
require('dotenv').config();
const twilio = require('twilio');

// Make sure your .env has TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// REPLACE this string with your REAL phone number including the +91!
const MY_PHONE_NUMBER = "+919167298995";
// REPLACE this string with your NGROK URL!
const MY_NGROK_URL = "https://clutch-preoccupy-frugality.ngrok-free.dev";

async function makeTestCall() {
  try {
    console.log(`📞 Telling Twilio to call ${MY_PHONE_NUMBER}...`);
    const call = await client.calls.create({
      // We point Twilio directly to your ngrok voice menu!
      url: `${MY_NGROK_URL}/api/voice/welcome`,
      to: MY_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    console.log("✅ Success! Your phone should be ringing in 3 seconds.");
    console.log(`Call ID: ${call.sid}`);
  } catch (err) {
    console.error("❌ Failed to initiate call:", err.message);
    if (err.message.includes('unverified')) {
      console.log("\n⚠️ NOTE: Because you are on a free Trial, Twilio can only call the phone number you registered your Twilio account with.");
    }
  }
}

makeTestCall();
