import fs from "fs/promises";
import path from "path";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

export default async function handler(req, res) {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error uploading file");
    } else {
      const filePath = req.selectedImage.path;
      const fileName = req.selectedImage.originalname;
      const fileExtension = path.extname(fileName);
      const newFilePath = path.join(
        process.cwd(),
        "public",
        `${fileName}${fileExtension}`
      );

      await fs.rename(filePath, newFilePath);

      const fileUrl = `/uploads/${fileName}${fileExtension}`;
      console.log(fileUrl);
      res.status(200).json({ url: fileUrl });
    }
  });
}
