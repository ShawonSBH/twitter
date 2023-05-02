import Users from "../../models/Users";

export async function deleteMessageNotification({
  userId,
  notificationSenderId,
}) {
  try {
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { messageNotifications: notificationSenderId } }
    );
    return true;
  } catch (err) {
    return false;
  }
}
