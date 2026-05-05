const express = require("express");
const router = express.Router();

const { getTopNotifications, getAllNotifications } = require("../controllers/notificationController");

router.get("/top", getTopNotifications);
router.get("/", getAllNotifications);

module.exports = router;