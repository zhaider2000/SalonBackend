const { One_Signal_Config } = require("../../Config/app.config");
const pushNotifications = require("../Services/notification_service");

exports.SendNotification = (req, res, next) => {
  try {
    var message = {
      app_id: One_Signal_Config.APP_ID,
      contents: { en: "Booking Confirmation" },
      included_segments: ["All"],
      content_available: true,
      small_icon: "ic_notification_icon",
      data: {
        PushTitle: "SalonX",
      },
    };
    pushNotifications.SendNotification(message, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.SendNotificationToDevice = (req, res, next) => {
  try {
    var message = {
      app_id: One_Signal_Config.APP_ID,
      contents: { en: "Booking Confirmation" },
      included_segments: ["included_player_ids"],
      included_player_ids: req.body.devices,
      content_available: true,
      small_icon: "ic_notification_icon",
      data: {
        PushTitle: "SalonX",
      },
    };
    pushNotifications.SendNotification(message, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
