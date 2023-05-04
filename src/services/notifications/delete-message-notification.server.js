import Users from "../../models/Users";

export async function deleteMessageNotification({
  userId,
  notificationSenderId,
}) {
  console.log(
    "Notifications removed for " + userId + " " + notificationSenderId
  );
  try {
    await Users.updateOne(
      { _id: userId },
      { $pull: { messageNotifications: notificationSenderId } }
    );
    return true;
  } catch (err) {
    return false;
  }
}
