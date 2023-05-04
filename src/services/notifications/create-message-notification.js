import Users from "../../models/Users";

export async function createMessageNotification({
  userId,
  notificationSenderId,
}) {
  console.log("Create Notifications Hit");
  try {
    await Users.updateOne(
      { _id: userId },
      { $push: { messageNotifications: notificationSenderId } }
    );
    //console.log("Update Complete");
    return true;
  } catch (err) {
    return false;
  }
}
