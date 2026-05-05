const fetchNotifications = require("../utils/fetchNotifications");
const priorityService = require("../services/priorityService");
const Log = require("../../logging_middleware/log");

async function getTopNotifications(req, res) {
  try {
    await Log("backend", "info", "controller", "Fetching notifications");

    const notifications = await fetchNotifications();

    const top = await priorityService.getTopNotifications(notifications, 10);

    res.json({ top });
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}
async function getAllNotifications(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const type = req.query.type;

    await Log("backend", "info", "controller", "Fetching all notifications");

    const notifications = await fetchNotifications();

    let filtered = notifications;
    if (type && type !== 'All') {
      filtered = filtered.filter(n => n.Type === type);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = filtered.slice(startIndex, endIndex);

    res.json({ total: filtered.length, page, limit, data: results });
  } catch (err) {
    await Log("backend", "error", "controller", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { getTopNotifications, getAllNotifications };