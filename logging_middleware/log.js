const axios = require("axios");
const { BASE_URL } = require("./config");
const { getToken } = require("./auth");

async function Log(stack, level, pkg, message) {
  try {
    const token = getToken();

    if (!token) {
      console.log("Token not available yet");
      return;
    }

    await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Log sent successfully");
  } catch (err) {
    console.error("Logging error:", err.response?.data || err.message);
  }
}

module.exports = Log;