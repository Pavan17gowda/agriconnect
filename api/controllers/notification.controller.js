import Notification from "../models/notification.model.js";

export const addNotification = async (req, res) => {
  const { userId, message, type } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      message,
      type,
    });

    await newNotification.save();
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
};

export const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
