const axios = require("axios");
const { BASE_URL } = require("./config");

let token = "";

async function getAuthToken() {
  try {
    console.log("Fetching new token from", BASE_URL);
    const res = await axios.post(`${BASE_URL}/auth`, {
      email: "mahira0646.be23@chitkara.edu.in",
      name: "Mahira Garg",
      rollNo: "2310990646",
      accessCode: "EXfvDp",
      clientID: "a657cf9b-ea9c-4cbb-ba9b-de8fab0711ea",
      clientSecret: "VzJqRPrvYqtGvSTb",
    });

    token = res.data.access_token;
    console.log("Token generated successfully");
    return token;
  } catch (err) {
    console.error("Auth failed:", err.response?.data || err.message);
    throw err;
  }
}

function getToken() {
  if (!token) {
    console.warn("Token not available");
  }
  return token;
}

module.exports = { getAuthToken, getToken };
