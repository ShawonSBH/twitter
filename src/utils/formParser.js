import path from "path";
import formidable from "formidable";

export const parseForm = async (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public", "uploads"),
      keepExtensions: true,
    });
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
};
