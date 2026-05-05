const axios = require("axios");
const { BASE_URL } = require("../../logging_middleware/config");
const { getAuthToken } = require("../../logging_middleware/auth");
const Log = require("../../logging_middleware/log");

async function fetchNotifications() {
  try {
    let token = await getAuthToken();
    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await Log("backend", "info", "utils", "Notifications fetched successfully");

    return res.data.notifications;
  } catch (err) {
    await Log("backend", "error", "utils", err.message);
    return [];
  }
}

module.exports = fetchNotifications;