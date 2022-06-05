const pushnotificationController = require("../Controllers/notification_controller");
const express = require("express");
const router = express.Router();

router.get("/SendNotification", pushnotificationController.SendNotification);
router.post(
  "/SendNotificationToDevice",
  pushnotificationController.SendNotificationToDevice
);

module.exports = router;
