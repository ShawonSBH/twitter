import { handleRequest } from "../../utils/request-handler";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Users from "@/models/Users";

export default handleRequest({
  GET: async (req, res) => {
    try {
      const { user } = await getServerSession(req, res, authOptions(req));
      const { type } = req.query;

      if (type === "message") {
        const { messageNotifications } = await Users.findById(user?.id).select({
          messageNotifications: 1,
        });
        return res.status(200).json(messageNotifications);
      } else return res.json([]);
    } catch (error) {
      return res.status(404).send();
    }
  },
});
