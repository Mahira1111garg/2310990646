const Log = require("../../logging_middleware/log");

async function getTopNotifications(notifications, n = 10) {
  const weightMap = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  await Log("backend", "info", "service", "Calculating priority for notifications");

  return notifications
    .sort((a, b) => {
      const w1 = weightMap[a.Type];
      const w2 = weightMap[b.Type];

      if (w1 !== w2) return w2 - w1;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
}

module.exports = { getTopNotifications };